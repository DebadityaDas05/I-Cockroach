import { useState } from "react";

const BASE_URL = "https://riverbed-carving-nuclear.ngrok-free.dev";

function AiChatPopup() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("smart-pitch");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const getPlaceholder = () => {
    if (mode === "smart-pitch") return "Enter student pitch...";
    if (mode === "job-match") return "Enter student criteria...";
    return "Enter business job...";
  };

  const askAI = async () => {
    if (!message.trim() || loading) return;

    setLoading(true);
    setResponse("Thinking...");

    let url = `${BASE_URL}/smart-pitch`;
    let body = {
      job: "Need 5 Instagram reels for a cafe in Kolkata. Budget 2000 rupees.",
      pitch: message,
    };

    if (mode === "job-match") {
      url = `${BASE_URL}/job-match`;
      body = {
        student_criteria: message,
        job_listings:
          "1. Cafe reel editing ₹2000 3 days\n2. Logo design ₹1500 1 day\n3. Restaurant menu redesign ₹1000 4 hours\n4. React landing page ₹3000 2 days",
      };
    }

    if (mode === "talent-match") {
      url = `${BASE_URL}/talent-match`;
      body = {
        business_job: message,
        student_profiles:
  "1. Sreja - Reel editing, Canva, food photography, 4.8 rating\n2. Arka - Instagram growth, CapCut editing, cafe content, 4.7 rating\n3. Debaditya - Logo design, Photoshop, branding, 4.3 rating",
      };
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response || "No response received from AI.");
      setMessage("");
    } catch (error) {
      console.error("AI error:", error);
      setResponse(
        "AI request failed. Check Colab server, ngrok URL, or browser console."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 text-white font-semibold shadow-xl hover:scale-105 transition"
      >
        Chat With AI
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-white via-blue-50 to-blue-100">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-8 text-4xl text-gray-600 hover:text-black"
          >
            ×
          </button>

          <div className="h-screen flex flex-col px-10 py-8 max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6 text-center">
              I-COCKROACH AI Assistant
            </h1>

            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => {
                  setMode("smart-pitch");
                  setResponse("");
                }}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  mode === "smart-pitch"
                    ? "bg-purple-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Smart Pitch
              </button>

              <button
                onClick={() => {
                  setMode("job-match");
                  setResponse("");
                }}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  mode === "job-match"
                    ? "bg-purple-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Job Match
              </button>

              <button
                onClick={() => {
                  setMode("talent-match");
                  setResponse("");
                }}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  mode === "talent-match"
                    ? "bg-purple-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Talent Match
              </button>
            </div>

            <div className="flex-1 overflow-y-auto mb-6 bg-white rounded-3xl p-8 shadow-xl text-gray-700 text-lg whitespace-pre-wrap">
              {response || "AI response will appear here..."}
            </div>

            <div className="w-full rounded-full bg-white shadow-xl flex items-center px-6 py-4 gap-4 mb-3">
              <button className="text-3xl text-gray-700">+</button>

              <input
                type="text"
                placeholder={getPlaceholder()}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") askAI();
                }}
                className="flex-1 outline-none text-lg bg-transparent text-gray-700"
              />

              <span className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                Pro
              </span>

              <button
                onClick={askAI}
                disabled={loading}
                className="bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AiChatPopup;
