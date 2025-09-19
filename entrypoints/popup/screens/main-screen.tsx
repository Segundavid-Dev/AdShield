import Header from "../components/header";
import ActivateBlocker from "../components/activate-blocker";
import Footer from "../components/footer";

export default function MainScreen() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        justifyContent: "center",
        minHeight: "100%",
        overflow: "hidden",
      }}
    >
      <Header />
      <ActivateBlocker />
      <Footer />
    </div>
  );
}
