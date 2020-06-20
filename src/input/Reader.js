const StringQuestion = require("./questions/StringQuestion");

class Reader{
  constructor(inputStream){
    this.inputStream = inputStream;
  }

  setDefault(defaultValue){
    this.defaultValue = defaultValue;
  }

  setReaders(readers){
    this.readers = readers;
  }

  async read(){
    const objs = []

    for(const reader of this.readers){
      const obj = await reader.read();
      objs.push(obj);
    }

    return objs;
  }

  async shouldContinue(){
    const continueAnswer = await this.questionContinue().toLowerCase();
    return continueAnswer.startsWith("n");
  }

  async questionContinue(){
    const question = new StringQuestion();

    question.setInputStream(this.inputStream);
    question.setDefaultResponse("no");
    question.setQuestion("Add more projects");

    return question.question();
  }
}

module.exports = Reader;