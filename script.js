// ==UserScript==
// @name         tum-login-bypass
// @namespace    http://tampermonkey.net/
// @version      2024-05-09
// @description  try to take over the world!
// @author       notsungod
// @match        https://www.moodle.tum.de
// @match        https://login.tum.de/*
// @match        https://campus.tum.de/*
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/*/jquery.min.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	// check if current page is campus login. If not return.
	if (window.location.href.includes("campus.tum.de")) {
		if (!window.location.href.includes("login")) {
			return;
		}
	}

	// find moodle login TUM redirect button
	var moodleTumButton = document.getElementsByClassName("btn btn-primary")[0];
	if (moodleTumButton) {
		moodleTumButton.click();
	}

	// await for browser password manager to fill the inputs and login asap.
	function login() {
		var moodleInput = document.getElementById("password");
		if (moodleInput && moodleInput.value) {
			document.getElementById("btnLogin").click();

		}
		var campusInput = document.getElementById("id_brm-pm-dtop_login_pw_input");
		if (campusInput && campusInput.value) {
			document.getElementById("id_brm-pm-dtop_login_submitbutton").click();

		}
		setTimeout(login, 1500);
	}
	login();
})();
