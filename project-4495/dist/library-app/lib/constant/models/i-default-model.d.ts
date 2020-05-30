export interface IDefaultModel {
    id?: string;
    _raw?: any;
    getData(): object;
}
export interface IDefaultModelConstructor {
    new (data?: any): IDefaultModel;
}
