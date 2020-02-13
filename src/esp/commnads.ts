import { ESPCommand } from './ESPCommand';
import { ESPCmdId } from '../constants';

export namespace Commands {
    export const loadRam            = new ESPCommand(ESPCmdId.LOAD_RAM);
    export const dumpMemory         = new ESPCommand(ESPCmdId.DUMP_MEM);
    export const readMemory         = new ESPCommand(ESPCmdId.READ_MEM);
    export const writeMemory        = new ESPCommand(ESPCmdId.WRITE_MEM);
    export const writeFlash         = new ESPCommand(ESPCmdId.WRITE_FLASH);
    export const run                = new ESPCommand(ESPCmdId.RUN);
    export const getImageInfo       = new ESPCommand(ESPCmdId.IMAGE_INFO);
    export const makeImage          = new ESPCommand(ESPCmdId.MAKE_IMAGE);
    export const elfToImage         = new ESPCommand(ESPCmdId.ELF2IMAGE);
    export const readMac            = new ESPCommand(ESPCmdId.READ_MAC);
    export const getChipId          = new ESPCommand(ESPCmdId.CHIP_ID);
    export const getFlashId         = new ESPCommand(ESPCmdId.FLASH_ID);
    export const readFlashStatus    = new ESPCommand(ESPCmdId.READ_FLASH_STATUS);
    export const writeFlashStatus   = new ESPCommand(ESPCmdId.WRITE_FLASH_STATUS);
    export const readFlash          = new ESPCommand(ESPCmdId.READ_FLASH);
    export const verifyFlash        = new ESPCommand(ESPCmdId.VERIFY_FLASH);
    export const eraseFlash         = new ESPCommand(ESPCmdId.ERASE_FLASH);
    export const eraseRegion        = new ESPCommand(ESPCmdId.ERASE_REGION);
    export const getVersion         = new ESPCommand(ESPCmdId.VERSION);
}
