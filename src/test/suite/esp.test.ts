import {assert}  from "chai";
import { ESPCommand } from "../../esp/ESPCommand";


suite('ESP Tool Wrapper Test suite', () => {
    const space = ' ';
    
    test('should build command without any argument', () => {
        const instance = new ESPCommand('someId');
       
        assert.equal(instance.cmd, 'someId' + space);
    });

    test('should build command with postional arguments', () => {
        const instId = 'someIdWithPosionals';
        const instance = new ESPCommand(instId, ['a', 'b', 'c', 1, 2, 3]);
        
        assert.equal(instance.cmd, instId + space + 'a b c 1 2 3' + space);
    });

    test('should build command with optional argumemts', () => {
        const instId = 'someIdWithOptionals';
        const instance = new ESPCommand(instId, undefined, [['-a', 'aVal'], ['b', 2]]);
        
        assert.equal(instance.cmd, instId + space + '-a aVal b 2');
    });

    test('should build full command', () => {
        const instId = 'someIdFullCommand';
        const instace = new ESPCommand(instId,
            ['pos1', 2, 'pos3'],
            [['--opt1', 'val1'], ['--opt2', 3]]);
        
        assert.equal(instace.cmd, instId + space + 'pos1 2 pos3 --opt1 val1 --opt2 3');
    });
});
