
const button = document.createElement("button");

button.textContent = "Challenge";

Object.assign(button.style, {
  position: "fixed",
  top: "10px",
  right: "10px",
  backgroundColor: "blue",
  zIndex: "9999",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  textAlign: "center",
  lineHeight: "normal"
});


document.body.appendChild(button);
