var EnumOperation;
(function (EnumOperation) {
    EnumOperation["LESS"] = "<";
    EnumOperation["LESS_EQUAL"] = "<=";
    EnumOperation["EQUAL"] = "==";
    EnumOperation["GREATER"] = ">";
    EnumOperation["GREATER_EQUAL"] = ">=";
})(EnumOperation || (EnumOperation = {}));
var QueryParamModel = /** @class */ (function () {
    function QueryParamModel(key, operation, value) {
        this.key = key;
        this.operation = operation;
        this.value = value;
    }
    QueryParamModel.OPERATIONS = EnumOperation;
    return QueryParamModel;
}());
export { QueryParamModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktcGFyYW0tbW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvcXVlcnktcGFyYW0tbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSyxhQU1KO0FBTkQsV0FBSyxhQUFhO0lBQ2hCLDJCQUFVLENBQUE7SUFDVixrQ0FBaUIsQ0FBQTtJQUNqQiw2QkFBWSxDQUFBO0lBQ1osOEJBQWEsQ0FBQTtJQUNiLHFDQUFvQixDQUFBO0FBQ3RCLENBQUMsRUFOSSxhQUFhLEtBQWIsYUFBYSxRQU1qQjtBQUVEO0lBTUUseUJBQVksR0FBVyxFQUFFLFNBQXdCLEVBQUUsS0FBVTtRQUMzRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFUTSwwQkFBVSxHQUFHLGFBQWEsQ0FBQztJQVVwQyxzQkFBQztDQUFBLEFBWEQsSUFXQztTQVhZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJlbnVtIEVudW1PcGVyYXRpb24ge1xyXG4gIExFU1MgPSAnPCcsXHJcbiAgTEVTU19FUVVBTCA9ICc8PScsXHJcbiAgRVFVQUwgPSAnPT0nLFxyXG4gIEdSRUFURVIgPSAnPicsXHJcbiAgR1JFQVRFUl9FUVVBTCA9ICc+PSdcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXJ5UGFyYW1Nb2RlbCB7XHJcbiAgc3RhdGljIE9QRVJBVElPTlMgPSBFbnVtT3BlcmF0aW9uO1xyXG4gIGtleTogc3RyaW5nO1xyXG4gIG9wZXJhdGlvbjogRW51bU9wZXJhdGlvbjtcclxuICB2YWx1ZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihrZXk6IHN0cmluZywgb3BlcmF0aW9uOiBFbnVtT3BlcmF0aW9uLCB2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLmtleSA9IGtleTtcclxuICAgIHRoaXMub3BlcmF0aW9uID0gb3BlcmF0aW9uO1xyXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gIH1cclxufVxyXG5cclxuIl19