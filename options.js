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
}
