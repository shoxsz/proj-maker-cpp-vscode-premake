const path = require("path");

const ProjectListReader = require("./input/ProjectListReader");
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
    const projectListReader = new ProjectListReader(input);

    workspaceReader.setDefault(defaults);
    projectListReader.setDefault(defaults);

    const reader = new Reader(input);
    reader.setReaders([workspaceReader, projectListReader]);

    const configs = await reader.read();

    return {
      ...configs[0],
      projects: configs[1]
    }
  }
}

module.exports = {
  InputReader
}