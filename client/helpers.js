Template.registerHelper("formatTime", function(timestamp) {
	var date = new Date(timestamp);
	return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " - " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
});

Template.registerHelper("capitalize", function(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
});

Template.registerHelper("capitalizeTrim", function(str){
	if(str.length > 30){
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).slice(0,10) + "...";
	} else {
		return str;
	}
});

Template.registerHelper("trim", function(str){
	if(str.length > 400){
		/*
		var el = $( '<div></div>' );
		el.html(str);
		var paragraphs = $('p', el);
		console.log(typeof paragraphs);
		*/

		var el = document.createElement( 'div' );
		el.innerHTML = str;
		var paragraphs = el.getElementsByTagName( 'p' );
		var total = 0;
		var result = "";
		for(var i=0;i<paragraphs.length;i++){
			total += paragraphs[i].innerHTML.length;
			if (i==0 && total>400) {
				return "<p>" + paragraphs[i].innerHTML.substr(0,400) + "...</p>";
			} else if (total>400) {
				return result;
			};
			result += paragraphs[i].outerHTML;
		}
	} else {
		return str;
	}
});