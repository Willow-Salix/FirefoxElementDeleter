// This file contains the background script for the add-on. It listens for events and manages the lifecycle of the add-on.

browser.runtime.onInstalled.addListener(() => {
    console.log("Add-on installed");
});

browser.runtime.onMessage.removeListener((message, sender, sendResponse) => {
    if (message.action === "deleteElement") {
        browser.tabs.executeScript(sender.tab.id, {
            file: "content.js"
        });
    }
});