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

async function ask() {
  let { input } = await prompt({
    type: "input",
    name: "input",
    message: "Enter Input To Classify:",
  });
  console.log('Classified As:', classifier.classify(input));
}

ask();