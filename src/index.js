module.exports = function check(str, bracketsConfig) {
	let openBracketsStack = [],
	pairs = {};
	
	const debug = false;
  if (debug) console.log(`\n\nstr = "${str}"`);
  
	pairs = convertToPairs(bracketsConfig);
  if (debug) console.log("pairs =", pairs);

  for (let char of str) {
    if (debug) console.log(`Processing the symbol "${char}"`);

    if (canCloseBracket(char, openBracketsStack, pairs)) {
      if (debug) console.log("   this is closing bracket");
      openBracketsStack.pop(); // use closing bracket
      //
    } else {
      if (char in pairs) {
        if (debug) console.log(`   save opening bracket "${char}"`);
        openBracketsStack.push(char); //save new open bracket
      } else {
        if (debug) console.log(`   this is not open bracket "${char}"`);
        return false; //this is not open bracket
      }
    }
  }

  // str fully processed
  if (debug) console.log("str fully processed. Now stack =", openBracketsStack);
  if (openBracketsStack.length > 0) {
    return false;
  } else {
    return true;
  }
};

//
// ADDITIONAL FUNCTIONS
//
function convertToPairs(config) {
  let resultPairs = {},
    a,
    b;
  for (let key in config) {
    [a, b] = config[key];
    resultPairs[a] = b;
  }
  return resultPairs;
}

function canCloseBracket(nextBracket, openBracketsStack, pairs) {
  if (openBracketsStack.length == 0) return false;

  let lastOpenBracket = openBracketsStack.slice(-1)[0];
  let waitCloseBracket = pairs[lastOpenBracket];
  if (nextBracket === waitCloseBracket) {
    return true;
  } else {
    return false;
  }
}
