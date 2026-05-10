import React, { useEffect, useState } from "react";
import "./style.css";

function Main(){
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [apiResponse, setApiResponse] = useState(null);
    const [progressValue, setProgressValue] = useState(0);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState("");

    const THIRD_PARTY_API_URL = "http://127.0.0.1:8000/predict";

    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null;

        if (videoPreviewUrl) {
            URL.revokeObjectURL(videoPreviewUrl);
        }

        setSelectedFile(file);
        setApiResponse(null);
        setProgressValue(0);
        setVideoPreviewUrl(file ? URL.createObjectURL(file) : "");
        setUploadStatus(file ? `Selected: ${file.name}` : "");
    };

    useEffect(() => {
        return () => {
            if (videoPreviewUrl) {
                URL.revokeObjectURL(videoPreviewUrl);
            }
        };
    }, [videoPreviewUrl]);

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("Please select a video first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setUploadStatus("Uploading video...");
            setProgressValue(25);

            const response = await fetch(THIRD_PARTY_API_URL, {
                method: "POST",
                body: formData,
            });

            setProgressValue(100);

            const contentType = response.headers.get("content-type") || "";
            const result = contentType.includes("application/json")
                ? await response.json()
                : await response.text();

            if (!response.ok) {
                const errorMessage = typeof result === "string"
                    ? result
                    : result.message || "Upload failed";
                setUploadStatus(errorMessage);
                setApiResponse(result);
                return;
            }

            setUploadStatus("Upload completed successfully.");
            setApiResponse(result);
        } catch (error) {
            setProgressValue(0);
            setUploadStatus("Unable to upload video.");
        }
    };

    return (
        <main className="main-section">
            <div className="main-grid">
                <section className="hero-panel">
                    <p className="hero-badge">Video Authenticity Scanner</p>
                    <h1>AI Video Detection Tool</h1>

                    <p className="subtitle">
                        Upload your video and detect whether it is AI-generated or real with high accuracy.
                    </p>

                    <p className="powered">
                        Powered by <span>Advanced AI Models</span>
                    </p>

                    <div className="hero-highlights">
                        <div className="highlight-card">
                            <strong>75%+</strong>
                            <span>Detection confidence benchmark</span>
                        </div>
                        <div className="highlight-card">
                            <strong>Fast</strong>
                            <span>Results in seconds for short clips</span>
                        </div>
                    </div>
                </section>

                <section className="upload-panel">
                    <div className="upload-box" id="uploadBox">
                        <input type="file" id="fileInput" accept="video/*" onChange={handleFileChange} />

                        <button className="upload-btn" type="button" onClick={handleUpload}>
                            Submit
                        </button>

                        <p className="drop-text">or drag & drop video here</p>
                        <p className="formats">MP4, MOV, AVI - Max 500MB</p>
                    </div>

                    <progress id="progressBar" value={progressValue} max="100" className="progressBar"></progress>
                    <p id="uploadStatus" className="uploadStatus">{uploadStatus}</p>
                    {apiResponse && <pre className="uploadStatus">{JSON.stringify(apiResponse, null, 2)}</pre>}
                    {videoPreviewUrl && (
                        <div className="video-preview">
                            <video key={videoPreviewUrl} controls preload="metadata" playsInline width="100%" src={videoPreviewUrl}>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}
export default Main;