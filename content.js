const challengeButton = document.createElement("button");

challengeButton.textContent = "Challenge"; // Set button text

// Set styles using `style` property
challengeButton.style.position = "fixed";
challengeButton.style.top = "10px";
challengeButton.style.right = "10px";
challengeButton.style.backgroundColor = "blue";
challengeButton.style.zIndex = "9999";
challengeButton.style.padding = "10px 20px";
challengeButton.style.border = "none";
challengeButton.style.borderRadius = "5px";

challengeButton.style.cursor = "pointer";
challengeButton.style.fontSize = "14px";
challengeButton.style.textAlign = "center";
challengeButton.style.lineHeight = "normal";

// Append the button to the body
document.body.appendChild(challengeButton);
