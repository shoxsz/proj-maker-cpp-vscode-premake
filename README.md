
# C++ Project Creator

This is a simple tool for creating C++ projects with **vscode** and **premake**, it's purpose is to ease the creation of vscode json files for tasks and launch configurations.


## How to use

Jut download it and run `npm start`, the tool will prompt you to enter the project location, workspace name, project name, etc. the tool will create the project location you entered, add a `.vscode` folder and populate it with a `tasks.json` and a `launch.json` files, it will also add a `premake5.lua` file with the projects configurations and add a `.bat` file with instructions to open vscode within the **Developer Command Prompt for Vs 2019**.


## Tasks list

| Tasks | Action |
| ---------- | ------------- |
| Premake5Build | Invoke premake5 vs2019 to build the Visual Studio Project |
| VS Build Debug WS | Build the visual Studio solution in debug mode |
| Vs Build Release WS | Build the visual Studio solution in release mode |
| Vs Build Debug \<ProjectName\> | Build the project in debug mode |
| Vs Build Release \<ProjectName\> | Build the project in release mode |
| Run Release \<ProjectName\> | Run the project in release mode, only for projects that generates .exe files(ConsoleApp/WindowedApp) |


## Launch Configurations
It creates one launch configuration name `Run Debug <ProjectName>` for each project that generates a .exe file(ConsoleApp/WindowedApp), `stopAtEntry` will be *true*

# Contribute

Feel free to contribute to the project or to fork it, I may add some code to it as I feel the need.
