declare enum EnumOperation {
    LESS = "<",
    LESS_EQUAL = "<=",
    EQUAL = "==",
    GREATER = ">",
    GREATER_EQUAL = ">="
}
export declare class QueryParamModel {
    static OPERATIONS: typeof EnumOperation;
    key: string;
    operation: EnumOperation;
    value: any;
    constructor(key: string, operation: EnumOperation, value: any);
}
export {};
