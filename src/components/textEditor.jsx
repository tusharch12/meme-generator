const FONT_OPTIONS = [
    { label: "Impact", value: "Impact" },
    { label: "Anton", value: "Anton" },
    { label: "Oswald", value: "Oswald" },
    { label: "Bebas Neue", value: "Bebas Neue" },
    { label: "Comic Sans", value: "Comic Sans MS" },
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
];

const TextEditor = ({
    listOfMemes,
    textElements,
    onSelectedMeme,
    addTextElement,
    removeTextElement,
    updateTextElement,
}) => {
    return (
        <div className="text-editor">

            {/* ── Meme Gallery ── */}
            <div className="meme-gallery">
                {listOfMemes.map((meme) => (
                    <div key={meme.id} className="meme-item">
                        <img
                            className="meme-image"
                            src={meme.url}
                            alt={meme.name}
                            onClick={() => onSelectedMeme(meme)}
                        />
                    </div>
                ))}
            </div>


            <div className="text-inputs-list">
                {textElements.map((el, index) => (
                    <div key={el.id} className="text-element-group">


                        <div className="text-input-row">
                            <span className="text-input-label">#{index + 1}</span>
                            <input
                                placeholder="Enter text..."
                                value={el.text}
                                onChange={(e) =>
                                    updateTextElement(el.id, { text: e.target.value })
                                }
                            />
                            <button
                                className="delete-text-btn"
                                onClick={() => removeTextElement(el.id)}
                                title="Remove this text"
                            >
                                ✕
                            </button>
                        </div>


                        <div className="font-controls">

                            <select
                                className="font-select"
                                value={el.fontFamily}
                                onChange={(e) =>
                                    updateTextElement(el.id, { fontFamily: e.target.value })
                                }
                                style={{ fontFamily: el.fontFamily }}
                            >
                                {FONT_OPTIONS.map((opt) => (
                                    <option
                                        key={opt.value}
                                        value={opt.value}
                                        style={{ fontFamily: opt.value }}
                                    >
                                        {opt.label}
                                    </option>
                                ))}
                            </select>

                            {/* Font size slider */}
                            <div className="size-control">
                                <input
                                    type="range"
                                    className="size-slider"
                                    min={12}
                                    max={96}
                                    step={1}
                                    value={el.fontSize}
                                    onChange={(e) =>
                                        updateTextElement(el.id, { fontSize: Number(e.target.value) })
                                    }
                                />
                                <span className="size-badge">{el.fontSize}px</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* ── Add Text Button ── */}
            <button className="add-text-btn" onClick={addTextElement}>
                + Add Text
            </button>

        </div>
    );
};

export default TextEditor;