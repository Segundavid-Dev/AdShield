import { useState } from "react";
import ToggleSwitch from "./toggle-switch";
import { ShieldOff, ShieldCheck } from "lucide-react";

export default function ActivateBlocker() {
  const [adBlockerEnabled, setAdBlockerEnabled] = useState<boolean>(true);

  return (
    <div style={{ width: "100%", maxWidth: "350px", margin: "0 auto" }}>
      {/* Status icon */}
      <div style={{ textAlign: "center" }}>
        {adBlockerEnabled ? (
          <ShieldCheck size={120} color="#10b981" />
        ) : (
          <ShieldOff size={120} color="#ef4444" />
        )}
      </div>
      {/* Status Text */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
          {adBlockerEnabled ? "Protection Active" : "Protection Disabled"}
        </h2>
        <p style={{ margin: "0", fontSize: "12px", color: "#6b7280" }}>
          {adBlockerEnabled
            ? "Blocked ads and trackers"
            : "Enable protection to block ads and trackers"}
        </p>
      </div>
      {/* Main Toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: "#1a1a1a",
          borderRadius: "8px",
          padding: "8px 16px",
          marginBottom: "1rem",
        }}
      >
        <div>
          <p style={{ color: "#9ca3af", fontSize: "12px" }}>
            Block ads and trackers
          </p>
        </div>
        <div style={{ flexShrink: 0 }}>
          <ToggleSwitch
            enabled={adBlockerEnabled}
            onChange={setAdBlockerEnabled}
          />
        </div>
      </div>
    </div>
  );
}
