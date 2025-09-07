import { useState } from "react";
import PhoneFrame from "@/components/phone-frame";
import HomeScreen from "@/components/apps/home-screen";
import Instagram from "@/components/apps/instagram";
import Tinder from "@/components/apps/tinder";
import Wallapop from "@/components/apps/wallapop";
import WhatsApp from "@/components/apps/whatsapp";
import Darkweb from "@/components/apps/darkweb";
import FlappyBird from "@/components/apps/flappy-bird";
import Admin from "@/components/apps/admin";

export type AppType = "home" | "instagram" | "tinder" | "wallapop" | "whatsapp" | "darkweb" | "flappybird" | "admin";

export default function PhoneSimulator() {
  const [currentApp, setCurrentApp] = useState<AppType>("home");

  const renderApp = () => {
    switch (currentApp) {
      case "instagram":
        return <Instagram onBack={() => setCurrentApp("home")} />;
      case "tinder":
        return <Tinder onBack={() => setCurrentApp("home")} />;
      case "wallapop":
        return <Wallapop onBack={() => setCurrentApp("home")} />;
      case "whatsapp":
        return <WhatsApp onBack={() => setCurrentApp("home")} />;
      case "darkweb":
        return <Darkweb onBack={() => setCurrentApp("home")} />;
      case "flappybird":
        return <FlappyBird onBack={() => setCurrentApp("home")} />;
      case "admin":
        return <Admin onBack={() => setCurrentApp("home")} />;
      default:
        return <HomeScreen onAppSelect={setCurrentApp} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
          <i className="fas fa-gamepad mr-2"></i>
          Zona Cero RP
        </div>
      </div>
      
      <PhoneFrame>
        {renderApp()}
      </PhoneFrame>
    </div>
  );
}
