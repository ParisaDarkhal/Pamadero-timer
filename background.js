chrome.alarms.create("Pomodoro Timer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "Pomodoro Timer") {
    chrome.storage.local.get(["timer", "isRunning"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;
        if (timer === 25 * 60) {
          this.registration.showNotification("Time's Up Note", {
            body: "25 minutes is passed!",
            icon: "icon.png",
          });

          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});

chrome.permissions.contains({ permissions: ["notifications"] }, (result) => {
  if (result) {
    console.log("Notifications allowed!");
    // Your notification creation code here
  } else {
    console.log("Notifications not allowed.");
    // Handle permission request
  }
});
