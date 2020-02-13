import * as vscode from 'vscode';
import * as assert from 'assert';
import * as path from 'path';


import { ESPCmdId } from './constants';
import { Commands } from './esp/commnads';
import { ESPToolPy } from './esp/ESPToolPy';
import { existsSync, lstatSync } from 'fs';


const ESPToolPyInstance = new ESPToolPy();

export const commands = [
    vscode.commands.registerCommand(`extension.loadRam`, async () => {
        assert(Commands.loadRam.id === ESPCmdId.LOAD_RAM);
        
        const file = await vscode.window.showInputBox({
            placeHolder: 'path to the firmware image',
            ignoreFocusOut: true,
            prompt: 'laod ram',
            // validateInput: (input) => {
            //     if(existsSync(input) && lstatSync(input).isFile()) {
            //         return undefined;
            //     } else {
            //         return 'the path is invalid';
            //     }
            // },
        });
        if(file) {
            const filePath = vscode.Uri.file(path.join(process.cwd(), file));
            Commands.loadRam.positionalArgs = [filePath.fsPath];
            ESPToolPyInstance.exec(Commands.loadRam);
        }
        
    })
];