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

    // Convert to numbers and create required values array
    var requiredValues = [
        bonus ? Number(bonus) : null,
        job ? Number(job) : null,
        vacation ? Number(vacation) : null,
        start ? Number(start) : null,
        move ? Number(move) : null,
        insurance ? Number(insurance) : null,
        salary ? Number(salary) : null,
        location ? Number(location) : null
];

// Define the options and their point values
var bonus_options = [0, 400, 800, 1200, 1600];
var job_assignment_options = [-2400, -1800, -1200, -600, 0];
var vacation_time_options = [0, 1000, 2000, 3000, 4000];
var starting_date_options = [0, 600, 1200, 1800, 2400];
var moving_expense_options = [0, 200, 400, 600, 800];
var insurance_coverage_options = [0, 800, 1600, 2400, 3200];
var salary_options = [-6000, -4500, -3000, -1500, 0];
var location_options = [0, 300, 600, 900, 1200];

// Generate all combinations of options
var all_combinations = cartesianProduct([bonus_options, job_assignment_options, vacation_time_options, 
                                         starting_date_options, moving_expense_options, insurance_coverage_options, 
                                         salary_options, location_options]);

// Filter out combinations that don't meet the required values or don't sum to the desired total
var valid_combinations = all_combinations.filter(combo => {
    return combo.every((val, i) => requiredValues[i] === null || requiredValues[i] === val)
        && combo.reduce((a, b) => a + b, 0) == points;
});

// Display the valid combinations
var output = document.getElementById('output');
output.innerHTML = '';
valid_combinations.forEach(combo => {
    var p = document.createElement('p');
    p.textContent = JSON.stringify(combo);
    output.appendChild(p);
});
}

// Helper function to generate cartesian product of multiple arrays
function cartesianProduct(arr) {
return arr.reduce(function(a,b){
return a.map(function(x){
  return b.map(function(y){
    return x.concat(y);
  })
}).reduce(function(a,b){ return a.concat(b) },[])
}, [[]])
}