import * as vscode from 'vscode';

import { commands } from './commands';


export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-upy" is now active!');
	context.subscriptions.concat(commands);
}

export function deactivate() {}
