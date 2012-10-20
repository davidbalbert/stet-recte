WORD_MAPPINGS = {
  "growth hacker": "marketing person",
  "disrupt": "compete with"
};

WORD_REGEXPS = []
WORD_REPLACEMENTS = []

for (var key in WORD_MAPPINGS) {
  WORD_REGEXPS.push(new RegExp(key, "i"));
  WORD_REPLACEMENTS.push(WORD_MAPPINGS[key]);
}

var treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
    false
);

while(treeWalker.nextNode()) {
  WORD_REGEXPS.forEach(function(regexp, i) {
    treeWalker.currentNode.data = treeWalker.currentNode.data.replace(regexp, WORD_REPLACEMENTS[i]);
  });
}
