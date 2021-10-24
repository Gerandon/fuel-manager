export const fullSizeDialogConfig = {
    height: '90%',
    width: '90%',
    maxWidth: '90%'
}

export interface MaskType {
    mask: RegExp | Function | string | number | Date | MaskType[];
    lazy?: boolean;
    placeholderChar?: string;
    blocks?: any;
    pattern?: string;
    min?: number | Date;
    max?: number | Date;
    parse?: Function;
    format?: Function;
    scale?: number;
    signed?: boolean;
    thousandsSeparator?: string;
    padFractionalZeros?: boolean;
    normalizeZeros?: boolean;
    radix?: string;
    mapToRadix?: string[];
    prepare?: Function;
}
