import * as shell from 'shelljs';

export class App {
    addAction(file: string) {
        const fileStr = shell.cat(file);
    }
}

