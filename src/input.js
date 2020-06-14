const path = require("path");

const InputReader = function(input){
  const question = function(questionStr){
    return new Promise(function(resolve, reject){
      input.question(questionStr, function(answer){
        resolve(answer);
      })
    });
  }
  
  const getDefaults = function(){
    const cwd = process.cwd();
    
    const workspaceName = path.basename(cwd);
    const workspaceLocation = cwd;
  
    return {
      workspaceName,
      workspaceLocation,
      projectName: workspaceName,
      projectLanguage: "C++",
      projectKind: "ConsoleApp",
      projectArch: "x64",
      sourceFiles: "src/**.hpp, src/**.h, src/**.cpp" 
    }
  }
  
  const readWorkspace = async function(defaults){
    const workspaceLocation = await question(`location(${defaults.workspaceLocation}): `) || defaults.workspaceLocation;
    const workspaceName = await question(`Workspace Name(${defaults.workspaceName}): `) || defaults.workspaceName;
  
    return {
      workspaceName,
      workspaceLocation
    };
  }
  
  const readProject = async function(defaults){
    const projectName = await question(`Project name(${defaults.projectName}): ` ) || defaults.projectName;
    const projectLanguage = await question(`Project Language(${defaults.projectLanguage}): `) || defaults.projectLanguage;
    const projectKind = await question(`Project Kind(${defaults.projectKind}): `) || defaults.projectKind;
    const projectArch = await question(`Project Arch(${defaults.projectArch}): `) || defaults.projectArch;
    const sourceFiles = await question(`Project Source Files(${defaults.sourceFiles}): `) || defaults.sourceFiles;
  
    return {
      projectName,
      projectLanguage,
      projectKind,
      projectArch,
      sourceFiles: sourceFiles.replace(/ /g, "").split(",")
    };
  }
  
  const readContinue = async function(ask, continueAnswer){
    const answer = await question(ask);
  
    if(!answer){
      return true;
    }
  
    return answer.toLowerCase() == continueAnswer.toLowerCase();
  }

  return async function(){
    const defaults = getDefaults();
    
    const workspace = await readWorkspace(defaults);
    const proj = await readProject(defaults);

    const project = {
      ...workspace,
      projects: [ proj ]
    };

    while(!await readContinue("Add project(no)? ", "no")){
      const proj = await readProject(defaults);
      project.projects.push(proj);
    }

    return project;
  }
}

module.exports = {
  InputReader
}