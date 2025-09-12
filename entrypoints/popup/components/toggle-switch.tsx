import type { toggleSwitchProps } from "@/types";

export default function ToggleSwitch({ enabled, onChange }: toggleSwitchProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        width: "64px",
        height: "32px",
        borderRadius: "16px",
        border: "none",
        cursor: "pointer",
        backgroundColor: enabled ? "#10b981" : "#9ca3af",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          backgroundColor: "white",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          transform: enabled ? "translateX(32px)" : "translateX(2px)",
          transition: "transform 0.3s ease-in-out",
          position: "relative",
        }}
      >
        {enabled && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#10b981",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            ✓
          </div>
        )}
      </span>
    </button>
  );
}
