const fs = require("fs");
const path = require("path");

const createWorkspace = function(workspaceTemplate, configs){
  workspaceTemplate = workspaceTemplate.replace(/\{workspace_name\}/g, configs.workspaceName);

  return workspaceTemplate;
}

const getSourceArray = function(configs){
  return configs.sourceFiles.map(function(source){
    return `"${source}"`;
  }).join(", ");
}

const createSourceFolders = function(configs, sources){
  sources.forEach(function(source){
    let split = source.split("/");

    if(!split.length){
      split = source.split("\\");
    }

    if(split.length > 0){
      configs.createFolder(split[0]); 
    }
  });
}

const createProject = function(projectTemplate, configs, project){
  projectTemplate = projectTemplate.replace(/\{project_name\}/g, project.projectName);
  projectTemplate = projectTemplate.replace(/\{project_kind\}/g, project.projectKind);
  projectTemplate = projectTemplate.replace(/{\project_language\}/g, project.projectLanguage);
  projectTemplate = projectTemplate.replace(/\{project_arch\}/g, project.projectArch);

  projectTemplate = projectTemplate.replace(/\{project_files\}/g, getSourceArray(project));
  createSourceFolders(configs, project.sourceFiles);

  return projectTemplate;
}

const createPremakeScript = function(configs){
  const workspaceTemplate = configs.readTemplate("premake_workspace.template", { encoding: "utf-8" });
  const projectTemplate = configs.readTemplate("premake_project.template", { encoding: "utf-8" });

  const workspace = createWorkspace(workspaceTemplate, configs);

  const projects = []
  configs.projects.forEach(function(project){
    const projectSrc = createProject(projectTemplate, configs, project);
    projects.push(projectSrc);
  });

  const scriptSrc = workspace + "\n" + projects.join("\n\n");
  
  configs.createFile("premake5.lua", scriptSrc);
}

module.exports = {
  createPremakeScript
}