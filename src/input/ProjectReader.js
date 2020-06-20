const StringQuestion = require("./questions/StringQuestion");

class ProjectReader{
  constructor(inputStream){
    this.inputStream = inputStream;
  }

  setDefault(defaultValue){
    this.defaultValue = defaultValue;
  }

  async read(){
    const project = {}

    project.projectName = await this.questionName();
    project.projectLanguage = await this.questionLanguage();
    project.projectKind = await this.questionKind();
    project.projectArch = await this.questionArch();
    project.sourceFiles = await this.questionSourceFiles();
  
    return project;
  }

  async questionName(){
    const question = new StringQuestion();

    question.setInputStream(this.inputStream);
    question.setDefaultResponse(this.defaultValue.projectName);
    question.setQuestion("Project Name");

    return question.question();
  }

  async questionLanguage(){
    const question = new StringQuestion();

    question.setInputStream(this.inputStream);
    question.setDefaultResponse(this.defaultValue.projectLanguage);
    question.setQuestion("Project Language");

    return question.question();
  }

  async questionKind(){
    const question = new StringQuestion();

    question.setInputStream(this.inputStream);
    question.setDefaultResponse(this.defaultValue.projectKind);
    question.setQuestion("Project Kind");

    return question.question();
  }

  async questionArch(){
    const question = new StringQuestion();

    question.setInputStream(this.inputStream);
    question.setDefaultResponse(this.defaultValue.projectArch);
    question.setQuestion("Project Arch");

    return question.question();
  }

  async questionSourceFiles(){
    const question = new StringQuestion();

    question.setInputStream(this.inputStream);
    question.setDefaultResponse(this.defaultValue.sourceFiles);
    question.setQuestion("Project Source Files");

    const sourceFiles = await question.question();

    return sourceFiles.split(",");
  }
}

module.exports = ProjectReader;