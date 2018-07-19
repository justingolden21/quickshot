//options
window.onload = function() {
	console.log("autoDownload set to ");
	console.log(localStorage.autoDownload);
	
	document.getElementById("autoDownload").checked = localStorage.autoDownload == "enabled" ? true : false;
	
	document.getElementById("autoDownload").onchange = function() {
		localStorage.autoDownload = this.checked ? "enabled" : "disabled";
		
		console.log("setting autoDownload to ");
		console.log(localStorage.autoDownload);
		console.log(this.checked.toString() );

	}

	document.getElementById("extensionSettings").onclick = function() {
		chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
	}

	document.getElementById("rgbLink").onclick = function() {
		chrome.tabs.create({ url: "http://rgbstudios.org" });	
	}

	document.getElementById("mailLink").onclick = function() {
		chrome.tabs.create({ url: "mailto:feedback@rgbstudios.org" });	
	}

	document.getElementById("shareLink").onclick = function() {
		chrome.tabs.create({ url: "https://chrome.google.com/webstore/detail/simpleshot/hpnikgbjfhnpcaoicgbkkialbejlecke" });	
	}


	

	document.getElementById("versionP").innerHTML = "Version " + chrome.runtime.getManifest().version;

}
