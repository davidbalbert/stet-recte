WORD_MAPPINGS = {
  "growth hacker": "marketing person",
  "disrupt": "compete with",
  "disrupting": "competing with",
  "curate": "filter",
  "curated": "filtered",
  "web scale": "large",
  "google scale": "large",
  "social sharing": "spamming",
  "share": "spam",
  "sharing": "spamming",
  "monies": "money",
  "leverage": "use",
  "leveraged": "used",
  "crushing it": "doing well",
  "crushed it": "did well",
  "pivot to": "try again with",
  "very": "",
  "a bit of": "",
  "numerous": "many",
  "utilize": "use",
  "utilized": "used",
  "the cloud": "online",
  "guru": "expert",
  "stealth": "doomed",
  "pre-?launch": "still-hopeful",
  "revolutionary": "improved",
  "consumers": "people",
  "consumer": "person",
  "(rockstar|ninja)(-| )(programmer|developer)": "programmer",
  "!!+": "!",
  "rediculo?us": "ridiculous",
  "startup (expert|advisor) ": "person",
  "daily deal": "coupon",
  "top(-| )?tier": "good",
  "mobile strategy": "iPhone app",
  "tablet": "iPad",
  "mvp|minimum viable product": "WordPress site",
  "game mechanics": "badges"
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
