import * as vscode from 'vscode';
import { readdir, lstatSync, readdirSync, readSync } from 'fs';
import { join, sep } from 'path';

import { commands } from './commands';


export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-upy" is now active!');
	context.subscriptions.concat(commands);
}

export function deactivate() {}
