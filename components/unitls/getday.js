let today = new Date()
function InitArray () {
this.length = arguments.length
for (let i = 0; i < this.length; i++) this[i + 1] = arguments[i]
}
let dateString = ''
let d = new InitArray('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六')
// dateString += (today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日 ' + d[today.getDay() + 1] + ' ')
let calendar = new Date()
// let calendar=new Date('2020-08-01')
let month = calendar.getMonth() + 1
let date = calendar.getDate()
if ((month === 1) && (date === 1)) dateString += '元旦'
if ((month === 3) && (date === 12)) dateString += '植树节'
if ((month === 4) && (date === 5)) dateString += '清明节'
if ((month === 5) && (date === 1)) dateString += '国际劳动节'
if ((month === 5) && (date === 4)) dateString += '青年节'
if ((month === 6) && (date === 1)) dateString += '国际儿童节'
if ((month === 8) && (date === 1)) dateString += '建军节'
if ((month === 8) && (date === 16)) dateString += '七夕情人节'
// /国际音乐节/国际老人节
if ((month === 10) && (date === 1)) dateString += '国庆节'
if ((month === 12) && (date === 24)) dateString += '平安夜'
if ((month === 12) && (date === 25)) dateString += '圣诞节'
/* 农历部分 */
let CalendarData = new Array(100)
let madd = new Array(12)
let tgString = '甲乙丙丁戊己庚辛壬癸'
let dzString = '子丑寅卯辰巳午未申酉戌亥'
let numString = '一二三四五六七八九十'
let monString = '正二三四五六七八九十冬腊'
// let weekString = '日一二三四五六'
let sx = '鼠牛虎兔龙蛇马羊猴鸡狗猪'
let cYear, cMonth, cDay, TheDate
CalendarData = ['0xA4B', '0x5164B', '0x6A5', '0x6D4', '0x415B5', '0x2B6', '0x957', '0x2092F', '0x497', '0x60C96', '0xD4A', '0xEA5', '0x50DA9', '0x5AD',
'0x2B6', '0x3126E', '0x92E', '0x7192D', '0xC95', '0xD4A', '0x61B4A', '0xB55', '0x56A', '0x4155B', '0x25D', '0x92D', '0x2192B', '0xA95', '0x71695', '0x6CA',
'0xB55', '0x50AB5', '0x4DA', '0xA5B', '0x30A57', '0x52B', '0x8152A', '0xE95', '0x6AA', '0x615AA', '0xAB5', '0x4B6', '0x414AE', '0xA57', '0x526', '0x31D26',
'0xD95', '0x70B55', '0x56A', '0x96D', '0x5095D', '0x4AD', '0xA4D', '0x41A4D', '0xD25', '0x81AA5', '0xB54', '0xB6A', '0x612DA', '0x95B', '0x49B', '0x41497',
'0xA4B', '0xA164B', '0x6A5', '0x6D4', '0x615B4', '0xAB6', '0x957', '0x5092F', '0x497', '0x64B', '0x30D4A', '0xEA5', '0x80D65', '0x5AC', '0xAB6', '0x5126D',
'0x92E', '0xC96', '0x41A95', '0xD4A', '0xDA5', '0x20B55', '0x56A', '0x7155B', '0x25D', '0x92D', '0x5192B', '0xA95', '0xB4A', '0x416AA', '0xAD5', '0x90AB5',
'0x4BA', '0xA5B', '0x60A57', '0x52B', '0xA93', '0x40E95']
madd[0] = 0
madd[1] = 31
madd[2] = 59
madd[3] = 90
madd[4] = 120
madd[5] = 151
madd[6] = 181
madd[7] = 212
madd[8] = 243
madd[9] = 273
madd[10] = 304
madd[11] = 334
function GetBit (m, n) {
return (m >> n) & 1
}
function e2c () {
TheDate = (arguments.length !== 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2])
let total, m, n, k
let isEnd = false
let tmp = TheDate.getYear()
if (tmp < 1900) {
tmp += 1900
}
total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38
if (TheDate.getYear() % 4 === 0 && TheDate.getMonth() > 1) {
total++
}
for (m = 0; ; m++) {
k = (CalendarData[m] < 0xfff) ? 11 : 12
for (n = k; n >= 0; n--) {
if (total <= 29 + GetBit(CalendarData[m], n)) {
isEnd = true
break
}
total = total - 29 - GetBit(CalendarData[m], n)
}
if (isEnd) break
}
cYear = 1921 + m
cMonth = k - n + 1
cDay = total
if (k === 12) {
if (cMonth === Math.floor(CalendarData[m] / 0x10000) + 1) {
cMonth = 1 - cMonth
}
if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
cMonth--
}
}
}
function GetcDateString () {
let tmp = ''
tmp += tgString.charAt((cYear - 4) % 10)
tmp += dzString.charAt((cYear - 4) % 12)
tmp += '('
tmp += sx.charAt((cYear - 4) % 12)
tmp += ')年 '
if (cMonth < 1) {
tmp += '(闰)'
tmp += monString.charAt(-cMonth - 1)
} else {
tmp += monString.charAt(cMonth - 1)
}
tmp += '月'
tmp += (cDay < 11) ? '初' : ((cDay < 20) ? '十' : ((cDay < 30) ? '廿' : '三十'))
if (cDay % 10 !== 0 || cDay === 10) {
tmp += numString.charAt((cDay - 1) % 10)
}
return tmp
}
function GetLunarDay (solarYear, solarMonth, solarDay) {
// solarYear = solarYear<1900?(1900+solarYear):solarYear
if (solarYear < 1921 || solarYear > 2020) {
return ''
} else {
solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11
e2c(solarYear, solarMonth, solarDay)
return GetcDateString()
}
}
let D = new Date()
let yy = D.getFullYear()
let mm = D.getMonth() + 1
let dd = D.getDate()
// let ww = D.getDay()
// let ss = parseInt(D.getTime() / 1000)
if (yy < 100) yy = '19' + yy
const showCalendar = function () {
dateString += GetLunarDay(yy, mm, dd)
return dateString
}
export default showCalendar