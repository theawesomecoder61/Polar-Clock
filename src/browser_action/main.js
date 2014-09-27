$(document).ready(function() {
	if(localStorage.bg == "undefined") {
		localStorage.setItem("bg", "FFFFFF");
	}
	if(localStorage.easing == "undefined") {
    	localStorage.setItem("easing", "linear");
  	}
	$("#clock").attr("src", "clock.html?bg=" + localStorage.bg + "&easing=" + localStorage.easing + "&clock=awesome");
});

chrome.runtime.onInstalled.addListener(function(details){
	if(localStorage.bg == "undefined") {
		localStorage.setItem("bg", "FFFFFF");
	}
	if(localStorage.easing == "undefined") {
    	localStorage.setItem("easing", "linear");
  	}
});

chrome.runtime.onUpdateAvailable.addListener(function() {
	var ask = confirm("There is an update available. Would you like to get it? I mean, you don't have to.");
	if(ask) {
		window.open("http://bit.ly/polar-clock");
	}
});