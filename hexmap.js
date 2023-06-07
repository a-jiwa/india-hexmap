// Select the SVG element with the id "hexmap"
const hexmapSvg = d3.select("#hexmap");

// Define the radius of each hexagon
const hexagonRadius = 10;

// Function to calculate the points of a hexagon given its radius
function calculateHexagonPoints(radius) {
    const xOffset = radius * Math.sqrt(3) / 2;
    const yOffset = radius / 2;
    return [
        [0, -radius],
        [xOffset, -yOffset],
        [xOffset, yOffset],
        [0, radius],
        [-xOffset, yOffset],
        [-xOffset, -yOffset]
    ].map(p => p.join(",")).join(" ");
}

// Function to draw the hexagons based on the data
function drawHexagons(data) {
    // Map the data to the hexagon coordinates and party information
    const hexData = data.map(d => {
        const x = d['Coordinate'][0] * hexagonRadius;
        const y = d['Coordinate'][1] * 1.5 * hexagonRadius / Math.cos(Math.PI / 6);
        return { x, y, party: d['Winning Party'], constituency: d['Name'] };
    });

    // Calculate the extent of x and y coordinates in the hexData
    const xExtent = d3.extent(hexData, d => d.x);
    const yExtent = d3.extent(hexData, d => d.y);

    // Calculate the width and height of the hexmap
    const hexmapWidth = xExtent[1] - xExtent[0];
    const hexmapHeight = yExtent[1] - yExtent[0];

    // Calculate the translation to center the hexmap in the SVG
    const xTranslation = (hexmapSvg.node().getBoundingClientRect().width - hexmapWidth) / 2 - xExtent[0];
    const yTranslation = (hexmapSvg.node().getBoundingClientRect().height - hexmapHeight) / 2 - yExtent[0];

    // Create a group for the hexagons
    const hexagonGroup = hexmapSvg.append("g")
        .attr("transform", `translate(${xTranslation},${yTranslation})`);

    // Create a tooltip for displaying party and constituency information
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Load the party colors from a JSON file
    fetch("party-colors.json")
        .then(response => response.json())
        .then(partyColors => {
            // Draw the hexagons
            hexagonGroup.selectAll(".hexagon")
                .data(hexData)
                .enter()
                .append("polygon")
                .attr("class", "hexagon")
                .attr("points", calculateHexagonPoints(hexagonRadius))
                .attr("transform", d => `translate(${d.x},${d.y})`)
                .attr("fill", d => partyColors[d.party])
                .on("mouseover", function (event, d) {
                    // Reduce opacity of other hexagons on mouseover
                    hexagonGroup.selectAll(".hexagon").style("opacity", 0.5);
                    d3.select(this).style("opacity", 1);
                    // Show tooltip with party and constituency information
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html(`${d.party}<br/>${d.constituency}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", function (d) {
                    // Restore opacity of all hexagons on mouseout
                    hexagonGroup.selectAll(".hexagon").style("opacity", 1);
                    // Hide tooltip
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
        });
}

// Load the election data from a JSON file
fetch("election-data.json")
    .then(response => response.json())
    .then(data => {
        // Delay the drawing of hexagons to allow rendering of the SVG
        setTimeout(() => {
            drawHexagons(data);
        }, 0);
    });
