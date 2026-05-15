import { useState } from "react";
import "./HalloweenTheme.css";
import ScarySelector from "./ScarySelector";
import TrickOrTreatButton from "./TrickOrTreatButton";
import HalloweenProgress from "./HalloweenProgress";
import Pumpkin from "./Pumpkin";
import HalloweenBats from "./HalloweenBats";
import HalloweenErrorModal from "./HalloweenErrorModal";

export default function StudentInputForm() {
  const [formData, setFormData] = useState({
    Gender: "Male",
    Degree: "B.Tech",
    Branch: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // 🔥 Environment variables for API routing
  const primaryApiUrl = process.env.REACT_APP_API_URL || "https://careerpath-pro-a2th.onrender.com";
  const timeoutMs = parseInt(process.env.REACT_APP_TIMEOUT_MS || "10000", 10);

  // Production + Local fallback (deduplicated)
  const API_URLS = Array.from(new Set([primaryApiUrl, "http://localhost:8000"]));

  // ⏳ Timeout protection (important for Render cold start)
  const fetchWithTimeout = (url, options, timeout = timeoutMs) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeout)
      ),
    ]);
  };

  const handleSubmit = async () => {
    if (loading) return;

    // Validation
    const requiredFields = [
      "Age", "Gender", "Degree", "Branch", "CGPA", "Internships", 
      "Projects", "Coding_Skills", "Communication_Skills", 
      "Aptitude_Test_Score", "Soft_Skills_Rating", "Certifications", "Backlogs"
    ];

    for (let field of requiredFields) {
      if (formData[field] === undefined || formData[field] === "") {
        setErrorMsg(`Please fill out the field: ${field.replace(/_/g, " ")}`);
        return;
      }
    }

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
          timeoutMs
        );

        if (!response.ok) {
          if (response.status === 422) {
            const errorData = await response.json();
            const detailMsg = errorData.detail?.[0]?.msg || "Check your inputs";
            const fieldLoc = errorData.detail?.[0]?.loc?.[1] || "Field";
            setErrorMsg(`Invalid Input! ${fieldLoc}: ${detailMsg}`);
            success = true; // Connection succeeded, just invalid payload
            break;
          }
          throw new Error("API Error");
        }

        const data = await response.json();
        setResult(data);
        success = true;
        break; // stop if success
      } catch (error) {
        console.warn(`Failed at ${baseURL}`);
      }
    }

    if (!success && !errorMsg) {
      setErrorMsg("All servers are down 💀 Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className={`page ${result ? "afterSubmit" : "beforeSubmit"}`}>
      <HalloweenErrorModal message={errorMsg} onClose={() => setErrorMsg(null)} />
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
            ["Coding_Skills", "Coding (0-10)"],
            ["Communication_Skills", "Comm (0-100)"],
            ["Aptitude_Test_Score", "Aptitude (0-100)"],
            ["Soft_Skills_Rating", "Soft Skill (0-10)"],
            ["Certifications", "Certifications"],
            ["Backlogs", "Backlogs"],
          ].map(([key, label]) => (
            <ScarySelector
              key={key}
              type="text"
              placeholder={label}
              value={formData[key] ?? ""}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          ))}

          <ScarySelector
            type="select"
            placeholder="Gender"
            options={["Male", "Female", "Other"]}
            value={formData.Gender ?? ""}
            onChange={(e) => handleChange("Gender", e.target.value)}
          />

          <ScarySelector
            type="select"
            placeholder="Degree"
            options={["B.Tech", "B.E", "M.Tech", "BCA", "MCA"]}
            value={formData.Degree ?? ""}
            onChange={(e) => handleChange("Degree", e.target.value)}
          />

          <ScarySelector
            type="select"
            placeholder="Branch"
            options={["Computer Science", "Information Technology", "Electronics and Communication", "Electrical", "Mechanical", "Civil", "Other"]}
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
