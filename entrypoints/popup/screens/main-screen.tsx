import Header from "../components/header";
import ActivateBlocker from "../components/activate-blocker";
import Footer from "../components/footer";

export default function MainScreen() {
  return (
    <div>
      <Header />
      <ActivateBlocker />
      <Footer />
    </div>
  );
}

// import React, { useState } from "react";
// import { Shield, ArrowLeft } from "lucide-react";

// export default function AdBlockerDashboard() {
//   const [adBlockerEnabled, setAdBlockerEnabled] = useState(false);
//   const [stickyAdsEnabled, setStickyAdsEnabled] = useState(true);
//   const [adsBlocked] = useState(213);

//   const ToggleSwitch = ({ enabled, onChange, size = "default" }) => {
//     const sizeClasses = size === "large" ? "w-16 h-8" : "w-12 h-6";
//     const thumbClasses = size === "large" ? "w-7 h-7" : "w-5 h-5";

//     return (
//       <button
//         onClick={() => onChange(!enabled)}
//         className={`
//           relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out
//           ${sizeClasses}
//           ${enabled ? "bg-purple-600" : "bg-gray-300"}
//         `}
//       >
//         <span
//           className={`
//             inline-block transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out
//             ${thumbClasses}
//             ${
//               enabled
//                 ? size === "large"
//                   ? "translate-x-8"
//                   : "translate-x-6"
//                 : "translate-x-1"
//             }
//           `}
//         >
//           {enabled && size === "large" && (
//             <div className="flex items-center justify-center h-full">
//               <div className="w-3 h-3 text-purple-600">✓</div>
//             </div>
//           )}
//         </span>
//       </button>
//     );
//   };

//   return (
//     <div className="w-96 h-[540px] bg-white flex flex-col">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b">
//         <ArrowLeft size={24} className="text-gray-600 cursor-pointer" />
//         <h1 className="text-lg font-semibold text-gray-800">Adblock</h1>
//         <div className="w-6" /> {/* Spacer */}
//       </div>

//       {/* Shield Stats */}
//       <div className="flex-1 flex flex-col items-center justify-center px-6">
//         <div className="relative mb-8">
//           {/* Background circles for visual effect */}
//           <div
//             className={`w-48 h-48 rounded-full ${
//               adBlockerEnabled ? "bg-purple-100" : "bg-gray-100"
//             } flex items-center justify-center`}
//           >
//             <div
//               className={`w-36 h-36 rounded-full ${
//                 adBlockerEnabled ? "bg-purple-200" : "bg-gray-200"
//               } flex items-center justify-center`}
//             >
//               <div
//                 className={`w-24 h-24 rounded-full ${
//                   adBlockerEnabled ? "bg-purple-600" : "bg-gray-400"
//                 } flex flex-col items-center justify-center text-white`}
//               >
//                 <div className="text-2xl font-bold">{adsBlocked}</div>
//                 <div className="text-xs">Ads Blocked</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="w-full space-y-6">
//           {/* Ad Blocker Toggle */}
//           <div className="flex items-center justify-between">
//             <span className="text-gray-700 font-medium">Ad Blocker</span>
//             <ToggleSwitch
//               enabled={adBlockerEnabled}
//               onChange={setAdBlockerEnabled}
//               size="large"
//             />
//           </div>

//           {/* Block Sticky Ads Toggle */}
//           <div className="flex items-center justify-between">
//             <span className="text-gray-700 font-medium">Block Sticky Ads</span>
//             <ToggleSwitch
//               enabled={stickyAdsEnabled}
//               onChange={setStickyAdsEnabled}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
