import RRule = require('rrule');

let rule: RRule = new RRule({
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

class RRuleHelper{
	static readonly days = {
		"MO": RRule.MO,
		"TU": RRule.TU,
		"WE": RRule.WE,
		"TH": RRule.TH,
		"FR": RRule.FR,
		"SA": RRule.SA,
		"SU": RRule.SU
	}

	static readonly daysList = [
		"MO", "TU", "WE", "TH", "FR", "SA", "SU"
	]

	public static newRule(o) {
		this.fixByWeekDay(o);
		return new RRule(o);
	} 

	private static fixByWeekDay(o) {
		if (o.hasOwnProperty("byweekday")) {
			let weekdays: string[] = o.byweekday as string[];
			let newWeekdays: RRule.Weekday[] = new Array();
			weekdays.forEach(element => {
				newWeekdays.push(this.days[element]);
			});
			o.byweekday = newWeekdays;
		}
	}

	// Converts from RRule.Weekday | Number objects to our string day of the week
	private static parseWeekday(byweekday : number | RRule.Weekday | RRule.Weekday[] | number[] | string | string[]) {
		if (byweekday instanceof Number) {
			byweekday = [this.days[byweekday]];
		} else if (byweekday instanceof String) {
			byweekday = [byweekday];
		} else if (byweekday instanceof Array){
			var newWeek = new Array();
			for (var item in byweekday) {
				newWeek.push(this.daysList[+item]);
			}
			byweekday = newWeek;
		}
		return byweekday;
	}

	public static toStringJSON(rule: RRule) {
		rule.options.byweekday = this.parseWeekday(rule.options.byweekday);
		return JSON.stringify(rule);
	}

	public static toJSON(rule: RRule) {
		return JSON.parse(this.toStringJSON(rule));
	}
}

var jsonObject = RRuleHelper.toJSON(rule);


console.log((JSON.parse(jsonObject)).options);