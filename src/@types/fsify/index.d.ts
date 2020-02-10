type options = {
    cwd?: string;
    presistent?: boolean;
    force?: boolean;
};

declare module 'fsify' {
    function fsify (opttions?: options): (sturcuture: object[]) => Promise<Array<object>> ;
    const DIRECTORY = 'directory'
    const FILE = 'file'
}