const fs = require("fs");
const { prompt } = require("enquirer");
const { BayesClassifier } = require("natural");
const classifier = new BayesClassifier();

fs.readdirSync("data").forEach((file) =>
  require("./data/" + file).forEach((sentence) =>
    classifier.addDocument(sentence, file.split(".")[0])
  )
);
classifier.train();

async function classify() {
  let { input } = await prompt({
    type: "input",
    name: "input",
    message: "enter input to classify:",
  });
  let classifications = classifier.getClassifications(input);
  console.log("classified as:", classifier.classify(input));
  console.log(
    classifications
      .map((cat) => cat.label + ": " + (cat.value * 100).toFixed(2) + "%")
  );
}

async function start() {
  while (true) {
    await classify();
  }
}

start();
