//https://developer.chrome.com/extensions/samples#search:screenshot

/* bugs:
doesn't work on chrome web store, other sensitive areas we can't access

todo:
*/

// To make sure we can uniquely identify each screenshot tab, add an id as a
// query param to the url that displays the screenshot.
// Note: It's OK that this is a global variable (and not in localStorage),
// because the event page will stay open as long as any screenshot tabs are
// open.
var id = 100;

// Listen for a click on the camera icon. On that click, take a screenshot.
chrome.browserAction.onClicked.addListener(function() {	
	
  chrome.tabs.captureVisibleTab(function(screenshotUrl) {
	  
	if(localStorage.autoDownload == "enabled") {
		//create a download link and click it
		let downloadLink = document.createElement("a");
		downloadLink.href = screenshotUrl;
		downloadLink.download = "screenshot-" + formatDate(new Date() ) + ".jpg";
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		return;
	}
	  
	  
    var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++);
    var targetId = null;

    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
      // We are waiting for the tab we opened to finish loading.
      // Check that the tab's id matches the tab we opened,
      // and that the tab is done loading.
	  
     if(tabId != targetId || changedProps.status != "complete") {
        return;
	  }

      // Passing the above test means this is the event we were waiting for.
      // There is nothing we need to do for future onUpdated events, so we
      // use removeListner to stop getting called when onUpdated events fire.
      chrome.tabs.onUpdated.removeListener(listener);

      // Look through all views to find the window which will display
      // the screenshot.  The url of the tab which will display the
      // screenshot includes a query parameter with a unique id, which
      // ensures that exactly one view will have the matching URL.
      var views = chrome.extension.getViews();
      for(var i = 0; i < views.length; i++) {
        var view = views[i];
        if (view.location.href == viewTabUrl) {
          view.setScreenshotUrl(screenshotUrl);
          break;
        }
      }
	  	  
    });

    chrome.tabs.create({url: viewTabUrl}, function(tab) {
      targetId = tab.id;
    });
  });
});

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
