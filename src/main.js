#!/usr/bin/env node

const project = require("./project");
const input = require("./input");
const readline = require("readline");

const inputStreams = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputReader = input.InputReader(inputStreams);

inputReader().then(projData => project.createProject(projData)).finally(() => inputStreams.close());