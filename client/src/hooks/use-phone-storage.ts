import { useState, useEffect } from "react";

// Hook for managing phone app data storage
export function usePhoneStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

// Hook for managing current user sessions across apps
export function useCurrentUser() {
  const [currentUser, setCurrentUser] = usePhoneStorage('zona_cero_current_user', null);

  const logout = () => {
    setCurrentUser(null);
    // Clear all app-specific storage
    const keysToRemove = [
      'zona_cero_current_user',
      'zona_cero_instagram_session',
      'zona_cero_tinder_session',
      'zona_cero_wallapop_session',
      'zona_cero_whatsapp_session'
    ];
    
    keysToRemove.forEach(key => {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
      }
    });
  };

  return { currentUser, setCurrentUser, logout };
}
