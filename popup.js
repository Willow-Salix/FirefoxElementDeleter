document.getElementById('delete-button').addEventListener('click', () => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        browser.tabs.sendMessage(tabs[0].id, { action: "enableClickListener" });
    });
});
