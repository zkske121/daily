/*
要求:
根据一组考勤数据,算出本月考勤时间

录入数据:
1.当月每天的考勤数组,格式为[[09:00, 18:00],[10:00, 19:00]...]
2.目标考勤天数(如:想计算2016.2月,则可输入目标考勤天数为18)
3.每日应工作的时间,默认为8小时

结果:
实际考勤时间与目标考勤时间的差值(单位是小时),正数说明工时溢出,负数说明工时不足

考勤计算规则:
1.00:00-07:00,12:00-13:00,18:30-19:00 不算工时
2.当日只有一次打卡,则工时为0
 */

var countWorkTime = (function() {
 var MINUTE = 1000 * 60;
 var HOUR = MINUTE * 60;
 var CLOCK_0000 = '00:00';
 var CLOCK_0700 = '07:00'; 
 var CLOCK_1200 = '12:00'; 
 var CLOCK_1300 = '13:00'; 
 var CLOCK_1830 = '18:30'; 
 var CLOCK_1900 = '19:00'; 
 var clockList = [CLOCK_1900, CLOCK_1830, CLOCK_1300, CLOCK_1200, CLOCK_0700, CLOCK_0000];
 var getDateByClock = dateUtil();
 var CALC_START = getDateByClock(CLOCK_0700);
 var config = {};

 config[CLOCK_1900] = function(curr) {
     return HOUR * 1.5;
 };
 config[CLOCK_1830] = function(curr) {
     return HOUR + (curr - getDateByClock(CLOCK_1830));
 };
 config[CLOCK_1300] = function(curr) {
     return HOUR * 1;
 };
 config[CLOCK_1200] = function(curr) {
     return curr - getDateByClock(CLOCK_1200);
 };
 config[CLOCK_0700] = function(curr) {
     return 0;
 };
 config[CLOCK_0000] = function(curr) {
     return curr - CALC_START;
 };

 function dateUtil() {
     var cache = {};
     var now = new Date();
     var prev = [now.getFullYear(), '-', now.getMonth() + 1, '-', now.getDate(), ' '].join('');

     return function(str) {
         if(!cache[str]) {
             cache[str] = new Date(prev + str);
         }
         return cache[str];
     }
 }

 function calcTime(time) {
     var curr = getDateByClock(time);
     var tmp, increment;

     tmp = clockList.find(function(v, i) {
         return curr >= getDateByClock(v);
     });

     increment = config[tmp](curr);

     return curr - CALC_START - increment;
 }

 function calcData(data) {
     if(Object.prototype.toString.call(data) !== '[object Array]' ||
        data.length < 2 ||
        getDateByClock(data[0]) > getDateByClock(data[1])) return 0;

     return calcTime(data[1]) - calcTime(data[0]);
 }

 return function(data, day, standard) {
     var curr = data.reduce(function(p, n) {
         return p + calcData(n);
     }, 0);

     standard = standard || 8;

     return curr / HOUR - day * standard;
 }
})();

function curry(fn) {
	var args = Array.prototype.slice.call(arguments, 1);
	return function() {
		var arg = Array.prototype.reduce.call(arguments, function(p, n) {
			return p.concat(n);
		}, args);
		return fn.apply(this, arg);
	}
}

var list_body = document.querySelectorAll('frame')[2].contentWindow.document.querySelectorAll('.list_body td');
var list_data = Array.prototype.filter.call(list_body,function(v, i) {
	return /^[0-9:~]+$/g.test(v.innerHTML);
}).map(function(v, i) {
	return v.innerHTML.match(/([0-9:]+)/g);
});

var work = curry(countWorkTime, list_data);

