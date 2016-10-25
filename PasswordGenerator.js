$("#generate-form").submit(function () {
	var password = "", length = $("input[name=length]").val(), illegal = $("input[name=illegal]").val(), char;
	for (var i = 0; i < length; i++) {
		do {
			char = String.fromCharCode(Math.random() * 95 + 32 | 0);
		}	while (illegal.indexOf(char) !== -1);
		password += char;
	}
	$("#password").val(password);
	return false;
});

$("#copy-button").click(function (e) {
	copyToClipboard(document.getElementById('password').value);
});

function copyToClipboard(text) {
	window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
