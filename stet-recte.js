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
    var span;
    if (match.toUpperCase() == match) {
      span = str.toUpperCase();
    } else if (match[0].toUpperCase() == match[0]) {
      span = makeTitleCase(str);
    } else {
      span = str;
    }

    return "<span class='stet-recte-rollover' data-replace='" + match + "'>" + span + "</span>";
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
    console.log(treeWalker.currentNode.data);
    if (treeWalker.currentNode.data.match(regexp)) {
      console.log("A MATCH!");
      console.log(treeWalker.currentNode.parentElement);
      treeWalker.currentNode.parentElement.innerHTML = treeWalker.currentNode.data.replace(regexp, REPLACEMENT_FUNCTIONS[i]);
    }
  });
}
