# leaflet-challenge
Mod 15 homework


1. Started with Initiating the map.
For this, referred to Exercise 15.1.6, instructor demo for city population
This shows using openstreetmap.org to get image for the map tile layer.  Also showing attribution.

2. I am still unclear about scope, and using var vs let vs const, so using var so should get less errors

3. To create the markers, the circles for the earthquakes, referred to Exercise 15.3.6 where we did that this way:

            // Loop through the cities array, and create one marker for each city object.
            for (let i = 0; i < cities.length; i++) {
            L.circle(cities[i].location, {
                fillOpacity: 0.75,
                color: "white",
                fillColor: "purple",
                // Setting our circle's radius to equal the output of our markerSize() function:
                // This will make our marker's size proportionate to its population.
                radius: markerSize(cities[i].population)
            }).bindPopup(`<h1>${cities[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
            }


4. the above code snippet from Ex 15.3.6 also gave me the logic/syntax for the .bindPopup, which is essentially like a tooltip,
only it works by clicking on the circle, not hovering on it.  

5. The function colorCircle, where I assign a color to a range of "depth" values, this was shown in Exercise 15.3.7, so I adapted that.

6. Using push.  For "depth", these are attributes needed for colorCircle, and we did this in Ex 15.3.9.
    First have to create empty array, then "push" the depth values in while looping, then they will be applied

7. For positioning legend and title (Depth in bottom right and Title upper right), used leaflet layer control. Referred to documentation 
    at https://gis.stackexchange.com/questions/41768/leaflet-how-to-move-the-layer-control-menu

NOTE: Wanted to center this title using position "topcenter", but strangely, leaflet only supports the four corners. Odd.