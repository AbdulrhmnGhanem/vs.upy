import {assert}  from "chai";
import * as mockito from 'ts-mockito';

import { ESPCommand } from "../../esp/ESPCommand";
import { ESPToolPy } from "../../esp/ESPToolPy";


const space = ' ';

suite('ESP Tool Wrapper Test suite {positional arguments}', () => {
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
        const instance = new ESPCommand(instId,
            ['pos1', 2, 'pos3'],
            [['--opt1', 'val1'], ['--opt2', 3]]);
        
        assert.equal(instance.cmd, instId + space + 'pos1 2 pos3 --opt1 val1 --opt2 3');
    });
});


suite('ESP Tool Wrapper Test suite {optional arguments}', () => {
    test('should build command without any arguments', () => {
        const instance = new ESPToolPy();

        assert.equal(instance.cmd, 'esptool.py' + space);
    });

    test('should command with arguments', () => {
        // passing ' ' a space for truthy arguments that doesn't have a value
        // a bit hacky 
        const instance = new ESPToolPy('esp32', '/dev/ttyUSB0', undefined, ' ');

        assert.equal(instance.cmd, `esptool.py -c esp32 -p /dev/ttyUSB0 -t${space}` + space);
    });

    test('should execute command by calling the esptool.py', () => {
        //TODO
        assert(false);
    });
});
