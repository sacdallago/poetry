Template.registerHelper("formatTime", function(timestamp) {
	var date = new Date(timestamp);
	return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " - " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
});

Template.registerHelper("capitalize", function(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
});

Template.registerHelper("capitalizeTrim", function(str){
	if(str.length > 10){
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).slice(0,10) + "...";
	} else {
		return str;
	}
});

Template.registerHelper("trim", function(str){
	if(str.length > 30){
		return str.slice(0,30) + "...";
	} else {
		return str;
	}
});