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
    vscode.commands.registerCommand('extension.makeImage', async () => {
        assert(Commands.makeImage.id === ESPCmdId.MAKE_IMAGE);
        makeImageRoutine();
    }),
    vscode.commands.registerCommand('extension.verifyFlashRoutine', async () => {
        assert(Commands.verifyFlash.id ===  ESPCmdId.VERIFY_FLASH);
        const flash = await verfiyFlashRoutine();
    }),
];


async function verfiyFlashRoutine() {
    interface State {
        title: string;
        step: number;
        totalSteps: number;
        addr: string;
        filename: string;
        diff: vscode.QuickPickItem | string;
        flashFreq: vscode.QuickPickItem | string;
        flashMode: vscode.QuickPickItem | string;
        flashSize: vscode.QuickPickItem | string;
        spiConnection: vscode.QuickPickItem | string;
    }

    const diffOptions: vscode.QuickPickItem[] = ['yes', 'no'].map(label => ({ label }));
    const freqOptions: vscode.QuickPickItem[] = ['40m', '26m', '20m', '80m'].map(label => ({ label }));
    const modeOptions: vscode.QuickPickItem[] = ['qio', 'qout', 'dio', 'dout'].map(label => ({ label }));
    const sizeOptions: vscode.QuickPickItem[] = ['1MB', '2MB', '4MB', '8MB', '16MB', '256KB', '512KB', '2MB-c1', '4MB-c1', 'detect', 'keep']
                                                    .map(label => ({ label }));
    const spiOptions: vscode.QuickPickItem[] = ['SPI', 'HSPI'].map(label => ({ label }));

    async function collectInputs() {
        const state = { } as Partial<State>;
        await MultiStepInput.run(input => enterFilename(input, state));
        return state as State;
    }

    const title = 'Verify Flash';

    async function enterFilename(input: MultiStepInput, state: Partial<State>) {
        const filename = await input.showInputBox({
            title,
            totalSteps: 7,
            step: 1,
            value: state.filename || '',
            prompt: 'enter file name',
            shouldResume: shouldResume,
            validate: validateNameInputIsUnique
        });

        state.filename = filename;
        return (input: MultiStepInput) => enterAddr(input, state);
    }

    async function enterAddr(input: MultiStepInput, state: Partial<State>) {
        const addr = await input.showInputBox({
            title,
            totalSteps: 7,
            step: 2,
            value: state.addr || '',
            prompt: 'enter address',
            shouldResume: shouldResume,
            validate: validateNameInputIsUnique
        });

        state.addr = addr;
        return (input: MultiStepInput) => pickDiffOption(input, state);
    }

    async function pickDiffOption(input: MultiStepInput, state: Partial<State>) {
        const diffOption = await input.showQuickPick({
            title,
            totalSteps: 7,
            step: 3,
            items: diffOptions,
            placeholder: 'pick a diff option',
            shouldResume: shouldResume,
        });

        state.diff = diffOption;
        return (input: MultiStepInput) => pickFlashFreq(input, state);
    }

    async function pickFlashFreq(input: MultiStepInput, state: Partial<State>) {
        const flashFreq = await input.showQuickPick({
            title,
            totalSteps: 7,
            step: 4,
            items: freqOptions,
            placeholder: 'pick flash frequency',
            shouldResume: shouldResume
        });

        state.flashFreq = flashFreq;
        return (input: MultiStepInput) => pickFlashMode(input, state);
    }

    async function pickFlashMode(input: MultiStepInput, state: Partial<State>) {
        const flashMode = await input.showQuickPick({
            title,
            totalSteps: 7,
            step: 5,
            items: modeOptions,
            placeholder: 'pick flash mode',
            shouldResume: shouldResume
        });

        state.flashMode = flashMode;
        return (input: MultiStepInput) => pickFlashSize(input, state);
    }

    async function pickFlashSize(input: MultiStepInput, state: Partial<State>) {
        const flashSize = await input.showQuickPick({
            title,
            totalSteps: 7,
            step: 6,
            items: sizeOptions,
            placeholder: 'pick flash size',
            shouldResume: shouldResume
        });

        state.flashSize = flashSize;
        return (input: MultiStepInput) => pickSpiConnection(input, state);
    }

    async function pickSpiConnection(input: MultiStepInput, state: Partial<State>) {
        const spiConnection = await input.showQuickPick({
            title,
            totalSteps: 7,
            step: 7,
            items: spiOptions,
            placeholder: 'pick SPI connection',
            shouldResume: shouldResume
        });

        state.spiConnection = spiConnection;
    }

    async function validateNameInputIsUnique(name: string) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return name === 'vscode' ? 'Name not unique': undefined;
    }
    
    function shouldResume() {
        return new Promise<boolean>((resolve, reject) => {});
    }

    const state = await collectInputs();
    return state;
}


async function makeImageRoutine() {
    interface State {
        title: string;
        step: number;
        totalStep: number;
        filename: string;
        segfile: string;
        segaddr: string;
        entrypoint: string;
    }

    async function collectInputs() {
        const state = {} as Partial<State>;
        await MultiStepInput.run(input => enterFilename(input, state));
        return state as State;
    }
    
    const title = 'Make Image';

    async function enterFilename(input: MultiStepInput, state: Partial<State>) {
        const filename = await input.showInputBox({
            title,
            totalSteps: 4,
            step: 1,
            value: state.filename || '',
            prompt: 'enter file name',
            shouldResume: shouldResume,
            validate: validateNameInputIsUnique
        });

        state.filename = filename;
        return (input: MultiStepInput) => enterSegfile(input, state);
    }

    async function enterSegfile(input: MultiStepInput, state: Partial<State>) {
        const segfile = await input.showInputBox({
            title,
            totalSteps: 4,
            step: 2,
            value: state.segfile || '',
            prompt: 'enter segfile',
            shouldResume: shouldResume,
            validate: validateNameInputIsUnique
        });

        state.segfile = segfile;
        return (input: MultiStepInput) => enetrSegaddr(input, state);
    }

    async function enetrSegaddr(input: MultiStepInput, state: Partial<State>) {
        const segaddr = await input.showInputBox({
            title,
            totalSteps: 4,
            step: 3,
            value: state.segaddr || '',
            prompt: 'enter segaddr',
            shouldResume: shouldResume,
            validate: validateNameInputIsUnique
        });
        state.segaddr = segaddr;
        return (input: MultiStepInput) => enterEntrypoint(input, state);
    }

    async function enterEntrypoint(input: MultiStepInput, state: Partial<State>) {
        const enterypiont = await input.showInputBox({
            title,
            totalSteps: 4,
            step: 4,
            value: state.entrypoint || '',
            prompt: 'enter entrypoint',
            shouldResume: shouldResume,
            validate: validateNameInputIsUnique,
        });
        state.entrypoint = enterypiont;
    }

    async function validateNameInputIsUnique(name: string) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return name === 'vscode' ? 'Name not unique': undefined;
    }

    function shouldResume() {
        return new Promise<boolean>((resolve, reject) => {});
    }

    const state = await collectInputs();
    vscode.window.showInformationMessage('');
}


async function dumpMemRoutine() {
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
