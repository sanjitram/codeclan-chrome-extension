const createroom = document.getElementById("create-room");
const joinroom = document.getElementById("join");
const roomid = document.getElementById("room-id");
const status = document.getElementById("status");
const timerinput = document.getElementById("timer-input");
const startbutton = document.getElementById("start-contest");
const timer = document.getElementById("timer");

let countdownInterval;

createroom.addEventListener("click", async () => {
  const roomId = Math.floor(Math.random() * 900000 + 100000).toString(); 
  chrome.storage.sync.set({ roomId }, () => {
    status.textContent = `Clan created... ${roomId}`;
  });
});

joinroom.addEventListener("click", async () => {
  const roomId = roomid.value;
  if (roomId) {
    chrome.storage.sync.set({ roomId }, () => {
      status.textContent = `Joined Clan ${roomId}`;
    });
  } else {
    status.textContent = "Clan ID not found";
  }
});

startbutton.addEventListener("click", () => {
  const timeInMinutes = parseInt(timerinput.value);
  if (isNaN(timeInMinutes) || timeInMinutes <= 0) {
    status.textContent = "Enter a valid time";
    return;
  }

  const endTime = Date.now() + timeInMinutes * 60000;
  chrome.storage.sync.set({ endTime }, () => {
    status.textContent = `Contest of ${timeInMinutes} minutes started`;
    startTimer(endTime);
  });
});

function startTimer(endTime) {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const remainingTime = endTime - Date.now();
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      timer.textContent = "00:00:00";
      chrome.runtime.sendMessage({ type: "contestEnded" });
      return;
    }

    const h = Math.floor(remainingTime / 3600000);
    const m = Math.floor((remainingTime % 3600000) / 60000);
    const s = Math.floor((remainingTime % 60000) / 1000);
    timer.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("endTime", (data) => {
    if (data.endTime) {
      startTimer(data.endTime);
    }
  });
});
