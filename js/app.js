const boxes = document.querySelectorAll(".color-box");
const generateBtn = document.getElementById("generate");
const modeToggle = document.getElementById("modeToggle");
const customPicker = document.getElementById("customColor");
const copyCssBtn = document.getElementById("copyCss");
const exportJsonBtn = document.getElementById("exportJson");

let theme = Storage.load("theme", generatePalette());
let mode = Storage.load("mode", "light");
let history = Storage.load("history", []);

function applyTheme() {
  document.documentElement.style.setProperty("--primary", theme.primary);
  document.documentElement.style.setProperty("--secondary", theme.secondary);
  document.documentElement.style.setProperty("--accent", theme.accent);

  boxes.forEach(box => {
    const role = box.dataset.role;
    box.style.background = theme[role];
  });

  Storage.save("theme", theme);
}

function applyMode() {
  document.body.classList.toggle("dark", mode === "dark");
  Storage.save("mode", mode);
}

generateBtn.onclick = () => {
  history.unshift(theme);
  history = history.slice(0, 5);
  Storage.save("history", history);

  theme = generatePalette();
  applyTheme();
};

customPicker.oninput = e => {
  theme.primary = e.target.value;
  applyTheme();
};

boxes.forEach(box => {
  box.addEventListener("click", () => {
    boxes.forEach(b => b.classList.remove("active"));
    box.classList.add("active");
    document.body.style.background = box.style.background;
  });

  box.addEventListener("keydown", e => {
    if (e.key === "Enter") box.click();
  });
});

modeToggle.onclick = () => {
  mode = mode === "light" ? "dark" : "light";
  applyMode();
};

copyCssBtn.onclick = () => {
  const css = `
:root {
  --primary: ${theme.primary};
  --secondary: ${theme.secondary};
  --accent: ${theme.accent};
}`;
  navigator.clipboard.writeText(css);
  alert("CSS variables copied!");
};

exportJsonBtn.onclick = () => {
  const blob = new Blob([JSON.stringify(theme, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "theme.json";
  a.click();
};

applyTheme();
applyMode();
