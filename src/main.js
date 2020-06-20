#!/usr/bin/env node

const project = require("./project");
const input = require("./input");
const readline = require("readline");

const inputStreams = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputReader = input.InputReader(inputStreams);

inputReader()
.then(projData => project.createProject(projData))
.catch(error => console.log("Project creation failed:", error.message))
.finally(() => inputStreams.close());