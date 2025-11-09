// Property Trends Application for Lower Vancouver Island

// Lower Vancouver Island coordinates (Victoria area)
const VANCOUVER_ISLAND_CENTER = [48.4284, -123.3656]; // Victoria, BC
const DEFAULT_ZOOM = 11;

// Property data structure with sales history
// In a real application, this would be fetched from an API
const propertyData = [
    // Victoria Downtown
    {
        address: "123 Government St, Victoria, BC",
        lat: 48.4284,
        lng: -123.3656,
        currentPrice: 849000,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        salesHistory: [
            { date: "2023-06-15", price: 849000, type: "Listed" },
            { date: "2021-03-20", price: 725000, type: "Sold" },
            { date: "2018-08-10", price: 625000, type: "Sold" }
        ]
    },
    {
        address: "456 Douglas St, Victoria, BC",
        lat: 48.4254,
        lng: -123.3656,
        currentPrice: 1150000,
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 1800,
        salesHistory: [
            { date: "2023-07-01", price: 1150000, type: "Listed" },
            { date: "2020-11-15", price: 950000, type: "Sold" },
            { date: "2017-05-22", price: 780000, type: "Sold" }
        ]
    },
    // Oak Bay
    {
        address: "789 Beach Dr, Oak Bay, BC",
        lat: 48.4193,
        lng: -123.3156,
        currentPrice: 2100000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2800,
        salesHistory: [
            { date: "2023-08-20", price: 2100000, type: "Listed" },
            { date: "2019-09-10", price: 1650000, type: "Sold" },
            { date: "2015-04-18", price: 1200000, type: "Sold" }
        ]
    },
    {
        address: "321 Newport Ave, Oak Bay, BC",
        lat: 48.4263,
        lng: -123.3056,
        currentPrice: 1650000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2200,
        salesHistory: [
            { date: "2023-09-05", price: 1650000, type: "Listed" },
            { date: "2022-02-14", price: 1550000, type: "Sold" },
            { date: "2019-06-30", price: 1300000, type: "Sold" }
        ]
    },
    // Saanich
    {
        address: "567 Carey Rd, Saanich, BC",
        lat: 48.4584,
        lng: -123.3756,
        currentPrice: 925000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2400,
        salesHistory: [
            { date: "2023-07-12", price: 925000, type: "Listed" },
            { date: "2021-08-25", price: 810000, type: "Sold" },
            { date: "2018-11-05", price: 650000, type: "Sold" }
        ]
    },
    {
        address: "234 Quadra St, Saanich, BC",
        lat: 48.4684,
        lng: -123.3656,
        currentPrice: 780000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1600,
        salesHistory: [
            { date: "2023-06-30", price: 780000, type: "Listed" },
            { date: "2020-12-10", price: 680000, type: "Sold" },
            { date: "2016-07-15", price: 520000, type: "Sold" }
        ]
    },
    // Esquimalt
    {
        address: "890 Esquimalt Rd, Esquimalt, BC",
        lat: 48.4334,
        lng: -123.4156,
        currentPrice: 695000,
        bedrooms: 2,
        bathrooms: 1,
        sqft: 1100,
        salesHistory: [
            { date: "2023-08-15", price: 695000, type: "Listed" },
            { date: "2021-05-20", price: 610000, type: "Sold" },
            { date: "2019-01-10", price: 495000, type: "Sold" }
        ]
    },
    {
        address: "445 Lampson St, Esquimalt, BC",
        lat: 48.4284,
        lng: -123.4256,
        currentPrice: 815000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1450,
        salesHistory: [
            { date: "2023-09-01", price: 815000, type: "Listed" },
            { date: "2022-03-15", price: 765000, type: "Sold" },
            { date: "2020-06-22", price: 625000, type: "Sold" }
        ]
    },
    // James Bay
    {
        address: "678 Simcoe St, Victoria, BC",
        lat: 48.4184,
        lng: -123.3756,
        currentPrice: 975000,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1350,
        salesHistory: [
            { date: "2023-07-20", price: 975000, type: "Listed" },
            { date: "2021-10-05", price: 850000, type: "Sold" },
            { date: "2018-04-12", price: 695000, type: "Sold" }
        ]
    },
    {
        address: "223 Dallas Rd, Victoria, BC",
        lat: 48.4134,
        lng: -123.3706,
        currentPrice: 1450000,
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 2000,
        salesHistory: [
            { date: "2023-08-10", price: 1450000, type: "Listed" },
            { date: "2020-09-18", price: 1200000, type: "Sold" },
            { date: "2017-02-28", price: 950000, type: "Sold" }
        ]
    },
    // Additional properties for better heat map distribution
    {
        address: "112 Burnside Rd W, Victoria, BC",
        lat: 48.4484,
        lng: -123.3856,
        currentPrice: 725000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1500,
        salesHistory: [
            { date: "2023-09-12", price: 725000, type: "Listed" },
            { date: "2022-01-20", price: 685000, type: "Sold" }
        ]
    },
    {
        address: "334 Gorge Rd E, Victoria, BC",
        lat: 48.4384,
        lng: -123.3556,
        currentPrice: 650000,
        bedrooms: 2,
        bathrooms: 1.5,
        sqft: 1150,
        salesHistory: [
            { date: "2023-07-25", price: 650000, type: "Listed" },
            { date: "2021-04-10", price: 575000, type: "Sold" }
        ]
    },
    {
        address: "556 Hillside Ave, Victoria, BC",
        lat: 48.4384,
        lng: -123.3356,
        currentPrice: 895000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2100,
        salesHistory: [
            { date: "2023-08-30", price: 895000, type: "Listed" },
            { date: "2020-07-15", price: 745000, type: "Sold" }
        ]
    },
    {
        address: "789 Pandora Ave, Victoria, BC",
        lat: 48.4304,
        lng: -123.3606,
        currentPrice: 1050000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1700,
        salesHistory: [
            { date: "2023-09-15", price: 1050000, type: "Listed" },
            { date: "2021-11-20", price: 925000, type: "Sold" }
        ]
    },
    {
        address: "445 Bay St, Victoria, BC",
        lat: 48.4224,
        lng: -123.3706,
        currentPrice: 1250000,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1400,
        salesHistory: [
            { date: "2023-06-20", price: 1250000, type: "Listed" },
            { date: "2022-05-10", price: 1150000, type: "Sold" }
        ]
    }
];

// Initialize the map
let map;
let heatmapLayer;
let markersLayer;

function initMap() {
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
    loadPropertyData();
    
    // Update statistics
    updateStatistics();
}

function loadPropertyData() {
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
