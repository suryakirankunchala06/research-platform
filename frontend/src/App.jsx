import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/upload", formData);
      alert("Uploaded Successfully");
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  const handleSearch = async () => {
    if (!query) {
      alert("Enter something to search");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/search?query=${query}`
      );

      console.log("Search Results:", res.data); // debug
      setResults(res.data);
    } catch (err) {
      console.log(err);
      alert("Search failed");
    }
  };

  const handleChat = async () => {
    if (!question) {
      alert("Enter a question");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.log(err);
      alert("Chat failed");
    }
  };

  return (
    <div className="container">
      <h1>Research Platform</h1>

      {/* Upload */}
      <h2>Upload PDF</h2>
      <div className="section">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      {/* Search */}
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
          <p>No results found</p>
        ) : (
          results.map((item, index) => (
            <p key={index}>{item.text}</p>
          ))
        )}
      </div>

      {/* Chat */}
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
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default App;