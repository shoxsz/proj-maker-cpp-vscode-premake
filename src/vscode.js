const path = require("path");
const fs = require("fs");
const project = require("./project");
const premake = require("./premake");

const isExecutableProject = function(configs){
  const isConsole = configs.projectKind.toLowerCase() == "consoleapp";
  const isWindowed = configs.projectKind.toLowerCase() == "windowedapp";

  return isConsole || isWindowed;
}

const createPremakeTask = function(configs){
  return {
    "type": "shell",
    "label": "Premake5Build",
    "command": "premake5",
    "args": [
      "vs2019"
    ],
    "problemMatcher": "$msCompile"
  }
}

const createDebugTask = function(forWorkspace, configs){
  const label = !!forWorkspace ? "VS Build Debug WS" : "VS Build Debug " + configs.projectName;
  const buildLocation = !!forWorkspace ? `build/${configs.workspaceName}.sln` : `build/${configs.projectName}/${configs.projectName}.vcxproj`

  return {
    "type": "process",
    "label": label,
    "command": "msbuild.exe",
    "args": [
      buildLocation,
      `/p:Configuration=Debug;Platform=${configs.projectArch || 'x64'}`,
      "/fl",
      "/flp:LogFile=build/msbuild.log"
    ],
    "problemMatcher": ["$msCompile"],
    "group": {
      "kind": "build",
      "isDefault": true
    },
    "dependsOn": ["Premake5Build"]
  }
}

const createReleaseTask = function(forWorkspace, configs){
  const label = !!forWorkspace ? "VS Build Release WS" : "VS Build Release " + configs.projectName;
  const buildLocation = !!forWorkspace ? `build/${configs.workspaceName}.sln` : `build/${configs.projectName}/${configs.projectName}.vcxproj`

  return {
    "type": "process",
    "label": label,
    "command": "msbuild.exe",
    "args": [
      buildLocation,
      `/p:Configuration=Release;Platform=${configs.projectArch || 'x64'}`,
      "/fl",
      "/flp:LogFile=build/msbuild.log"
    ],
    "problemMatcher": ["$msCompile"],
    "group": "build",
    "dependsOn": ["Premake5Build"]
  }
}

const createRunReleaseTask = function(configs){
  return {
    "type": "shell",
    "label": "Run Release",
    "command": `\${workspaceFolder}/bin/Release/${configs.projectName}.exe`,
    "problemMatcher": ["$msCompile"],
    "args": [],
    "dependsOn": ["VS Build Release " + configs.projectName]
  };
}

const createTasksScript = function(configs){
  const premakeTask = createPremakeTask(configs);
  const wsDebugTask = createDebugTask(true, configs);
  const wsReleaseTask = createReleaseTask(true, configs);

  const debugTasks = [];
  const releaseTasks = [];
  const runReleaseTasks = [];

  configs.projects.forEach(function(project){
    const projConfigs = { ...configs, ...project };

    const debugTask = createDebugTask(false, projConfigs);
    const releaseTask = createReleaseTask(false, projConfigs);

    debugTasks.push(debugTask);
    releaseTasks.push(releaseTask);

    if(isExecutableProject(projConfigs)){
      runReleaseTasks.push(createRunReleaseTask(projConfigs));
    }
  });

  const tasks = [
    premakeTask,
    wsDebugTask,
    wsReleaseTask,
    ...debugTasks,
    ...releaseTasks,
    ...runReleaseTasks
  ]

  const tasksSrc = JSON.stringify({
    version: "2.0.0",
    tasks
  }, null, 2);

  configs.createFile([".vscode", "tasks.json"], tasksSrc);
}

const createLaunchSrc = function(configs){
  return {
    "name": "Run Debug",
    "type": "cppvsdbg",
    "request": "launch",
    "program": `\${workspaceFolder}/bin/Debug/${configs.projectName}.exe`,
    "args": [],
    "stopAtEntry": true,
    "cwd": "${workspaceFolder}",
    "environment": [],
    "externalConsole": false,
    "preLaunchTask": "VS Build Debug " + configs.projectName
  };
}

const createLaunchScript = function(configs){
  const launchs = [];
  configs.projects.forEach(function(project){
    if(isExecutableProject(project)){
      launchs.push(createLaunchSrc({ ...configs, ...project }))
    }
  });

  const launchConfig = {
    version: "0.2.0",
    configurations: launchs
  };

  configs.createFile([".vscode", "launch.json"], JSON.stringify(launchConfig, null, 2));
}

const createCodeScripts = function(configs){
  configs.createFolder(".vscode");

  createTasksScript(configs);
  createLaunchScript(configs);
}

module.exports = {
  createCodeScripts
}