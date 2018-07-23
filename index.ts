#!/usr/bin/env node
import {App} from "./src/app";

const program = require('commander');
program
    .arguments('<action>')
    .action(function (action) {
        action = action.toUpperCase();
        try {

            const app = new App(action);
            app.addAction();
            console.log('Action %s added successfully.', action);
        }
        catch (e) {
            console.log('Action %s threw an error: %s', action, e);
        }
    })
    .parse(process.argv);
