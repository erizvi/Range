export declare class Range {
    min: number;
    max: number;
    span: number;
    isEmpty: boolean;
    rawString: string;
    constructor(minmax: string | [number | null, number | null] | number[]);
    compareTo(another: Range, option?: RANGE_COMPARATOR_OPTIONS): number | undefined;
    compareToWithOverrideOrderMaps(another: Range, orderMap: OrderMap, option?: RANGE_COMPARATOR_OPTIONS): number | undefined;
    static compareTo(range1: string | Range, range2: string | Range): number | undefined;
}
export declare enum RANGE_COMPARATOR_OPTIONS {
    EMTPY_RANGE_BEFORE = 1,
    EMPTY_RANGE_AFTER = 2
}
export declare type OrderMap = {
    [key: string]: number;
};
