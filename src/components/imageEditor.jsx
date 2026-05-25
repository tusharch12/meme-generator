import React, { useState } from "react";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";

const ImageEditor = ({ selectedMeme, textElements, updateTextElement }) => {
    const memeRef = React.useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadMeme = async () => {
        if (!memeRef.current) return;
        try {
            setIsDownloading(true);
            await new Promise((resolve) => setTimeout(resolve, 80));
            const canvas = await html2canvas(memeRef.current, {
                useCORS: true,
                allowTaint: false,
                scale: 2,
                logging: false,
            });
            const imageURL = canvas.toDataURL("image/png", 1);
            const link = document.createElement("a");
            link.download = "custom-meme.png";
            link.href = imageURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("Error generating meme:", err);
        } finally {
            setIsDownloading(false);
        }
    };

    // Handle dots for resize — hidden during download
    const handleStyles = isDownloading ? {} : {
        bottomRight: { background: "#7c3aed", borderRadius: "50%", width: "10px", height: "10px", right: "-4px", bottom: "-4px" },
        topLeft:     { background: "#7c3aed", borderRadius: "50%", width: "10px", height: "10px", left: "-4px", top: "-4px" },
        topRight:    { background: "#7c3aed", borderRadius: "50%", width: "10px", height: "10px", right: "-4px", top: "-4px" },
        bottomLeft:  { background: "#7c3aed", borderRadius: "50%", width: "10px", height: "10px", left: "-4px", bottom: "-4px" },
        top:    { background: "#7c3aed", borderRadius: "50%", width: "10px", height: "10px", top: "-4px", left: "calc(50% - 5px)" },
        bottom: { background: "#7c3aed", borderRadius: "50%", width: "10px", height: "10px", bottom: "-4px", left: "calc(50% - 5px)" },
        left:   { background: "#7c3aed", borderRadius: "50%", width: "10px", height: "10px", left: "-4px", top: "calc(50% - 5px)" },
        right:  { background: "#7c3aed", borderRadius: "50%", width: "10px", height: "10px", right: "-4px", top: "calc(50% - 5px)" },
    };

    const nullHandles = {
        bottomRight: () => null, topLeft: () => null, topRight: () => null,
        bottomLeft: () => null, top: () => null, bottom: () => null,
        left: () => null, right: () => null,
    };

    return (
        <div className="image-editor">
            <div className="editor-header">
                <button
                    className="download-btn"
                    onClick={handleDownloadMeme}
                    disabled={isDownloading}
                >
                    {isDownloading ? "Generating…" : "Download Meme"}
                </button>
            </div>

            <div className="image-preview">
                {selectedMeme ? (
                    <div
                        className={`meme-container${isDownloading ? " is-downloading" : ""}`}
                        ref={memeRef}
                    >
                        <img src={selectedMeme.url} alt={selectedMeme.name} />

                        {/* Render one <Rnd> per text element */}
                        {textElements.map((el) => (
                            <Rnd
                                key={el.id}
                                position={{ x: el.x, y: el.y }}
                                size={{ width: el.width, height: el.height }}
                                bounds="parent"
                                style={{
                                    position: "absolute",
                                    border: isDownloading ? "none" : "1.5px dashed rgba(124, 58, 237, 0.7)",
                                    padding: "4px 6px",
                                    background: isDownloading ? "transparent" : "rgba(0,0,0,0.25)",
                                    cursor: "move",
                                    borderRadius: "4px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                resizeHandleStyles={handleStyles}
                                resizeHandleComponent={isDownloading ? nullHandles : undefined}
                                onDragStop={(e, d) =>
                                    updateTextElement(el.id, { x: d.x, y: d.y })
                                }
                                onResizeStop={(e, direction, ref, delta, position) =>
                                    updateTextElement(el.id, {
                                        width: parseInt(ref.style.width),
                                        height: parseInt(ref.style.height),
                                        x: position.x,
                                        y: position.y,
                                    })
                                }
                            >
                                <span className="meme-text">{el.text}</span>
                            </Rnd>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">Loading memes…</div>
                )}
            </div>
        </div>
    );
};

export default ImageEditor;