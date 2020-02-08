export type CmdArg = (string | number);
export type OptionalCmdArg = [string, CmdArg];


export interface IESPCommand {
    positionalArgs?: CmdArg[];
    optionalArgs?: OptionalCmdArg[];
    readonly cmd: string;
}
