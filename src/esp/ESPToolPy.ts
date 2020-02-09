import { IESPCommand } from './IESPCommand';


export class ESPToolPy {
    private temp = 'esptool.py';
    private options: [string, string | undefined][] = [];
    
    constructor(public chip?: string, public port?: string,
        public baud?: string, public trace?: string,
        public before?: string, public after?: string,
        public stub?: string) { this.updateOptions(); }

    private updateOptions() {
        this.options = [
            // [commandName,value]
            ['-c', this.chip],
            ['-p', this.port],
            ['-b', this.baud],
            ['-t', this.trace],
            ['--before', this.before],
            ['-a', this.after],
            ['--no-stub', this.stub]
        ];
    }

    private buildCommand() {
        this.updateOptions();
        const space = ' ';
        const commandELements = this.options
            .map(option => option[1]? option.join(' '): '')
            .filter(item => item !== '')
            .join(space);

        
        return `${this.temp} ${commandELements}`;
    }

    get cmd() {
        return this.buildCommand();
    }

    public exec(command: IESPCommand): void {
        //TODO
    }
}
