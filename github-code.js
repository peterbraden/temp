/**
 * GitHub code inclusion
 * By Peter Braden <PeterBraden.co.uk>
 */


var PBgithub = PBgithub || {};

/* You'll want to change these to your credentials */
PBgithub.login = "peterbraden";
PBgithub.token = "9d567812a941dc331cf4e431e7fc4ebc";

PBgithub.base = "http://github.com/api/v2/json/";


/** Load github content for this code element **/
PBgithub.codify= function(code_elem){
	PBgithub.c = $(code_elem);
	$.getScript(PBgithub.make_url(PBgithub.base + 'repos/show/',
		"/branches", 'PBgithub.handle_branch'));
}	

PBgithub.make_url = function(front, end, callback){
	var data =  "?callback=" + callback + "&login=" +
		PBgithub.login + "&token=" + PBgithub.token;
	return front + PBgithub.c.attr('username') + "/" +
		PBgithub.c.attr('repository') + end + data;
}

PBgithub.handle_file = function(data){
	PBgithub.c.text(data['blob']['data']);
	PBgithub.next();
}

PBgithub.handle_branch = function(data){
	var branch = data['branches'][PBgithub.c.attr('branch')];
	$.getScript(PBgithub.make_url(PBgithub.base + 'blob/show/', "/"
		+ branch + "/" + PBgithub.c.attr('path'), 'PBgithub.handle_file'));
}

PBgithub.next = function(){
	if (PBgithub.i < PBgithub.elems.length){
		PBgithub.i+=1;
		PBgithub.codify(PBgithub.elems.get(PBgithub.i-1));
	}
}
$(function(){
	PBgithub.i = 0;	
	PBgithub.elems = $('code.from-github');
	PBgithub.next();	
});
