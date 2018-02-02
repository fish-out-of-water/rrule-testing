"use strict";
exports.__esModule = true;
var RRule = require("rrule");
var rule = new RRule({
    freq: RRule.WEEKLY,
    count: 30,
    byweekday: [RRule.TU, RRule.WE],
    bymonth: [3, 4],
    bysetpos: 1,
    bymonthday: 1,
    byyearday: 1,
    byweekno: 1,
    byhour: [1]
});
var RRuleHelper = (function () {
    function RRuleHelper() {
    }
    RRuleHelper.newRule = function (o) {
        this.fixByWeekDay(o);
        return new RRule(o);
    };
    RRuleHelper.fixByWeekDay = function (o) {
        var _this = this;
        if (o.hasOwnProperty("byweekday")) {
            var weekdays = o.byweekday;
            var newWeekdays_1 = new Array();
            weekdays.forEach(function (element) {
                newWeekdays_1.push(_this.days[element]);
            });
            o.byweekday = newWeekdays_1;
        }
    };
    RRuleHelper.parseRule = function (ruleString) {
    };
    // Converts from RRule.Weekday | Number objects to our string day of the week
    RRuleHelper.parseWeekday = function (byweekday) {
        if (byweekday instanceof Number) {
            byweekday = [this.days[byweekday]];
        }
        else if (byweekday instanceof String) {
            byweekday = [byweekday];
        }
        else if (byweekday instanceof Array) {
            var newWeek = new Array();
            for (var item in byweekday) {
                newWeek.push(this.daysList[+item]);
            }
            byweekday = newWeek;
        }
        return byweekday;
    };
    RRuleHelper.toJSON = function (rule) {
        rule.options.byweekday = this.parseWeekday(rule.options.byweekday);
        return JSON.stringify(rule);
    };
    RRuleHelper.days = {
        "MO": RRule.MO,
        "TU": RRule.TU,
        "WE": RRule.WE,
        "TH": RRule.TH,
        "FR": RRule.FR,
        "SA": RRule.SA,
        "SU": RRule.SU
    };
    RRuleHelper.daysList = [
        "MO", "TU", "WE", "TH", "FR", "SA", "SU"
    ];
    return RRuleHelper;
}());
console.log(RRuleHelper.toJSON(rule));
//# sourceMappingURL=app.js.map