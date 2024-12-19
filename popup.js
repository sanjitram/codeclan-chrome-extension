const createRoomButton = document.getElementById("create-room");
const joinRoomButton = document.getElementById("join");
const roomIdInput = document.getElementById("room-id");
const statusDiv = document.getElementById("status");
const timerInput = document.getElementById("timer-input");
const startContestButton = document.getElementById("start-contest");
const timerDiv = document.getElementById("timer");

let countdownInterval;


createRoomButton.addEventListener("click", async () => {
  const roomId = Math.floor(Math.random() * 900000 + 100000).toString(); 
  chrome.storage.sync.set({ roomId }, () => {
    statusDiv.textContent = `Clan created ${roomId}`;
  });
});

joinRoomButton.addEventListener("click", async () => {
  const roomId = roomIdInput.value;
  if (roomId) {
    chrome.storage.sync.set({ roomId }, () => {
      statusDiv.textContent = `Joined Clan ${roomId}`;
    });
  } else {
    statusDiv.textContent = "Clan ID not found";
  }
});


startContestButton.addEventListener("click", () => {
  const timeInMinutes = parseInt(timerInput.value);
  if (isNaN(timeInMinutes) || timeInMinutes <= 0) {
    statusDiv.textContent = "Enter a valid time";
    return;
  }

  const endTime = Date.now() + timeInMinutes * 60000;
  chrome.storage.sync.set({ endTime }, () => {
    statusDiv.textContent = `Contest of ${timeInMinutes} minutes started`;
    startTimer(endTime);
  });
});


function startTimer(endTime) {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const remainingTime = endTime - Date.now();
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      timerDiv.textContent = "00:00:00";
      chrome.runtime.sendMessage({ type: "contestEnded" });
      return;
    }

    const h = Math.floor(remainingTime / 3600000);
    const m = Math.floor((remainingTime % 3600000) / 60000);
    const s = Math.floor((remainingTime % 60000) / 1000);
    timerDiv.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("endTime", (data) => {
    if (data.endTime) {
      startTimer(data.endTime);
    }
  });
});
