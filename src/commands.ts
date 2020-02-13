import * as vscode from 'vscode';
import * as assert from 'assert';
import * as path from 'path';


import { ESPCmdId } from './constants';
import { Commands } from './esp/commnads';
import { ESPToolPy } from './esp/ESPToolPy';
import { MultiStepInput } from './MultiStepInput';


const ESPToolPyInstance = new ESPToolPy();

export const commands: vscode.Disposable[] = [
    vscode.commands.registerCommand('extension.loadRam', async () => {
        assert(Commands.loadRam.id === ESPCmdId.LOAD_RAM);
        
        const file = await vscode.window.showInputBox({
            placeHolder: 'path to the firmware image',
            ignoreFocusOut: true,
            prompt: 'laod ram',
        });
        
        if(file) {
            const filePath = vscode.Uri.file(path.join(process.cwd(), file));
            Commands.loadRam.positionalArgs = [filePath.fsPath];
            ESPToolPyInstance.exec(Commands.loadRam);
        }        
    }),
    vscode.commands.registerCommand('extension.dumpMem', async () => {
        assert(Commands.dumpMemory.id === ESPCmdId.DUMP_MEM);
        dumpMemRoutine();
    }),
];


export async function dumpMemRoutine() {
    interface State {
        title: string;
        step: number;
        totalStep: number;
        address: string;
        size: string;
        filename: string;
    }

    async function collectInputs() {
        const state = {} as Partial<State>;
        await MultiStepInput.run(input => enterAddress(input, state));
        return state as State;
    }
    
    const title = 'Dump Memory';

    async function enterAddress(input: MultiStepInput, state: Partial<State>) {
        const file = await input.showInputBox({
            title,
            step: 1,
            totalSteps: 3,
            value: state.address || '',
            prompt: 'enter the address to memory dump',
            shouldResume: shouldResume,
            validate: validateNameInputIsUnique

        });

        state.address = file;
        return (input: MultiStepInput) => enterSize(input, state);
    }
    
    async function enterSize(input: MultiStepInput, state: Partial<State>) {
        const size = await input.showInputBox({
            title,
            step: 2,
            totalSteps: 3,
            value: state.size || '',
            prompt: 'enter the size',
            shouldResume: shouldResume,
            validate: validateNameInputIsUnique
        });

        state.size = size;
        return (input: MultiStepInput) => enterFilename(input, state);
    }
    
    async function enterFilename(input: MultiStepInput, state: Partial<State>) {
        const file = await input.showInputBox({
            title,
            step: 3,
            totalSteps: 3,
            value: state.filename || '',
            prompt: 'file name to dump to',
            shouldResume: shouldResume,
            validate: validateNameInputIsUnique
        });

        state.filename = file;
    }

    function shouldResume() {
        return new Promise<boolean>((resolve, reject) => {});
    }

    async function validateNameInputIsUnique(name: string) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return name === 'vscode' ? 'Name not unique': undefined;
    }

    const state = await collectInputs();
    vscode.window.showInformationMessage(`dumping ram from ${state.address} of ${state.size} to ${state.filename}`)
}