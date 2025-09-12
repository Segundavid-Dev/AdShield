import { Info } from "lucide-react";

export default function Footer() {
  return (
    <div style={{ backgroundColor: "#1a1a1a", padding: "10px" }}>
      <p>
        Turn on Ad Shield. It helps annoying Ads and unsafe element to provide
        you with a clean and safe browsering environment.
        <span
          style={{
            marginLeft: "8px",
            verticalAlign: "middle",
            cursor: "pointer",
          }}
        >
          <Info size={16} />
        </span>
      </p>
    </div>
  );
}
