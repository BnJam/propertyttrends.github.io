// Property Trends Application for Lower Vancouver Island

// Lower Vancouver Island coordinates (Victoria area)
const VANCOUVER_ISLAND_CENTER = [48.4284, -123.3656]; // Victoria, BC
const DEFAULT_ZOOM = 11;

// Property data structure with sales history
// In a real application, this would be fetched from an API
// IMPORTANT: Replace YOUR_APIFY_API_KEY with your actual Apify API key
const API_KEY = 'YOUR_APIFY_API_KEY';
const APIFY_API_URL = `https://api.apify.com/v2/acts/scrapemind~realtor-ca-scraper/run-sync-get-dataset-items?token=${API_KEY}`;

async function fetchRealEstateData() {
    // URL for the Victoria, BC area on Realtor.ca
    const startUrl = "https://www.realtor.ca/map#ZoomLevel=11&Center=48.4284,-123.3656";

    const input = {
        "startUrls": [startUrl],
        "getDetails": true,
        "maxListings": 50 // Limit for testing purposes
    };

    try {
        const response = await fetch(APIFY_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching real estate data:', error);
        return [];
    }
}

function transformApiData(apiData) {
    return apiData.map(property => {
        const salesHistory = [];

        // Add historical sales data
        if (property.History && Array.isArray(property.History)) {
            property.History.forEach(sale => {
                salesHistory.push({
                    date: sale.LastUpdated,
                    price: parseFloat(sale.Price),
                    type: 'Sold'
                });
            });
        }

        // Add the current listing to the sales history
        if (property.LastUpdated && property.Property.PriceUnformattedValue) {
            salesHistory.unshift({ // Add to the beginning of the array
                date: property.LastUpdated.split(' ')[0], // YYYY-MM-DD
                price: parseFloat(property.Property.PriceUnformattedValue),
                type: 'Listed'
            });
        }

        let sqft = 0;
        if (property.Building.SizeInterior) {
            const areaInM2 = parseFloat(property.Building.SizeInterior.replace(' m2', ''));
            if (!isNaN(areaInM2)) {
                sqft = Math.round(areaInM2 * 10.764);
            }
        }

        return {
            address: property.Property.Address.AddressText.replace('|', ', '),
            lat: parseFloat(property.Property.Address.Latitude),
            lng: parseFloat(property.Property.Address.Longitude),
            currentPrice: parseFloat(property.Property.PriceUnformattedValue),
            bedrooms: parseInt(property.Building.Bedrooms, 10) || 0,
            bathrooms: parseInt(property.Building.BathroomTotal, 10) || 0,
            sqft: sqft,
            salesHistory: salesHistory,
        };
    });
}

// In a real application, this would be fetched from an API

// Initialize the map
let map;
let heatmapLayer;
let markersLayer;
let propertyData = [];

async function initMap() {
    // Create the map centered on Lower Vancouver Island
    map = L.map('map').setView(VANCOUVER_ISLAND_CENTER, DEFAULT_ZOOM);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 10 // Restrict minimum zoom to keep focus on Vancouver Island
    }).addTo(map);
    
    // Create markers layer
    markersLayer = L.layerGroup().addTo(map);
    
    // Add legend
    addLegend();
    
    // Load property data
    await loadPropertyData();
    
    // Update statistics
    updateStatistics();
}

async function loadPropertyData() {
    const rawData = await fetchRealEstateData();
    propertyData = transformApiData(rawData);

    // Prepare heat map data
    const heatmapData = [];
    
    // Add markers and heat map points
    propertyData.forEach(property => {
        // Create marker
        const marker = L.marker([property.lat, property.lng])
            .bindPopup(createPopupContent(property));
        
        markersLayer.addLayer(marker);
        
        // Add to heatmap data with intensity based on price
        // Higher prices get higher intensity
        const intensity = Math.min(property.currentPrice / 500000, 2);
        heatmapData.push([property.lat, property.lng, intensity]);
        
        // Add additional points for each sale in history to show trend
        property.salesHistory.forEach(sale => {
            if (sale.type === "Sold") {
                const historicalIntensity = Math.min(sale.price / 500000, 2) * 0.5;
                heatmapData.push([property.lat, property.lng, historicalIntensity]);
            }
        });
    });
    
    // Create heatmap layer
    heatmapLayer = L.heatLayer(heatmapData, {
        radius: 25,
        blur: 35,
        maxZoom: 17,
        max: 2.0,
        gradient: {
            0.0: 'blue',
            0.3: 'cyan',
            0.5: 'lime',
            0.7: 'yellow',
            1.0: 'red'
        }
    }).addTo(map);
}

function createPopupContent(property) {
    let historyHTML = '';
    
    property.salesHistory.forEach(sale => {
        const saleDate = new Date(sale.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        historyHTML += `
            <div class="history-item">
                <strong>${sale.type}:</strong> $${formatPrice(sale.price)} (${saleDate})
            </div>
        `;
    });
    
    const priceChange = calculatePriceChange(property.salesHistory);
    const changeColor = priceChange >= 0 ? '#27ae60' : '#e74c3c';
    const changeSymbol = priceChange >= 0 ? '▲' : '▼';
    
    return `
        <div class="popup-content">
            <h3>${property.address}</h3>
            <div class="price">$${formatPrice(property.currentPrice)}</div>
            <div style="color: ${changeColor}; font-weight: bold; margin: 5px 0;">
                ${changeSymbol} ${Math.abs(priceChange).toFixed(1)}% from last sale
            </div>
            <div>
                <strong>Beds:</strong> ${property.bedrooms} | 
                <strong>Baths:</strong> ${property.bathrooms} | 
                <strong>Sq.ft:</strong> ${property.sqft.toLocaleString()}
            </div>
            <div class="history">
                <strong>Sales History:</strong>
                ${historyHTML}
            </div>
        </div>
    `;
}

function calculatePriceChange(salesHistory) {
    if (salesHistory.length < 2) return 0;
    
    const latestPrice = salesHistory[0].price;
    const previousSoldPrice = salesHistory.find(sale => sale.type === "Sold")?.price;
    
    if (!previousSoldPrice) return 0;
    
    return ((latestPrice - previousSoldPrice) / previousSoldPrice) * 100;
}

function formatPrice(price) {
    return price.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

function updateStatistics() {
    // Total properties
    document.getElementById('total-properties').textContent = propertyData.length;
    
    // Average price
    const avgPrice = propertyData.reduce((sum, prop) => sum + prop.currentPrice, 0) / propertyData.length;
    document.getElementById('avg-price').textContent = '$' + formatPrice(Math.round(avgPrice));
    
    // Total historical sales
    const totalSales = propertyData.reduce((sum, prop) => {
        return sum + prop.salesHistory.filter(sale => sale.type === "Sold").length;
    }, 0);
    document.getElementById('total-sales').textContent = totalSales;
}

function addLegend() {
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
            <h4>Property Price Heat Map</h4>
            <div><i style="background: red"></i> High Value Areas</div>
            <div><i style="background: yellow"></i> Medium Value Areas</div>
            <div><i style="background: lime"></i> Moderate Value Areas</div>
            <div><i style="background: cyan"></i> Lower Value Areas</div>
            <div><i style="background: blue"></i> Lowest Value Areas</div>
        `;
        return div;
    };
    
    legend.addTo(map);
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', initMap);
