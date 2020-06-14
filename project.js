const fs = require("fs");
const path = require("path");

const premake = require("./premake");
const bat = require("./bat");
const vscode = require("./vscode");

class Project{
  constructor(configs){
    Object.assign(this, configs);
    this.folders = [];
    this.creators = [];
  }

  addCreator(creator){
    this.creators.push(creator);
  }

  create(){
    if(!fs.existsSync(this.workspaceLocation)){
      fs.mkdirSync(this.workspaceLocation, { recursive: true });
    }

    this.creators.forEach(creator => creator(this));
  }

  createFolder(folder){
    const folderName = path.join(this.workspaceLocation, folder);

    if(!fs.existsSync(folderName)){
      fs.mkdirSync(folderName, { recursive: true });
    }

    this.folders.push(folderName);
  }

  createFile(filePath, content){
    let fullPath = "";
    if(typeof filePath === "string"){
      fullPath = path.join(this.workspaceLocation, filePath);
    }else if(filePath.length > 0){
      fullPath = path.join(this.workspaceLocation, ...filePath);
    }

    fs.writeFileSync(fullPath, content);
  }

  createPremakeScript(){
    premake.createPremakeScript(this);
  }

  createBatScript(){
    bat.createBatScript(this);
  }

  createCodeScripts(){
    vscode.createCodeScripts(this);
  }

  createScripts(){
    this.createPremakeScript();
    this.createBatScript();
    this.createCodeScripts();
  }
}

const createProject = function(configs){
  const project = new Project(configs);

  project.addCreator(premake.createPremakeScript);
  project.addCreator(bat.createBatScript);
  project.addCreator(vscode.createCodeScripts);

  project.create();
}

module.exports = {
  createProject
}