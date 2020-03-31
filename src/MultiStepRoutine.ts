import { MultiStepInput } from './MultiStepInput';
import { QuickPickItem } from 'vscode';


interface State {}


interface InputOpion {
    title: string;
    totalSteps: number;
    step: number;
    shouldResume: () => Promise<boolean>;
}

interface QuickPickOptions extends InputOpion {
    items: QuickPickItem[];
    placeholder: string;
}

interface QuickInputOptions extends InputOpion {
    value: string;
    prompt: string;
    validate: (name: string) => Promise<string | undefined>;
}

type RoutineStep = (input: MultiStepInput, state: Partial<State>) => Promise<any>;


export function MultiStepRotineFactory(state: State, steps: RoutineStep[]) {
    return async function() {
        
        function createStep(input: MultiStepInput, options: QuickPickOptions | QuickInputOptions) {
            return async function() {
                let result: string | QuickPickItem;
                if ('items' in options) {
                    result = await input.showQuickPick(options);
                } else {
                    result = await input.showInputBox(options); 
                }
            };
        }

        for (let step of steps) {
            
        }
        
        async function collectInputs() {
            const state = { } as Partial<State>;
            await MultiStepInput.run(input => steps[0](input, state));
        }

        const state = await collectInputs();
        return {  };
    };
}

