# 🎭 Meme Generator

A modern, interactive meme generator built with **React** and **Vite**. Browse popular meme templates, add unlimited draggable text boxes, position them freely, and download your creation as a clean PNG.

---

## ✨ Features

- 🖼️ **100+ meme templates** — fetched live from the [Imgflip API](https://api.imgflip.com/)
- ✏️ **Unlimited text elements** — add, edit, and delete as many text boxes as you need
- 🖱️ **Drag & resize** — position each text box anywhere on the image using drag-and-drop
- 📥 **Clean export** — download your meme as a PNG (borders and handles are hidden in the output)
- 🌗 **Dark mode** — automatically adapts to your system preference
- ⚡ **Fast** — powered by Vite with instant hot module reload

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 8](https://vite.dev/) | Build tool & dev server |
| [react-rnd](https://github.com/bokuweb/react-rnd) | Draggable & resizable text boxes |
| [html2canvas](https://html2canvas.hertzen.com/) | Screenshot / PNG export |
| [Imgflip API](https://api.imgflip.com/) | Meme template library |
| Vanilla CSS | Styling (no Tailwind, no UI library) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/meme-generator.git
cd meme-generator

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
meme-generator/
├── public/
├── src/
│   ├── components/
│   │   ├── parentComponent.jsx   # Root state — meme list, text elements, handlers
│   │   ├── imageEditor.jsx       # Meme preview with draggable Rnd text boxes
│   │   └── textEditor.jsx        # Meme gallery + text input controls
│   ├── App.jsx
│   ├── index.css                 # All styles — design tokens, layout, components
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎨 How It Works

1. **Select a meme** — Click any thumbnail in the gallery to load it into the preview.
2. **Add text** — Click **"+ Add Text"** to add a new text box over the image.
3. **Edit text** — Type in the input fields on the right panel; the overlay updates live.
4. **Position & resize** — Drag any text box to reposition it; drag the corner handles to resize.
5. **Download** — Click **"↓ Download Meme"** to export a clean PNG (drag handles are hidden automatically during export).

---

## 🔧 Key Implementation Details

### Dynamic Text Elements (State)

Text boxes are managed as an array in React state:

```js
// Each element looks like:
{
  id: "unique-string",
  text: "HELLO",
  x: 20,
  y: 20,
  width: 180,
  height: 60
}
```

Three handler functions manage the array: `addTextElement`, `removeTextElement`, and `updateTextElement`.

### Clean PNG Export

When the user clicks Download, `isDownloading` is set to `true` before `html2canvas` runs. This toggles:
- Rnd borders → `none`
- Rnd background → `transparent`
- Resize handles → replaced with `null` components

The result is a clean screenshot with only the image and text visible.

---

## 📄 License

MIT — feel free to use, modify, and distribute.
