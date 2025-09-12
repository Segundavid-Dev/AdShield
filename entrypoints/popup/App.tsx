import { useState } from "react";
import "./App.css";
import OnboardScreen from "./screens/onboard-screen";
import MainScreen from "./screens/main-screen";

function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    // return cleanup function
    return () => clearTimeout(timer);
  }, []);

  return <div>{showSplash ? <OnboardScreen /> : <MainScreen />}</div>;
}

export default App;
