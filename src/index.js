module.exports = function check(str, bracketsConfig) {
  const debug = false;
  if (debug) console.log(`\n\nstr = "${str}"`);

  let openBracketsStack = [],
    pairs = {};

  pairs = convertToPairs(bracketsConfig);
  if (debug) console.log("pairs =", pairs);

  for (let char of str) {
    if (debug) console.log(`Processing the symbol "${char}"`);

    if (canCloseBracket(char, openBracketsStack, pairs)) {
      if (debug) console.log("   this is closing bracket");
      openBracketsStack.pop(); // for closing bracket remove opening bracket
      //
    } else {
      if (char in pairs) {
        if (debug) console.log(`   save opening bracket "${char}"`);
        openBracketsStack.push(char); //save new opening bracket
      } else {
        if (debug) console.log(`   this is not open bracket "${char}"`);
        return false; //this is not opening bracket
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
