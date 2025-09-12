import { useState } from "react";
import ToggleSwitch from "./toggle-switch";
import { ShieldOff, ShieldCheck } from "lucide-react";

export default function ActivateBlocker() {
  const [adBlockerEnabled, setAdBlockerEnabled] = useState<boolean>(true);

  return (
    <div
      style={{
        height: "250px",
        marginBottom: "2rem",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Status icon */}
      <div style={{ textAlign: "center" }}>
        {adBlockerEnabled ? (
          <ShieldCheck size={80} color="#10b981" />
        ) : (
          <ShieldOff size={80} color="#ef4444" />
        )}
      </div>

      {/* Status Text */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
          {adBlockerEnabled ? "Protection Active" : "Protection Disabled"}
        </h2>
        <p style={{ margin: "0", fontSize: "14px", color: "#6b7280" }}>
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
          maxWidth: "300px",
          backgroundColor: "#1a1a1a",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <div>
          <span style={{ color: "white", fontWeight: "500" }}>Ad Blocker</span>
          <p
            style={{ color: "#9ca3af", fontSize: "12px", margin: "4px 0 0 0" }}
          >
            Block ads and trackers
          </p>
        </div>
        <ToggleSwitch
          enabled={adBlockerEnabled}
          onChange={setAdBlockerEnabled}
        />
      </div>
    </div>
  );
}
