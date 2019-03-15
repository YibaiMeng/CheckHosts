"use strict"
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {msg: "handshake"}, function(response) {
        console.log("[popup.js]: contents.js had received handshake."); 
        let list = document.getElementById('resources');
        let request = response.data // TODO: if no response? 
        for (var i=0; i < request.length; i++) {
            let hostname = request[i];
            let node = document.createElement("li")
            node.appendChild(document.createTextNode(hostname));
            list.appendChild(node);
        }
        console.log("[popup.js]: DOM updated.");
    });
});
