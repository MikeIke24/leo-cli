#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./src/app");
var test = 'test';
console.log(test);
console.log(app_1.val);
var program = require('commander');
program
    .arguments('<file>')
    .option('-u, --username <username>', 'The user to authenticate as')
    .option('-p, --password <password>', 'The user\'s password')
    .action(function (file) {
    console.log('user: %s pass: %s file: %s', program.username, program.password, file);
})
    .parse(process.argv);
//# sourceMappingURL=index.js.map