const LOWERCASE_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '1234567890';

function generatePassword() {
	var password = "",
	    length = getInputValue('length'),
	    illegal = getInputValue('blacklist'), char;
	var whitelist = getInputValue('whitelist');
	for (var i = 0; i < length; i++) {
		do {
			if (whitelist.length > 0)
				char = whitelist.charAt(parseInt(Math.random() *
					whitelist.length));
			else char = String.fromCharCode(Math.random() * 95 + 32 | 0);
		}	while (illegal.indexOf(char) !== -1);
		password += char;
	}
	getElemId('password').value = password;
	return false;
}

getElemName('alphanumeric').addEventListener('click', function() {
	setInputValue('whitelist', LOWERCASE_ALPHABET + UPPERCASE_ALPHABET + NUMBERS);
});

getElemId('copy-button').addEventListener('click', function () {
	copyToClipboard(getElemId('password').value);
});

function copyToClipboard(text) {
	window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
