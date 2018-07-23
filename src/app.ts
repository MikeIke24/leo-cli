import * as shell from 'shelljs';
import * as fs from 'fs';

function uppercaseFirst(string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function splice(str, idx, rem, addStr) {
    return str.slice(0, idx) + addStr + str.slice(idx + Math.abs(rem));
}

function upperToPascal(upperString: string) {
    const splitStr = upperString.toLowerCase().split("_");
    const newStr: string[] = [];
    for (let str of splitStr) {
        newStr.push(uppercaseFirst(str));
    }
    return newStr.join("");
}

function replaceNewlineCarriageReturn(str: string) {
    for (let i = 0; i < str.length - 1; i++) {
        const chars = str.charAt(i) + str.charAt(i + 1);
        if (chars === '\\n') {
            str = splice(str, i, 2, '\n');
        }
        else if (chars === '\\r') {
            str = splice(str, i, 2, '\r');
        }
    }
    return str;
}

export class App {
    actionUpper: string;
    actionPascal: string;
    fileStr: string = "";

    constructor(actionUpper) {
        this.actionUpper = actionUpper;
        this.actionPascal = upperToPascal(actionUpper);
    }

    addAction() {
        try {
            shell.exec(`cd helpers && mkdir copied && copy Actions.ts .\\copied\\Actions.txt*`);
            this.fileStr = JSON.stringify(shell.cat("./helpers/copied/Actions.txt"));
            this.fileStr = this.fileStr.slice(1, this.fileStr.length - 1);
            this.addActionTypesEnum();
            this.addActionClass();
            this.addActionClassToObject();
            this.addActionToActionsType();
            this.fileStr = replaceNewlineCarriageReturn(this.fileStr);
            shell.exec(`cd helpers && rmdir /s /q copied`);
            fs.writeFile("./helpers/Actions.ts", this.fileStr, (err) => {
                if (err) throw err;
            })
        }
        catch (e) {
            throw e;
        }
    }

    addActionTypesEnum() {
        const insertIndex = this.getEditIndex("// Action Classes", "}");
        const actionTypsEnumStr = `${this.actionUpper} = '${this.actionUpper}',`;
        this.fileStr = splice(this.fileStr, insertIndex, 0, `    ${actionTypsEnumStr}\\r\\n`);
    }

    addActionClass() {
        const insertIndex = this.getEditIndex("// Action Classes Object", "}") + 7;
        const actionClassStr = `export class ${this.actionPascal} {\\r\\n    readonly type = ActionTypes.${this.actionUpper};\\r\\n}`;
        this.fileStr = splice(this.fileStr, insertIndex, 0, `${actionClassStr}\\r\\n\\r`);
    }

    addActionClassToObject() {
        const insertIndex = this.getEditIndex("// Actions Type", "}");
        const actionClassToObjectStr = `'${this.actionUpper}': new ${this.actionPascal}(),`;
        this.fileStr = splice(this.fileStr, insertIndex, 0, `    ${actionClassToObjectStr}\\r\\n`);
    }

    addActionToActionsType() {
        const semiColonIndex = this.fileStr.lastIndexOf(";");
        this.fileStr = splice(this.fileStr, semiColonIndex, 1, "");
        this.fileStr += `    | ${this.actionPascal};\\r\\n`;
    }

    getEditIndex(query: string, symbol: string): number {
        const actionClassIndex = this.fileStr.indexOf(query);
        return this.fileStr.lastIndexOf(symbol, actionClassIndex);
    }
}

