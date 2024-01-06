document.addEventListener('DOMContentLoaded', function () {
  // Load saved URLs from storage
  chrome.storage.sync.get({ urls: [] }, function (result) {
    updateURLList(result.urls);
  });

  // Add URL button click event
  document.getElementById('add-url').addEventListener('click', function () {
    let newURL = document.getElementById('new-url').value.trim();
    newURL = newURL.replace('/\s+\g', '');
    if (newURL !== '') {
      chrome.storage.sync.get({ urls: [] }, function (result) {
        const updatedURLs = newURL.split(';');
        // validate URLs
        for (url of updatedURLs) {
          if (!isValidUrl(url)) {
            alert('Invalid URL: ' + url);
            return;
          }
        }

        // Save new URLs to storage
        chrome.storage.sync.set({ urls: updatedURLs }, function () {
          updateURLList(updatedURLs);
        });
      });
    }
  });
});

// Update the displayed URL list
function updateURLList(urls) {
  const urlListElement = document.getElementById('url-list');
  urlListElement.innerHTML = '';
  urls.forEach(url => {
    // const checkbox = document.createElement('input');
    // checkbox.type = 'checkbox';
    // checkbox.value = url;
    // urlListElement.appendChild(checkbox);

    const label = document.createElement('label');
    label.textContent = url;
    urlListElement.appendChild(label);

    const br = document.createElement('br');
    urlListElement.appendChild(br);
  });

  // fill form with current URLs
  const urlInput = document.getElementById('new-url');
  urlInput.value = urls.join(';');
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
