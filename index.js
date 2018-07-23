#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./src/app");
var program = require('commander');
program
    .arguments('<action>')
    .action(function (action) {
    action = action.toUpperCase();
    try {
        var app = new app_1.App(action);
        app.addAction();
        console.log('Action %s added successfully.', action);
    }
    catch (e) {
        console.log('Action %s threw an error: %s', action, e);
    }
})
    .parse(process.argv);
//# sourceMappingURL=index.js.map