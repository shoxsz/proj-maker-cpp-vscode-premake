const StringQuestion = require("./questions/StringQuestion");

class WorkspaceReader{
  constructor(inputStream){
    this.inputStream = inputStream;
  }

  setDefault(defaultValue){
    this.defaultValue = defaultValue;
  }

  async read(){
    const workspace = {};

    workspace.workspaceLocation = await this.questionLocation();
    workspace.workspaceName = await this.questionWorkspaceName();

    return workspace;
  }

  async questionLocation(){
    const question = new StringQuestion();

    question.setInputStream(this.inputStream);
    question.setDefaultResponse(this.defaultValue.workspaceLocation);
    question.setQuestion("Location");

    return question.question();
  }

  async questionWorkspaceName(){
    const question = new StringQuestion();

    question.setInputStream(this.inputStream);
    question.setDefaultResponse(this.defaultValue.workspaceName);
    question.setQuestion("Workspace Name");

    return question.question();
  }
}

module.exports = WorkspaceReader;