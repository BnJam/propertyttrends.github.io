# Property Trends - Lower Vancouver Island 🏠

A GitHub Pages project that visualizes property sales data and historical trends for the lower Vancouver Island area using interactive heat maps.

## Features

- **Interactive Map**: Leaflet-based map focused on lower Vancouver Island (Victoria, Oak Bay, Saanich, Esquimalt, James Bay)
- **Heat Map Visualization**: Color-coded heat map showing property value distribution across the region
- **Property Markers**: Clickable markers for each property showing detailed information
- **Sales History**: Complete sales history for each property with price trends
- **Real-time Statistics**: Dashboard showing total properties, average price, and historical sales count
- **Responsive Design**: Works on desktop and mobile devices

## Live Demo

Visit: [https://bnjam.github.io/propertyttrends.github.io/](https://bnjam.github.io/propertyttrends.github.io/)

## Technology Stack

- **Leaflet.js**: Open-source JavaScript library for interactive maps
- **Leaflet.heat**: Plugin for creating heat map layers
- **OpenStreetMap**: Map tile provider
- **Vanilla JavaScript**: No framework dependencies

## Map Features

### Heat Map Legend
- **Red**: High value areas (premium properties)
- **Yellow**: Medium value areas
- **Green**: Moderate value areas
- **Cyan**: Lower value areas
- **Blue**: Lowest value areas

### Property Information
Each property marker includes:
- Full address
- Current listing price
- Price change percentage from last sale
- Bedrooms, bathrooms, and square footage
- Complete sales history with dates and prices

## Data Structure

Properties include the following information:
```javascript
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
        { date: "2021-03-20", price: 725000, type: "Sold" }
    ]
}
```

## Geographic Coverage

The map focuses on the following areas in lower Vancouver Island:
- Victoria (Downtown, James Bay)
- Oak Bay
- Saanich
- Esquimalt

The map is configured with zoom restrictions (minimum zoom level 10) to maintain consistent data distribution as users zoom in and out.

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/BnJam/propertyttrends.github.io.git
cd propertyttrends.github.io
```

2. Serve the files using any static web server:
```bash
# Using Python 3
python3 -m http.server 8080

# Or using Node.js
npx serve .
```

3. Open your browser to `http://localhost:8080`

## Extending the Project

### Adding New Properties

Edit `app.js` and add new property objects to the `propertyData` array:

```javascript
{
    address: "Your Address",
    lat: 48.xxxx,
    lng: -123.xxxx,
    currentPrice: 850000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    salesHistory: [
        { date: "2023-09-01", price: 850000, type: "Listed" }
    ]
}
```

### Connecting to Real Data Sources

To connect to a real estate API:
1. Replace the `propertyData` array with an API call in the `loadPropertyData()` function
2. Ensure the API returns data in the same format
3. Add error handling and loading states

### Customizing the Heat Map

Modify heat map parameters in `app.js`:
```javascript
heatmapLayer = L.heatLayer(heatmapData, {
    radius: 25,        // Radius of each point
    blur: 35,          // Amount of blur
    maxZoom: 17,       // Maximum zoom
    max: 2.0,          // Maximum intensity
    gradient: { ... }  // Color gradient
});
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available for educational and personal use.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Future Enhancements

- Integration with real estate APIs (e.g., Zillow, Realtor.ca)
- Advanced filtering (price range, bedrooms, etc.)
- Time-series visualization of price trends
- Neighborhood statistics and comparisons
- Export functionality for data analysis