import { useState } from "react";
import axios from "axios";
import "./App.css";

//  LIVE BACKEND URL
const BASE_URL = "https://research-platform-v4qm.onrender.com";

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // ================= UPLOAD =================
  const handleUpload = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${BASE_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Uploaded Successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  // ================= SEARCH =================
  const handleSearch = async () => {
    if (!query) {
      alert("Enter search text");
      return;
    }

    try {
      const res = await axios.get(
        `${BASE_URL}/api/search?q=${query}`
      );

      // Expecting array from backend
      setResults(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Search failed ❌");
    }
  };

  // ================= CHAT =================
  const handleChat = async () => {
    if (!question) {
      alert("Enter question");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/chat`, {
        question,
      });

      setAnswer(res.data.answer || "No answer");
    } catch (err) {
      console.error(err);
      alert("Chat failed ❌");
    }
  };

  return (
    <div className="container">
      <h1>Research Platform</h1>

      {/* ================= UPLOAD ================= */}
      <h2>Upload PDF</h2>
      <div className="section">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>

      {/* ================= SEARCH ================= */}
      <h2>Search</h2>
      <div className="section">
        <input
          type="text"
          placeholder="Search text..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="results">
        {results.length === 0 ? (
          <p>No results</p>
        ) : (
          results.map((item, index) => (
            <p key={index}>{item.text || JSON.stringify(item)}</p>
          ))
        )}
      </div>

      {/* ================= CHAT ================= */}
      <h2>AI Chat</h2>
      <div className="section">
        <input
          type="text"
          placeholder="Ask question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleChat}>Ask</button>
      </div>

      <div className="answer">
        {answer && <p>{answer}</p>}
      </div>
    </div>
  );
}

export default App;