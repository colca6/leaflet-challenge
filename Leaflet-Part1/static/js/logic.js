
  //reference the link to the endpoint for earthquake data
  url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(myMap);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


//Earthquakes represented by circles, larger the EQ, larger the circle
function sizeOfCircle(magnitude) {
    return magnitude * 5;
};

//Also measuring depth. Color of circle gets darker as EQ gets deeper.
//Light to dark:  Lavender, Thistle, Plum, Medium Orchid, Dark Orchid, Purple
function colorOfCircle(depth) {
    if (depth>=90) {
        color = "#800080";
    }
    else if (depth < 90 && depth >= 70) {
        color = "#9932cc";
    }
    else if (depth < 70 && depth >= 50) {
        color = "#ba55d3";
    }
    else if (depth < 50 && depth >= 30) {
        color = "#dda0dd";
    }   
     else if (depth < 30 && depth >= 10) {
        color = "#d8bfd8";
    }
    else if (depth < 10 && depth >= -10) {
        color = "#e6e6fa";
    };
    return color;
};



d3.json(url).then(data => {
    //console.log(data);

    var features = data.features;
    var depth_array = [];

    for (var i = 0; i < features.length; i++) {
        var coordinates = features[i].geometry.coordinates;
        
        var longitude = coordinates[0];
        var latitude = coordinates[1];
        var depth = coordinates[2];
        depth_array.push(depth);
        var properties = features[i].properties;
        var magnitude = properties.mag;
        var place = properties.place;
    
        //no circles will appear on map until this leaflet code instructs it, including "tool tip" (click not hover)
        circles = L.circleMarker([latitude, longitude], {
            color: "black",
            weight: 1,
            fillColor: colorOfCircle(depth),
            opactiy: 1,
            fillOpacity: 1,
            radius: sizeOfCircle(magnitude)
        }).bindPopup(`<h3>${place}</h3><br/>Magnitude: ${magnitude}<br/>Depth: ${depth} km<br/> Coordinates: ${latitude}, ${longitude}`).addTo(myMap);
    };


//Create HTML title in a layer to show on map
    var info = L.control({position:"topright"});

    info.onAdd = function() {
        var div = L.DomUtil.create("div","info");
        var title = "<h1>US Earthquake Depth in past 7 Days</h1>"
        div.innerHTML = title;

        return div
    };

//Create HTML legend showing EQ depth in a layer to show on map
    var legend  = L.control({ position : "bottomright"});

    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        var limits = [-10, 10, 30, 50, 70, 90];
        //var title = "<h2>EQ Depth in km</h2>"
        var title = ""

        div.innerHTML = title;

        for (var i = 0; i < limits.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colorOfCircle(limits[i] + 1) + '"></i> ' +
                limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
        }

        return div;
    };

//Add legend and title to map
    legend.addTo(myMap);
    info.addTo(myMap);
});