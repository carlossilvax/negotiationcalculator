function generateCombinations(options, requiredValues, points, maxCombinations) {
  // Calculate the minimum sum of each option
  var minSums = Object.values(options).map(option => Math.min(...Object.values(option)));

  // If the minimum sum is greater than the desired total, no valid combinations can be found
  if (minSums.reduce((a, b) => a + b, 0) > points) {
      return [];
  }

  // Generate all combinations of options
  var all_combinations = cartesianProduct(Object.values(options));

  // Filter out combinations that don't meet the required values or don't sum to the desired total
  var valid_combinations = [];
  var count = 0;
  for (var i = 0; i < all_combinations.length && count < maxCombinations; i++) {
      var combo = all_combinations[i];
      if (combo.every((val, i) => requiredValues[i] === null || requiredValues[i] === Object.keys(options)[i] + ": " + val)
          && combo.reduce((a, b) => a + options[Object.keys(options)[combo.indexOf(b)]][b.split(": ")[1]], 0) == points) {
          valid_combinations.push(combo);
          count++;
      }
  }

  return valid_combinations;
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
