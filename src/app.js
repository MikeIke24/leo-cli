"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shell = require("shelljs");
var fs = require("fs");
function uppercaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function splice(str, idx, rem, addStr) {
    return str.slice(0, idx) + addStr + str.slice(idx + Math.abs(rem));
}
function upperToPascal(upperString) {
    var splitStr = upperString.toLowerCase().split("_");
    var newStr = [];
    for (var _i = 0, splitStr_1 = splitStr; _i < splitStr_1.length; _i++) {
        var str = splitStr_1[_i];
        newStr.push(uppercaseFirst(str));
    }
    return newStr.join("");
}
function replaceNewlineCarriageReturn(str) {
    for (var i = 0; i < str.length - 1; i++) {
        var chars = str.charAt(i) + str.charAt(i + 1);
        if (chars === '\\n') {
            str = splice(str, i, 2, '\n');
        }
        else if (chars === '\\r') {
            str = splice(str, i, 2, '\r');
        }
    }
    return str;
}
var App = /** @class */ (function () {
    function App(actionUpper) {
        this.fileStr = "";
        this.actionUpper = actionUpper;
        this.actionPascal = upperToPascal(actionUpper);
    }
    App.prototype.addAction = function () {
        try {
            shell.exec("cd helpers && mkdir copied && copy Actions.ts .\\copied\\Actions.txt*");
            this.fileStr = JSON.stringify(shell.cat("./helpers/copied/Actions.txt"));
            this.fileStr = this.fileStr.slice(1, this.fileStr.length - 1);
            this.addActionTypesEnum();
            this.addActionClass();
            this.addActionClassToObject();
            this.addActionToActionsType();
            this.fileStr = replaceNewlineCarriageReturn(this.fileStr);
            shell.exec("cd helpers && rmdir /s /q copied");
            fs.writeFile("./helpers/Actions.ts", this.fileStr, function (err) {
                if (err)
                    throw err;
            });
        }
        catch (e) {
            throw e;
        }
    };
    App.prototype.addActionTypesEnum = function () {
        var insertIndex = this.getEditIndex("// Action Classes", "}");
        var actionTypsEnumStr = this.actionUpper + " = '" + this.actionUpper + "',";
        this.fileStr = splice(this.fileStr, insertIndex, 0, "    " + actionTypsEnumStr + "\\r\\n");
    };
    App.prototype.addActionClass = function () {
        var insertIndex = this.getEditIndex("// Action Classes Object", "}") + 7;
        var actionClassStr = "export class " + this.actionPascal + " {\\r\\n    readonly type = ActionTypes." + this.actionUpper + ";\\r\\n}";
        this.fileStr = splice(this.fileStr, insertIndex, 0, actionClassStr + "\\r\\n\\r");
    };
    App.prototype.addActionClassToObject = function () {
        var insertIndex = this.getEditIndex("// Actions Type", "}");
        var actionClassToObjectStr = "'" + this.actionUpper + "': new " + this.actionPascal + "(),";
        this.fileStr = splice(this.fileStr, insertIndex, 0, "    " + actionClassToObjectStr + "\\r\\n");
    };
    App.prototype.addActionToActionsType = function () {
        var semiColonIndex = this.fileStr.lastIndexOf(";");
        this.fileStr = splice(this.fileStr, semiColonIndex, 1, "");
        this.fileStr += "    | " + this.actionPascal + ";\\r\\n";
    };
    App.prototype.getEditIndex = function (query, symbol) {
        var actionClassIndex = this.fileStr.indexOf(query);
        return this.fileStr.lastIndexOf(symbol, actionClassIndex);
    };
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map