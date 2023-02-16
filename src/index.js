module.exports = function check(str, bracketsConfig) {
  console.log(`\n\nstr =`, str);
  let pairs = {},
    openBracketsStack = [],
    key, a, b, waitBracket;

  for (key in bracketsConfig) {
    [a, b] = bracketsConfig[key];
    pairs[a] = b;
  }
  console.log("pairs =", pairs);

  for (let a of str) {
    if (a in pairs) {
      // this is open bracker - save to stack
      openBracketsStack.push(a);
      continue;
    }

    // this is closing brackets. Test for pairs
		waitBracket = pairs[openBracketsStack.pop()]
    if (a !== waitBracket) {
      console.log(`An erroneous closing bracket "${a}". I wait "${waitBracket}"`);

      return false;
    }
  }

  if (openBracketsStack.length !== 0) {
		console.log(`There are not closed brackets:`, openBracketsStack)
		
    return false;
  } else {
    return true;
  }
};
