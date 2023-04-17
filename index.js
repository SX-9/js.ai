const fs = require('fs');
const { BayesClassifier } = require('natural');
const classifier = new BayesClassifier();

fs.readdirSync('data').forEach(file => {
  JSON.parse(fs.readFileSync('data/' + file, 'utf8')).forEach(sentence => {
    classifier.addDocument(sentence, file.split('.')[0]);
  });
});

classifier.train();
console.log(classifier.classify('hi, nice to meet you!'));
console.log(classifier.classify('ok, ill see you tomorrow!'))