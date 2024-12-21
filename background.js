
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "notify") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon-48.png",
      title: "Challenge Sent",
      message: "You have created a new challenge"
    });
  } else if (message.type === "contestEnded") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon-48.png",
      title: "Contest End",
      message: "Contest time is up!"
    });
  }
});
