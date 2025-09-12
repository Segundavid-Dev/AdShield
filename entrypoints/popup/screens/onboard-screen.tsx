import { ShieldCheck } from "lucide-react";

export default function OnboardScreen() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "520px",
      }}
    >
      <div>
        <ShieldCheck size={64} />
        <h1>Ad-Shield</h1>
      </div>
    </div>
  );
}
