// calculateCost.js

const BASE_COST = 10;

function calculateCost(parameters) {
    let cost = BASE_COST;

    // Calculate additional cost based on the number of locations
    if (parameters.Locations && Array.isArray(parameters.Locations)) {
        const numLocations = parameters.Locations.length;
        if (numLocations > 10) {
            cost += (numLocations - 10); // Adding 1 credit for each location over 10
        }
    }

    return cost;
}

module.exports = calculateCost;
