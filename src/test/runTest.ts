import * as path from 'path';

import { runTests } from 'vscode-test';
import { mkdirSync, mkdir } from 'fs';
import { window } from 'vscode';

const out = path.join(__dirname, '..');

async function main() {
	try {
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');
		const extensionTestsPath = path.resolve(__dirname, './suite/index');
		const testWorkspace = path.join(out, 'tmp', 'workspaceFolder');
		mkdir(testWorkspace, () => {});

		await runTests({
			extensionDevelopmentPath,
			extensionTestsPath,
			launchArgs: [testWorkspace, '--disable-extensions'],
		});
	} catch (err) {
		console.error('Failed to run tests');
		process.exit(1);
	}
}

main();
