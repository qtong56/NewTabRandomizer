chrome.tabs.onCreated.addListener(function (tab) {
  // Load random saved URL from storage
  chrome.storage.sync.get({ urls: [] }, function (result) {
    const urls = result.urls;
    if (urls && urls.length > 0) {
      const randomUrl = urls[Math.floor(Math.random() * urls.length)];
      chrome.tabs.update({ url: randomUrl });
    }
  });
});