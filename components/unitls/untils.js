let unitls={}

unitls.getDate=(time)=>{
	let date=new Date(time)
	let dateStr=""
	dateStr=date.getFullYear()+"年"
	dateStr+=date.getMonth()+1+"月"
	dateStr+=date.getDate()+"日"
	return dateStr
}
export default unitls