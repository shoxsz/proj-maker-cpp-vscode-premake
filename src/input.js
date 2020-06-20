const path = require("path");

const ProjectReader = require("./input/ProjectReader");
const WorkspaceReader = require("./input/WorkspaceReader");
const Reader = require("./input/Reader");

const InputReader = function(input){
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

  return async function(){
    const defaults = getDefaults();
    
    const workspaceReader = new WorkspaceReader(input);
    const projectReader = new ProjectReader(input);

    workspaceReader.setDefault(defaults);
    projectReader.setDefault(defaults);

    const reader = new Reader(input);
    reader.setReaders([workspaceReader, projectReader]);

    const configs = await reader.read();

    return {
      ...configs[0],
      projects: configs.slice(1)
    }
  }
}

module.exports = {
  InputReader
}