function setScreenshotUrl(url) {
  document.getElementById('target').src = url; //set preview
  document.getElementById('downloadLink').href = url; //set download link
  document.getElementById("downloadLink").download = "screenshot-" + formatDate(new Date() ) + ".jpg";
  
/*don't need this because we can handle it in background.js
  if(localStorage.autoDownload == "enabled") {
	document.getElementById('target2').click(); //auto download
	window.close(); //close window
  }
  */

}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "-" + date.getDate() + "-" + date.getFullYear() + "  " + strTime;
}