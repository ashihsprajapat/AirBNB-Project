//let mapToken =mapToken ;
console.log(mapToken);
//mapboxgl.accessToken = 'pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDK0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ'; // <-- Replace with your valid token

mapboxgl.accessToken = mapToken;
console.log(mapboxgl.accessToken);
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    // projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    zoom: 9,
    center: [30, 15]
});

map.on('load', function() {
    console.log("Map loaded successfully");
});

map.on('error', function(e) {
    console.error('Map loading error:', e);
});

