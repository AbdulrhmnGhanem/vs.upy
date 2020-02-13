export enum ESPCmdId {
    LOAD_RAM = 'load_ram',
    DUMP_MEM = 'dump_mem',
    READ_MEM = 'read_mem',
    WRITE_MEM = 'write_mem',
    WRITE_FLASH = 'write_flash',
    RUN = 'run',
    IMAGE_INFO ='image_info',
    MAKE_IMAGE = 'make_image',
    ELF2IMAGE = 'elf2image',
    READ_MAC = 'read_mac',
    CHIP_ID = 'chip_id',
    FLASH_ID = 'flash_id',
    READ_FLASH_STATUS = 'read_flash_status',
    WRITE_FLASH_STATUS = 'write_flash_status',
    READ_FLASH = 'read_flash',
    VERIFY_FLASH = 'verify_flash',
    ERASE_FLASH = 'erase_flash',
    ERASE_REGION = 'erase_region',
    VERSION = 'version'
}