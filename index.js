const fs = require("fs");
const { prompt } = require("enquirer");
const { BayesClassifier } = require("natural");
const classifier = new BayesClassifier();

fs.readdirSync("data").forEach((file) =>
  JSON.parse(fs.readFileSync("data/" + file, "utf8")).forEach((sentence) =>
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
  if (classifications === [
    'insult: 10.13%',
    'apology: 9.81%',
    'command: 9.81%',
    'compliment: 9.81%',
    'emotion: 9.81%',
    'opinion: 9.81%',
    'answer: 9.49%',
    'greeting: 9.49%',
    'goodbye: 9.18%',
    'conversation: 8.54%',
    'statement: 5.38%',
    'question: 2.22%'
  ]) {
    console.log('classified as: unknown');
    return;
  }
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
