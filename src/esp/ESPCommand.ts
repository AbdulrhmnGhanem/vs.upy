import { IESPCommand, OptionalCmdArg, CmdArg } from "./IESPCommand";

export class ESPCommand implements IESPCommand {
    constructor(private id: string,
        public positionalArgs?: CmdArg[],
        public optionalArgs?: OptionalCmdArg[]) { }

    private buildCommand(): string {
        return '';
    }

    get cmd(): string {
        return this.buildCommand();
    }
}