var DefaultModel = /** @class */ (function () {
    function DefaultModel(data) {
        if (data.hasOwnProperty('_raw')) {
            delete data['_raw'];
        }
        this._raw = data;
    }
    DefaultModel.prototype.copyInto = function (json) {
        for (var key in json) {
            if (this.hasOwnProperty(key)) {
                this[key] = json[key];
            }
        }
    };
    DefaultModel.prototype.getData = function () {
        var _this = this;
        var self = this;
        var result = {};
        Object.keys(this).map(function (key) {
            if (_this[key] instanceof DefaultModel) {
                return;
            }
            switch (key) {
                case '_raw':
                case 'meals':
                case 'items':
                    return;
            }
            result[key] = _this[key];
        });
        return result;
    };
    return DefaultModel;
}());
export { DefaultModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL2NvbnN0YW50L21vZGVscy9kZWZhdWx0LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0lBR0Usc0JBQVksSUFBUztRQUNuQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsK0JBQVEsR0FBUixVQUFTLElBQUk7UUFDWCxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNwQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkI7U0FDRjtJQUNILENBQUM7SUFFRCw4QkFBTyxHQUFQO1FBQUEsaUJBbUJDO1FBbEJDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHO1lBQ3ZCLElBQUksS0FBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLFlBQVksRUFBRTtnQkFDckMsT0FBTzthQUNSO1lBRUQsUUFBUSxHQUFHLEVBQUU7Z0JBQ1gsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxPQUFPLENBQUM7Z0JBQ2IsS0FBSyxPQUFPO29CQUNWLE9BQU87YUFDVjtZQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBdENELElBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJRGVmYXVsdE1vZGVsfSBmcm9tICcuL2ktZGVmYXVsdC1tb2RlbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdE1vZGVsIGltcGxlbWVudHMgSURlZmF1bHRNb2RlbCB7XHJcbiAgX3JhdzogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcclxuICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdfcmF3JykpIHtcclxuICAgICAgZGVsZXRlIGRhdGFbJ19yYXcnXTtcclxuICAgIH1cclxuICAgIHRoaXMuX3JhdyA9IGRhdGE7XHJcbiAgfVxyXG5cclxuICBjb3B5SW50byhqc29uKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBrZXkgaW4ganNvbikge1xyXG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0ganNvbltrZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXREYXRhKCk6IG9iamVjdCB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKHRoaXMpLm1hcChrZXkgPT4ge1xyXG4gICAgICBpZiAodGhpc1trZXldIGluc3RhbmNlb2YgRGVmYXVsdE1vZGVsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgIGNhc2UgJ19yYXcnOlxyXG4gICAgICAgIGNhc2UgJ21lYWxzJzpcclxuICAgICAgICBjYXNlICdpdGVtcyc6XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG4iXX0=