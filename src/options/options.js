$(document).ready(function() {
	$("#easing").val(localStorage.easing);

	$("#easing").change(function() {
		localStorage.setItem("easing", $(this).val());
	});

	$("#color").val(localStorage.bg);

	$("#color").on("change", function() {
		localStorage.setItem("bg", $(this).val());
	});

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