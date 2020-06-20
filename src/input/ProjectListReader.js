const StringQuestion = require("./questions/StringQuestion");
const ProjectReader = require("./ProjectReader");

class ProjectListReader{
  constructor(inputStream){
    this.inputStream = inputStream;
    this.projects = [];
  }

  setDefault(defaults){
    this.defaults = defaults;
  }

  async read(){
    await this.readProject();
    while(await this.shouldContinue()){
      await this.readProject();
    }

    return this.projects;
  }

  async readProject(){
    const project = new ProjectReader(this.inputStream);

    project.setDefault(this.defaults);

    const projectObj = await project.read();

    this.projects.push(projectObj);
  }

  async shouldContinue(){
    const continueAnswer = (await this.questionContinue()).toLowerCase();
    return !continueAnswer.startsWith("n");
  }

  async questionContinue(){
    const question = new StringQuestion();

    question.setInputStream(this.inputStream);
    question.setDefaultResponse("no");
    question.setQuestion("Add more projects");

    return question.question();
  }
}

module.exports = ProjectListReader;