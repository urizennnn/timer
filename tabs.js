// Listen for changes to the 'fulfilled' value in chrome.storage.local
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.fulfilled) {
        const fulfilled = changes.fulfilled.newValue;
        if (fulfilled === true) {
           chrome.notifications.create({
            title:"Timer",
            message: "Your time is up",
            iconUrl:'icon.jpg',
            type:'basic'
           })
        }
    }
});
