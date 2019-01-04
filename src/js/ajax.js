let getJson = function(url,data, header = 'application/json; charset=UTF-8') {
	let p = new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function() {
			if(this.readyState == 4) {
				if(this.status == 200) {
					resolve(xhr.response);
				} else {
					reject(new Error(xhr.stateText));
				}
			}
		};
		xhr.responseType = 'json';
		xhr.setRequestHeader("Content-Type", header);
		xhr.send();
	})
	return p;
}
let postJson = function(url, data, header = "application/json; charset=UTF-8") {
	let p = new Promise(function(resolve, reject) {
		console.log(data)
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(this.status == 200) {
					resolve(xhr.response);
				} else {
					reject(new Error(xhr.stateText));
				}
			}
		};
		xhr.setRequestHeader("Content-Type", header);
		if(!((header.indexOf('form')) == -1)) {
			var formData = [];
			for(var key in data) {
				if(data[key]) {
					formData = formData + key + '=' + data[key] + '&';
				}
			}
			xhr.send(formData);
		} else if(typeof(data) == 'object') {
			xhr.send(JSON.stringify(data));
		} else {
			xhr.send(data);
		}
	})
	return p;
}
class gg{
	 getJson(url, header = 'application/json; charset=UTF-8') {
	let p = new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function() {
			if(this.readyState == 4) {
				if(this.status == 200) {
					resolve(xhr.response);
				} else {
					reject(new Error(xhr.stateText));
				}
			}
		};
		xhr.responseType = 'json';
		xhr.setRequestHeader("Content-Type", header);
		xhr.send();
	})
	return p;
}
 postJson(url, data, header = "application/json; charset=UTF-8") {
	let p = new Promise(function(resolve, reject) {
		console.log(data)
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(this.status == 200) {
					var data=xhr.response;
					resolve(JSON.parse(data));
				} else {
					reject(new Error(xhr.stateText));
				}
			}
		};
		xhr.setRequestHeader("Content-Type", header);
		if(!((header.indexOf('form')) == -1)) {
			var formData = [];
			for(var key in data) {
				if(data[key]) {
					formData = formData + key + '=' + data[key] + '&';
				}
			}
			xhr.send(formData);
		} else if(typeof(data) == 'object') {
			xhr.send(JSON.stringify(data));
		} else {
			xhr.send(data);
		}
	})
	return p;
}
}
var ajax=new gg();
export default ajax;