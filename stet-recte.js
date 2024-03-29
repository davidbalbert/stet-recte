WORD_MAPPINGS = {
  "growth hackers": "marketing people",
  "growth hacker": "marketing person",
  "disrupt": "compete with",
  "disrupting": "competing with",
  "curated": "filtered",
  "curate": "filter",
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
  "innovative": "improved",
  "consumers": "people",
  "consumer": "person",
  "(rock-?star|ninja)(-| )(programmer|developer)": "programmer",
  "!!+": "!",
  "rediculo?us": "ridiculous",
  "startup (expert|advisor) ": "person",
  "daily deal": "coupon",
  "top(-| )?tier": "good",
  "mobile strategy": "iPhone app",
  "tablet": "iPad",
  "mvp|minimum viable product": "WordPress site",
  "game mechanics": "badges",
  "scene": "clusterfuck",
  "viral": "spammy",
  "virality": "spamminess"
};

WORD_REGEXPS = [];
REPLACEMENT_FUNCTIONS = [];

function makeTitleCase(str) {
  return str[0].toUpperCase() + str.substr(1);
}

function makeReplacementFunction(str) {
  return function(match) {
    var content;
    if (match.toUpperCase() == match) {
      content = str.toUpperCase();
    } else if (match[0].toUpperCase() == match[0]) {
      content = makeTitleCase(str);
    } else {
      content = str;
    }

    return "<span class='stet-recte-rollover' data-replace='" + match + "'>" + content + "</span>";
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

elementsToReplace = [];
while(treeWalker.nextNode()) {
  var originalString = treeWalker.currentNode.data;
  var replacementString = originalString;
  WORD_REGEXPS.forEach(function(regexp, i) {
    if (originalString.match(regexp)) {
      replacementString = replacementString.replace(regexp, REPLACEMENT_FUNCTIONS[i])
    }
  });

  if (replacementString != originalString) {
    elementsToReplace.push([treeWalker.currentNode.parentElement, replacementString]);
  }
}

elementsToReplace.forEach(function(matchInfo) {
  var element = matchInfo[0];
  var replacementString = matchInfo[1];
  element.innerHTML = replacementString;
});


function addEventListeners(span, originalText, replacementText) {
  if (originalText.length > replacementText.length) {
    var difference = originalText.length - replacementText.length;
    replacementText = replacementText + new Array(difference + 2).join("&nbsp;");
  }

  span.addEventListener("mouseover", function(e) {
    e.target.innerHTML = replacementText;
  });

  span.addEventListener("mouseout", function(e) {
    e.target.innerHTML = originalText;
  });
}

var rolloverSpans = document.getElementsByClassName("stet-recte-rollover");
var i;
for (i = 0; i < rolloverSpans.length; i++) {
  var span = rolloverSpans[i];
  var replacementText = span.attributes["data-replace"].value;
  var originalText = span.textContent;

  addEventListeners(span, originalText, replacementText);
}
