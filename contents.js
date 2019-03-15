/*
    Get hostnames the webpage contacted using  performance API from URL.
    https://developer.mozilla.org/en-US/docs/Web/API/Performance
*/
let entries = window.performance.getEntriesByType("resource");
let ls = []
for (var i=0; i < entries.length; i++) {
    let hostname = new URL(entries[i].name).hostname; // we only want the hostname part
    ls.push(hostname);
}
ls = ls.filter(
    function (value, index, self) { 
        return self.indexOf(value) === index;
    });
if (ls.length === 0) {
    console.log("[contents.js]: Please reload!")
}

console.log("[contents.js]: Requests data ready.");
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if (message.msg === "handshake") {
            console.log("[contents.js]: Handshake message received.");
            sendResponse({"data" : ls});
            console.log("[contents.js]: Data set to popup");
	    }
    });
console.log("[contents.js]: Listener added.")   

