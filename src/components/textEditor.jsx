const TextEditor = ({ listOfMemes, textElements, onSelectedMeme, addTextElement, removeTextElement, updateTextElement }) => {

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
                    <div key={el.id} className="text-input-row">
                        <span className="text-input-label">#{index + 1}</span>
                        <input
                            placeholder="Enter text..."
                            value={el.text}
                            onChange={(e) => updateTextElement(el.id, { text: e.target.value })}
                        />
                        <button
                            className="delete-text-btn"
                            onClick={() => removeTextElement(el.id)}
                            title="Remove this text"
                        >
                            ✕
                        </button>
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