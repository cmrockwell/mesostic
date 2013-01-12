Core.sendRequest = function(url,callback,postData) {
	//checks to see if we can create the XMLHttpObject
	var req = Core.createXMLHttpObject();
	
	//if returns false cancel operation 
	if (!req) return;
	
	//check to see if postData was passed if so set method to POST
	var method = (postData) ? "POST" : "GET";
	
	//call the open method, send the method "POST" or "GET" and pass true
	req.open(method,url,true);
	
	//set the request header
	req.setRequestHeader('User-Agent','XMLHTTP/1.0');
	
	//if postData is sent then set request header for forms
	if (postData)
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded'); // 
	//if everything returns ok send req value to "callback"
	req.onreadystatechange = function () {
		if (req.readyState !== 4) return;
		if (req.status !== 200 && req.status !== 304) {
			return;
		}
		callback(req);
	}
	// if we have already completed the request, stop the function so as not
  	// to send it again
	if (req.readyState === 4) return;
	
	//if postdata was included send it to server side page. Information
	//can be received by using $_POST['data'] (this is via PHP)
	if (postData){
		req.send("data="+postData);
	}
	else{
		req.send(null);
	}
	
}

//depending on the browser return appropriate request.
Core.XMLHttpFactories = [
	function () {return new XMLHttpRequest()},
	function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

//This method cycles through all requests in XMLHttpFactories until
//one is found.
Core.createXMLHttpObject = function() {
	var xmlhttp = false;
	for (var i=0;i<Core.XMLHttpFactories.length;i++) {
		try {
			xmlhttp = Core.XMLHttpFactories[i]();
		}
		catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}
