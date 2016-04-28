if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
   Titanium.API.info(' no connection ');
   alert("You device is not online");
 
} else {
   Titanium.API.info(' connection present ');
}

function btnRegpage() {
	var username = $.username.value;
	var password = $.password.value;
	$.username.value="";
	$.password.value="";
	console.log("Los valores son: "+username+" y "+password);
	var windowReg = Alloy.createController("registerScren", {"username":username, "password":password} ).getView();
	windowReg.open();
}


var loginReq = Titanium.Network.createHTTPClient();

//recive data on index.js
loginReq.onload = function()
{
    var json = this.responseText;
    var response = JSON.parse(json);
    if (response.logged == true)
    {
        $.username.blur();
        $.password.blur(); 
        Ti.App.fireEvent('grantEntrance', {
            name:response.name,
            email:response.email
        });
        $.username.value="";
		$.password.value="";
     	//alert("Welcome " + response.name + ". Your email is: " + response.email);
        var windowMain = Alloy.createController("mainScreen", {"name":response.name, "email":response.email} ).getView();
		windowMain.open();
       
    }
    else
    {
        alert(response.message);
    }
};

function btnLogin() {
	var username = $.username.value;
	var password = $.password.value;

	    if (username != "" && password != "")
    {
        loginReq.open("POST","http://192.168.1.74:80/AUTH/post_auth.php");
        var params = {
            username : username,
	        password : password
        };
        loginReq.send(params);
    }
    else
    {
        alert("Username/Password are required");
    }
};	


$.index.open();