
const button = document.createElement("button");

button.textContent = "Challenge";

Object.assign(button.style, {
  position: "fixed",
  top: "15px",
  right: "15px",
  backgroundColor: "blue",
  zIndex: "100000",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  textAlign: "center",
  lineHeight: "normal"
});


document.body.appendChild(button);
