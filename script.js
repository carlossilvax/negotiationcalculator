function calculate() {
    // Get input values
    var points = document.getElementById('points').value;
    var bonus = document.getElementById('bonus').value;
    var job = document.getElementById('job').value;
    var vacation = document.getElementById('vacation').value;
    var start = document.getElementById('start').value;
    var move = document.getElementById('move').value;
    var insurance = document.getElementById('insurance').value;
    var salary = document.getElementById('salary').value;
    var location = document.getElementById('location').value;

    // Create required values object
    var requiredValues = {
        bonus: bonus || null,
        job: job || null,
        vacation: vacation || null,
        start: start || null,
        move: move || null,
        insurance: insurance || null,
        salary: salary || null,
        location: location || null
    };

    // Define the options and their point values
    var options = {
        "bonus": {"10%": 0, "8%": 400, "6%": 800, "4%": 1200, "2%": 1600},
        "job": {"Division E": -2400, "Division D": -1800, "Division C": -1200, "Division B": -600, "Division A": 0},
        "vacation": {"25 days": 0, "20 days": 1000, "15 days": 2000, "10 days": 3000, "5 days": 4000},
        "start": {"6/1/2023": 0, "6/15/2023": 600, "7/1/2023": 1200, "7/15/2023": 1800, "8/1/2023": 2400},
        "move": {"100%": 0, "90%": 200, "80%": 400, "70%": 600, "60%": 800},
        "insurance": {"Plan A": 0, "Plan B": 800, "Plan C": 1600, "Plan D": 2400, "Plan E": 3200},
        "salary": {"$50000": -6000, "$48000": -4500, "$46000": -3000, "$44000": -1500, "$42000": 0},
        "location": {"New York": 0, "Boston": 300, "Chicago": 600, "Atlanta": 900, "San Francisco": 1200}
    };

    // Generate all combinations of options
    var valid_combinations = [];
    generateCombinations(Object.keys(options), 0, [], 0);

    // Display the valid combinations
    var output = document.getElementById('output');
    output.innerHTML = '';
    valid_combinations.forEach(combo => {
        var p = document.createElement('p');
        p.textContent = JSON.stringify(combo);
        output.appendChild(p);
    });

    function generateCombinations(keys, index, current, total) {
        if (index === keys.length) {
            if (total == points) valid_combinations.push(current);
            return;
        }

        var key = keys[index];
        for (var value in options[key]) {
            if (requiredValues[key] === null || requiredValues[key] === value) {
                generateCombinations(keys, index + 1, current.concat({[key]: value}), total + options[key][value]);
            }
        }
    }
}
