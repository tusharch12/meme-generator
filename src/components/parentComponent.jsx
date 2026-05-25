import { useEffect, useRef, useState } from "react";
import ImageEditor from "./imageEditor";
import TextEditor from "./textEditor";

// Helper to create a new text element with default values
const createTextElement = (overrides = {}) => ({
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    text: "TEXT",
    x: 20,
    y: 20,
    width: 180,
    height: 60,
    ...overrides,
});

const ParentComponent = () => {
    const [listOfMemes, setListOfMemes] = useState([]);
    const [selectedMeme, setSelectedMeme] = useState(null);
    const [textElements, setTextElements] = useState([
        createTextElement({ text: "HELLO", x: 20, y: 20 }),
        createTextElement({ text: "", x: 20, y: 180 }),
    ]);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => {
                setListOfMemes(data.data.memes);
                setSelectedMeme(data.data.memes[0]);
            })
            .catch((error) => console.error("Failed to load memes:", error));
    }, []);


    const addTextElement = () => {
        setTextElements((prev) => [...prev, createTextElement({ y: prev.length * 80 })]);
    };


    const removeTextElement = (id) => {
        setTextElements((prev) => prev.filter((el) => el.id !== id));
    };


    const updateTextElement = (id, updatedFields) => {
        setTextElements((prev) =>
            prev.map((el) => (el.id === id ? { ...el, ...updatedFields } : el))
        );
    };

    const onSelectedMeme = (meme) => setSelectedMeme(meme);

    return (
        <div className="parent-layout">
            <h1 className="page-title">Meme Generator</h1>
            <div className="editor-grid">
                <div className="editor-card">
                    <div className="card-title">🖼️ Preview &amp; Download</div>
                    <ImageEditor
                        selectedMeme={selectedMeme}
                        textElements={textElements}
                        updateTextElement={updateTextElement}
                    />
                </div>
                <div className="editor-card">
                    <div className="card-title">✏️ Customize</div>
                    <TextEditor
                        listOfMemes={listOfMemes}
                        textElements={textElements}
                        onSelectedMeme={onSelectedMeme}
                        addTextElement={addTextElement}
                        removeTextElement={removeTextElement}
                        updateTextElement={updateTextElement}
                    />
                </div>
            </div>
        </div>
    );
};

export default ParentComponent;
