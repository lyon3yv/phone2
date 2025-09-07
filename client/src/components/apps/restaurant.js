import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.js';
import { Button } from '../ui/button.js';
import { Badge } from '../ui/badge.js';
import { Star, MapPin, Clock, Phone } from 'lucide-react';

export default function RestaurantApp() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants');
      if (response.ok) {
        const data = await response.json();
        setRestaurants(data);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const RestaurantCard = ({ restaurant }) => (
    <Card className="mb-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedRestaurant(restaurant)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{restaurant.name}</h3>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            {restaurant.rating || 4.5}
          </Badge>
        </div>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{restaurant.address || '123 Main St, City'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{restaurant.hours || '9:00 AM - 10:00 PM'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{restaurant.phone || '(555) 123-4567'}</span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-700">{restaurant.description || 'Delicious food and great atmosphere'}</p>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {restaurant.cuisine?.split(',').map((cuisine, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {cuisine.trim()}
            </Badge>
          )) || (
            <Badge variant="outline" className="text-xs">Italian</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const RestaurantDetail = ({ restaurant }) => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => setSelectedRestaurant(null)}
        className="mb-4"
      >
        ← Back to Restaurants
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-start">
            <span>{restaurant.name}</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              {restaurant.rating || 4.5}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{restaurant.address || '123 Main St, City'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{restaurant.hours || '9:00 AM - 10:00 PM'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{restaurant.phone || '(555) 123-4567'}</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Menu Highlights</h4>
              <ul className="text-sm space-y-1">
                <li>• Pasta Carbonara - $18.99</li>
                <li>• Margherita Pizza - $15.99</li>
                <li>• Tiramisu - $8.99</li>
                <li>• Wine Selection - $12.99</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <p className="text-sm text-gray-700">
              {restaurant.description || 'A cozy Italian restaurant serving authentic dishes made with fresh, local ingredients. Perfect for family dinners, date nights, or casual gatherings.'}
            </p>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">
              Call Now
            </Button>
            <Button variant="outline" className="flex-1">
              Get Directions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center">Loading restaurants...</div>
      </div>
    );
  }

  return (
    <div className="restaurant-app h-full bg-gray-50 p-4 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">🍽️ Restaurants</h1>

        {selectedRestaurant ? (
          <RestaurantDetail restaurant={selectedRestaurant} />
        ) : (
          <div>
            {restaurants.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🍽️</div>
                  <h3 className="text-lg font-semibold mb-2">No restaurants found</h3>
                  <p className="text-gray-600">Check back later for restaurant listings.</p>
                </CardContent>
              </Card>
            ) : (
              restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
