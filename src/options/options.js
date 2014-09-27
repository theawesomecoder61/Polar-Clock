$(document).ready(function() {
	// version
	var version = chrome.app.getDetails().version;
	$(".version").text(version);


	// easing option
	if(localStorage.easing !== "") {
		$("#easing").val("linear");
		localStorage.setItem("easing", "linear");
	}

	$("#easing").val(localStorage.easing);

	$("#easing").change(function() {
		localStorage.setItem("easing", $(this).val());
	});

	// background option
	if(localStorage.bg !== "") {
		$("#color").val("FFFFFF");
		localStorage.setItem("bg", "FFFFFF");
	}

	$("#color").val(localStorage.bg);

	$("#color").on("change", function() {
		localStorage.setItem("bg", $(this).val());
	});

	// reset options
	$("#reset").click(function() {
		var ask = confirm("Are you sure you want to erase your options?");
		if(ask) {
			localStorage.setItem("easing", "linear");
			localStorage.setItem("bg", "FFFFFF");
			alert("Done!");
			location.reload();
		}
	})
});