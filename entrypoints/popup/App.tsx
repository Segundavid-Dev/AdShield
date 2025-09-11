import { useState } from "react";
import "./App.css";
import OnboardScreen from "./screens/onboard-screen";

function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    // return cleanup function
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>{showSplash ? <OnboardScreen /> : <div>Main App Content</div>}</div>
  );
}

export default App;
