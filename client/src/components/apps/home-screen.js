export default function HomeScreen({ onAppSelect }) {
  const apps = [
    {
      id: "instagram",
      name: "Instagram",
      icon: "fab fa-instagram",
      gradient: "from-purple-600 via-pink-600 to-orange-400"
    },
    {
      id: "tinder",
      name: "Tinder",
      icon: "fas fa-fire",
      gradient: "from-pink-500 to-red-500"
    },
    {
      id: "wallapop",
      name: "Wallapop",
      icon: "fas fa-shopping-bag",
      gradient: "from-green-500 to-teal-500"
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: "fab fa-whatsapp",
      gradient: "from-green-600 to-green-700"
    },
    {
      id: "darkweb",
      name: "Dark Web",
      icon: "fas fa-shield-alt",
      gradient: "from-gray-800 via-black to-green-900"
    },
    {
      id: "flappybird",
      name: "Flappy Bird",
      icon: "fas fa-dove",
      gradient: "from-yellow-400 via-orange-500 to-red-500"
    },
    {
      id: "admin",
      name: "Admin Panel",
      icon: "fas fa-shield-alt",
      gradient: "from-blue-600 via-purple-600 to-blue-800"
    }
  ];

  return (
    <div className="home-screen h-full bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 p-10">
      <div className="grid grid-cols-3 gap-6 mt-10 justify-items-center">
        {apps.map((app) => (
          <div key={app.id} className="app-container flex flex-col items-center">
            <div
              data-testid={`app-icon-${app.id}`}
              className={`app-icon w-15 h-15 rounded-xl bg-gradient-to-r ${app.gradient} flex items-center justify-center text-white text-2xl cursor-pointer transition-transform hover:scale-110 shadow-lg`}
              onClick={() => onAppSelect(app.id)}
            >
              <i className={app.icon}></i>
            </div>
            <div className="app-name text-white text-xs mt-2 text-center font-medium drop-shadow-sm">
              {app.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
