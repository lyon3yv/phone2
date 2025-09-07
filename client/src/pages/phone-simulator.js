import React, { useState } from "react";
import PhoneFrame from "@/components/phone-frame";
import HomeScreen from "@/components/apps/home-screen";
import Instagram from "@/components/apps/instagram";
import Tinder from "@/components/apps/tinder";
import Wallapop from "@/components/apps/wallapop";
import WhatsApp from "@/components/apps/whatsapp";
import Darkweb from "@/components/apps/darkweb";
import FlappyBird from "@/components/apps/flappy-bird";
import Admin from "@/components/apps/admin";
import Restaurant from "@/components/apps/restaurant";

export default function PhoneSimulator() {
  const [currentApp, setCurrentApp] = useState("home");

  const renderApp = () => {
    switch (currentApp) {
      case "instagram":
        return React.createElement(Instagram, { onBack: () => setCurrentApp("home") });
      case "tinder":
        return React.createElement(Tinder, { onBack: () => setCurrentApp("home") });
      case "wallapop":
        return React.createElement(Wallapop, { onBack: () => setCurrentApp("home") });
      case "whatsapp":
        return React.createElement(WhatsApp, { onBack: () => setCurrentApp("home") });
      case "darkweb":
        return React.createElement(Darkweb, { onBack: () => setCurrentApp("home") });
      case "flappybird":
        return React.createElement(FlappyBird, { onBack: () => setCurrentApp("home") });
      case "admin":
        return React.createElement(Admin, { onBack: () => setCurrentApp("home") });
      case "restaurant":
        return React.createElement(Restaurant, { onBack: () => setCurrentApp("home") });
      default:
        return React.createElement(HomeScreen, { onAppSelect: setCurrentApp });
    }
  };

  return React.createElement(
    "div",
    {
      className:
        "min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 flex items-center justify-center p-4",
    },
    React.createElement(
      "div",
      { className: "fixed top-6 left-1/2 transform -translate-x-1/2 z-50" },
      React.createElement(
        "div",
        {
          className:
            "bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm",
        },
        React.createElement("i", { className: "fas fa-gamepad mr-2" }),
        "Zona Cero RP"
      )
    ),
    React.createElement(PhoneFrame, null, renderApp())
  );
}
