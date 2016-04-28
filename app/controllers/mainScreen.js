// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;


  $.text.text="You have successfully.\n\nYour name is:\n" + args.name + "\n\nyour email is:\n" + args.email;
    


function returnLogin(){
	$.mainScreen.close();
}

