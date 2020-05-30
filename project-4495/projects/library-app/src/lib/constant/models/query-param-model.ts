enum EnumOperation {
  LESS = '<',
  LESS_EQUAL = '<=',
  EQUAL = '==',
  GREATER = '>',
  GREATER_EQUAL = '>='
}

export class QueryParamModel {
  static OPERATIONS = EnumOperation;
  key: string;
  operation: EnumOperation;
  value: any;

  constructor(key: string, operation: EnumOperation, value: any) {
    this.key = key;
    this.operation = operation;
    this.value = value;
  }
}

