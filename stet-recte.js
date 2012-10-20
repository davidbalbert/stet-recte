WORD_MAPPINGS = {
  "growth hacker": "marketing person",
  "disrupt": "compete with"
};

WORD_REGEXPS = [];
REPLACEMENT_FUNCTIONS = [];

function makeTitleCase(str) {
  return str[0].toUpperCase() + str.substr(1);
}

function makeReplacementFunction(str) {
  return function(match) {
    if (match.toUpperCase() == match) {
      return str.toUpperCase();
    } else if (match[0].toUpperCase() == match[0]) {
      return makeTitleCase(str);
    } else {
      return str;
    }
  };
}

for (var key in WORD_MAPPINGS) {
  WORD_REGEXPS.push(new RegExp(key, "gi"));
  REPLACEMENT_FUNCTIONS.push(makeReplacementFunction(WORD_MAPPINGS[key]));
}

var treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
    false
);

while(treeWalker.nextNode()) {
  WORD_REGEXPS.forEach(function(regexp, i) {
    treeWalker.currentNode.data = treeWalker.currentNode.data.replace(regexp, REPLACEMENT_FUNCTIONS[i]);
  });
}
