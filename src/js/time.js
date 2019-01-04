class gg {
	//	月份
	getDay = (day) => {

		var newMonth = new Date().getMonth() + 1;
		var newYear = new Date().getFullYear();
		var Year = new Date(day).getFullYear();
		var day = new Date(day).getFullYear();
		var Month = new Date(day).getMonth() + 1;
		var data;
		if(newYear > Year) {
		data=(((newYear - Year) * 12) - Month + newMonth);
		} else {
			data=(Month - newMonth);
		}
		
		
		
		if(data==0){
						data='当前'
					}else{
						
						data=data+'月前'
					}
					return data
	}
	getDays = (day) => {
		var d = new Date(day);
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var date = d.getDate();
		var day = d.getDay();
		var hours = d.getHours();
		var minutes = d.getMinutes();
		var seconds = d.getSeconds();
		var ms = d.getMilliseconds();
		var curDateTime = year;
		if(month > 9)
			curDateTime = curDateTime + "-" + month;
		else
			curDateTime = curDateTime + "-0" + month;
		if(date > 9)
			curDateTime = curDateTime + "-" + date;
		else
			curDateTime = curDateTime + "-0" + date;
		if(hours > 9)
			curDateTime = curDateTime + " " + hours;
		else
			curDateTime = curDateTime + " 0" + hours;
		if(minutes > 9)
			curDateTime = curDateTime + ":" + minutes;
		else
			curDateTime = curDateTime + ":0" + minutes;
		if(seconds > 9)
			curDateTime = curDateTime + ":" + seconds;
		else
			curDateTime = curDateTime + ":0" + seconds;
		return curDateTime;

	}
	getDate = (day) => {
		var d = new Date(day);
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var date = d.getDate();
		var day = d.getDay();

		var curDateTime = year;
		if(month > 9)
			curDateTime = curDateTime + "-" + month;
		else
			curDateTime = curDateTime + "-0" + month;
		if(date > 9)
			curDateTime = curDateTime + "-" + date;
		else
			curDateTime = curDateTime + "-0" + date;
		
		return curDateTime

	}

}
var ajax = new gg();
export default ajax;