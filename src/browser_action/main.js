$(document).ready(function() {
	if(localStorage.bg == "undefined") {
		localStorage.setItem("bg", "FFFFFF");
	}
	if(localStorage.easing == "undefined") {
    	localStorage.setItem("easing", "linear");
  	}
	$("#clock").attr("src", "clock.html?bg=" + localStorage.bg + "&easing=" + localStorage.easing + "&clock=awesome");
});