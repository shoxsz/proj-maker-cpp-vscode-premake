const Question = require("./Question");

class StringQuestion extends Question{
  setDefaultResponse(defaultResponse){
    this.defaultResponse = defaultResponse;
  }

  printQuestion(){
    let questionStr = this.questionStr;

    if(!!this.defaultResponse){
      questionStr += `(${this.defaultResponse})`
    }

    questionStr += ": "

    return questionStr;
  }

  readAnswer(answer){
    if(!answer){
      if(!!this.defaultResponse){
        return this.defaultResponse;
      }
      throw new Error("Invalid empty answer.");
    }
    
    return answer;
  }
}

module.exports = StringQuestion;