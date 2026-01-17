function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
}

function generatePalette() {
  return {
    primary: randomColor(),
    secondary: randomColor(),
    accent: randomColor()
  };
}
