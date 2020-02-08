import { IESPCommand, OptionalCmdArg, CmdArg } from "./IESPCommand";

export class ESPCommand implements IESPCommand {
    constructor(private id: string,
        public positionalArgs?: CmdArg[],
        public optionalArgs?: OptionalCmdArg[]) { }

    private buildCommand(): string {
        const space = ' ';
        return `${ this.id }` + space +
            `${ this.positionalArgs? this.positionalArgs.join(space) + space: '' }` +
            `${ this.optionalArgs? this.optionalArgs.map(a => a.join(space)).join(space): '' }`;
    }

    get cmd(): string {
        return this.buildCommand();
    }
}