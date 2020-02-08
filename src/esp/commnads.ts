import { ESPCommand } from './ESPCommand';

export namespace Commands {
    export const loadRam            = new ESPCommand('load_ram');
    export const dumpMemory         = new ESPCommand('dump_mem');
    export const readMemory         = new ESPCommand('read_mem');
    export const writeMemory        = new ESPCommand('write_mem');
    export const writeFlash         = new ESPCommand('write_flash');
    export const run                = new ESPCommand('run');
    export const getImageInfo       = new ESPCommand('image_info');
    export const makeImage          = new ESPCommand('make_image');
    export const elfToImage         = new ESPCommand('elf2image');
    export const readMac            = new ESPCommand('read_mac');
    export const getChipId          = new ESPCommand('chip_id');
    export const getFlashId         = new ESPCommand('flash_id');
    export const readFlashStatus    = new ESPCommand('read_flash_status');
    export const writeFlashStatus   = new ESPCommand('write_flash_status');
    export const readFlash          = new ESPCommand('read_flash');
    export const verifyFlash        = new ESPCommand('verify_flash');
    export const eraseFlash         = new ESPCommand('erase_flash');
    export const eraseRegion        = new ESPCommand('erase_region');
    export const getVersion         = new ESPCommand('version');
}
