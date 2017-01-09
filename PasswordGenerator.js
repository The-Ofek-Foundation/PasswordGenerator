const LOWERCASE_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '1234567890';

var passwordElem = getElemId('password');
var rememberPasswordElem = getElemId('remember-password');
var hitsMissesElem = getElemId('hits-misses');
var passwordHits, passwordMisses;
var consecutiveHits;
var memoryStage;

function pageReady() {
	setTimeout(function() { // prevents browser password autofill
		rememberPasswordElem.type = 'password';
	}, 1000);
}

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
	passwordElem.value = password;
	passwordHits = passwordMisses = consecutiveHits = 0;
	memoryStage = 1;
	return false;
}

passwordElem.addEventListener('change', function() {
	passwordHits = passwordMisses = consecutiveHits = 0;
	memoryStage = 1;
});

getElemName('alphanumeric').addEventListener('click', function() {
	setInputValue('whitelist', LOWERCASE_ALPHABET + UPPERCASE_ALPHABET + NUMBERS);
});

getElemId('copy-button').addEventListener('click', function () {
	copyToClipboard(getElemId('password').value);
});

function copyToClipboard(text) {
	prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function testPassword() {
	if (rememberPasswordElem.value === passwordElem.value) {
		passwordHits++;
		consecutiveHits++;
	} else {
		passwordMisses++;
		consecutiveHits++;
	}
	if (consecutiveHits === 5)
		setTimeout(function () {
			if (memoryStage === 1) {
				alert("I think you got it, keep going for stage two!");
				memoryStage++;
				consecutiveHits = 0;
				passwordElem.type = 'password';
			} else
				alert("You have this nailed down, but keep going if you want!")
		}, 0);
	rememberPasswordElem.value = '';
	hitsMissesElem.innerHTML = 'Hits / Misses: ' + passwordHits + ' / ' + passwordMisses;
}

rememberPasswordElem.addEventListener('keypress', function (evt) {
	if (evt.which === 13) // enter key
		testPassword();
});

getElemId('test-password').addEventListener('click', testPassword);
