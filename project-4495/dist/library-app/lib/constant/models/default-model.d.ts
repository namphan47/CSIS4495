import { IDefaultModel } from './i-default-model';
export declare class DefaultModel implements IDefaultModel {
    _raw: any;
    constructor(data: any);
    copyInto(json: any): void;
    getData(): object;
}
