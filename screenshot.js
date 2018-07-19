function setScreenshotUrl(url) {
  document.getElementById('target').src = url; //set preview
  document.getElementById('target2').href = url; //set download link
  
/*don't need this because we can handle it in background.js
  if(localStorage.autoDownload == "enabled") {
	document.getElementById('target2').click(); //auto download
	window.close(); //close window
  }
  */

}
