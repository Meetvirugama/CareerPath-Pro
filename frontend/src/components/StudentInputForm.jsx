import { useState } from "react";
import "./HalloweenTheme.css";
import ScarySelector from "./ScarySelector";
import TrickOrTreatButton from "./TrickOrTreatButton";
import HalloweenProgress from "./HalloweenProgress";
import Pumpkin from "./Pumpkin";
import HalloweenBats from "./HalloweenBats";

export default function StudentInputForm() {
  const [formData, setFormData] = useState({
    Gender: "Male",
    Degree: "B.Tech",
    Branch: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // 🔥 Production + Local fallback
  const API_URLS = [
    "https://careerpath-pro-a2th.onrender.com", // Production
    "http://localhost:8000",                    // Local
  ];

  // ⏳ Timeout protection (important for Render cold start)
  const fetchWithTimeout = (url, options, timeout = 10000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeout)
      ),
    ]);
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    let success = false;

    for (const baseURL of API_URLS) {
      try {
        const response = await fetchWithTimeout(
          `${baseURL}/predict`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          },
          10000
        );

        if (!response.ok) throw new Error("API Error");

        const data = await response.json();
        setResult(data);
        success = true;
        break; // stop if success
      } catch (error) {
        console.warn(`Failed at ${baseURL}`);
      }
    }

    if (!success) {
      alert("All servers are down 💀 Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className={`page ${result ? "afterSubmit" : "beforeSubmit"}`}>
      <HalloweenBats />

      {loading && (
        <div className="fullscreenLoader">
          <Pumpkin />
          <p className="loadingText">Summoning Your Future...</p>
        </div>
      )}

      {/* TITLE */}
      <div className="titleSection">
        <h1 className="title">🎃 CareerPath Pro</h1>
        <p className="subtitle">Halloween Placement Predictor</p>
      </div>

      {/* RESULT */}
      <div className="resultSection">
        {result && (
          <div
            className={`resultCard ${
              Number(result["Placement_Chance_%"]) >= 75
                ? "high"
                : Number(result["Placement_Chance_%"]) >= 40
                ? "moderate"
                : "low"
            }`}
          >
            <div className="resultBox">
              <div className="boxTitle">Placement</div>
              <div className="boxValue">
                {result.Placement_Status}
              </div>
              <div className="boxSubText">
                {result.Placement_Status === "Placed"
                  ? "Ready for industry 🚀"
                  : "Needs improvement 💀"}
              </div>
            </div>

            <div className="resultBox centerBox">
              <HalloweenProgress
                percentage={Number(result["Placement_Chance_%"]) || 0}
                duration={2000}
              />
            </div>

            <div className="resultBox">
              <div className="boxTitle">Salary</div>
              <div className="boxValue">
                ₹{Number(result.Predicted_Salary).toLocaleString()}
              </div>
              <div className="boxSubText">
                {Number(result.Predicted_Salary) > 0
                  ? "Estimated package"
                  : "No package predicted"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FORM */}
      <div className="formSection">
        <div className="grid">
          {[
            ["Age", "Age"],
            ["CGPA", "CGPA"],
            ["Internships", "Internships"],
            ["Projects", "Projects"],
            ["Coding_Skills", "Coding Skills (0-10)"],
            ["Communication_Skills", "Comm Skill (0-100)"],
            ["Aptitude_Test_Score", "Apti.. Score (0-100)"],
            ["Soft_Skills_Rating", "Soft Skills (0-10)"],
            ["Certifications", "Certifications"],
            ["Backlogs", "Backlogs"],
          ].map(([key, label]) => (
            <ScarySelector
              key={key}
              type="number"
              placeholder={label}
              value={formData[key] ?? ""}
              onChange={(e) =>
                handleChange(
                  key,
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            />
          ))}

          <ScarySelector
            type="text"
            placeholder="CSE OR ECE"
            value={formData.Branch ?? ""}
            onChange={(e) => handleChange("Branch", e.target.value)}
          />
        </div>
      </div>

      {/* BUTTON */}
      <div className="submitSection">
        <TrickOrTreatButton
          onClick={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
