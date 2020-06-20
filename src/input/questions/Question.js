class Question{
  setQuestion(question){
    this.questionStr = question;
  }

  setInputStream(inputStream){
    this.inputStream = inputStream;
  }

  async question(){
    return new Promise((resolve, reject) => {
      this.inputStream.question(this.printQuestion(), answer => {
        try{
          const answerRead = this.readAnswer(answer);
          resolve(answerRead);
        }catch(error){
          reject(error);
        }
      });
    });
  }
}

module.exports = Question;