// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
//console.log(args.username + " - " + args.password);
//var usern=args.username;
//var passw=args.password;

$.username.value = args.username;
$.password1.value = args.password;



 
function checkemail(emailAddress)
{
    var testresults;
    var str = emailAddress;
    var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (filter.test(str))
    {
        testresults = true;
    }
    else
    {
        testresults = false;
    }
    return (testresults);
};
 
var createReq = Titanium.Network.createHTTPClient();
createReq.onload = function()
{
    if (this.responseText == "Insert failed" || this.responseText == "That username or email already exists")
    {
        createBtn.enabled = true;
        createBtn.opacity = 1;
        alert(this.responseText);
    } 
    else
    {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: 'Alert',
            message: this.responseText,
            buttonNames: ['OK']
        });
        alertDialog.show();
        alertDialog.addEventListener('click',function(e)
        {
            $.registerScren.close();
        });
    }
};
 
 
 
function btnRegister() 
{	
	
	var username = $.username.value;
	var password1 = $.password.value;
	var password2 = $.password2.value;
	var name = $.name.value;
	var email = $.email.value;
	
    if (username != '' && password1 != '' && password2 != '' && name != '' && email != '')
    {
        if (password1 != password2)
        {
            alert("Your passwords do not match");
        }
        else
        {
            if (!checkemail(email))
            {
                alert("Please enter a valid email");
            }
            else
            {
                createReq.open("POST","http://192.168.1.74:80/AUTH/post_register.php");
                var params = {
                    username: username,
                    password: password1,
                    name: name,
                    email: email
                };
                createReq.send(params);
            }
        }
    }
    else
    {
        alert("All fields are required");
    }
};





function returnLogin(){
	$.registerScren.close();
}
