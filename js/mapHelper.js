window.mapHelper = {
    map: null,
    currentMarkers: [], // Keeps track of pins so we can delete them when filtering
    
    // 1. The Data: Add your actual locations and what minerals are found there!
    sourceLocations: [
        { name: "Nevada Basin, USA", lat: 38.8026, lng: -116.4194, minerals: ["Quartz", "Gold", "Silver"] },
        { name: "Minas Gerais, Brazil", lat: -18.5122, lng: -44.5550, minerals: ["Quartz", "Topaz", "Tourmaline", "Muscovite Mica"] },
        { name: "Ural Mountains, Russia", lat: 60.0, lng: 60.0, minerals: ["Malachite", "Emerald", "Platinum"] },
        { name: "Western Australia", lat: -25.0, lng: 120.0, minerals: ["Gold", "Iron", "Quartz"] },
        { name: "Sri Lanka Gem Gravels", lat: 7.8731, lng: 80.7718, minerals: ["Sapphire", "Ruby", "Tourmaline"] }
    ],

    // 2. Initialize the empty map
    initMap: function (containerId) {
        if (this.map) return; // Prevent loading twice

        this.map = L.map(containerId).setView([20, 0], 2);
        
        // Add the clean, light-themed map background
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);

        // Draw all pins initially
        this.filterMap("All");
    },

    // 3. The Filter Engine
    filterMap: function (mineralName) {
        // First, clear all the old pins off the map
        this.currentMarkers.forEach(marker => this.map.removeLayer(marker));
        this.currentMarkers = []; // Reset the list

        const searchWord = mineralName.toLowerCase().trim();

        // Loop through our locations
        this.sourceLocations.forEach(loc => {
            // Check if this location has the mineral we are searching for
            const hasMineral = searchWord === "all" || searchWord === "" || 
                               loc.minerals.some(m => m.toLowerCase().includes(searchWord));

            // If it does, draw the pin!
            if (hasMineral) {
                let popupText = `
                    <div style="font-family: 'Inter', sans-serif;">
                        <h6 style="margin: 0 0 5px 0; color: #0f172a; font-weight: bold;">${loc.name}</h6>
                        <span style="font-size: 0.8rem; color: #64748b;">Minerals traced here:</span>
                        <p style="margin: 2px 0 0 0; font-size: 0.85rem; color: #3b82f6; font-weight: 600;">
                            ${loc.minerals.join(', ')}
                        </p>
                    </div>
                `;

                let marker = L.marker([loc.lat, loc.lng])
                    .bindPopup(popupText)
                    .addTo(this.map);
                
                this.currentMarkers.push(marker); // Save it so we can clear it later
            }
        });
    }
};