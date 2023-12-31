import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n';
import './_metronic/assets/fonticon/fonticon.css';
import './_metronic/assets/keenicons/duotone/style.css';
import './_metronic/assets/keenicons/outline/style.css';
import './_metronic/assets/keenicons/solid/style.css';
import './_metronic/assets/sass/style.scss';
import './_metronic/assets/sass/plugins.scss';
import './_metronic/assets/sass/style.react.scss';
import { AppRoutes } from './app/routing/AppRoutes';
import { AuthProvider, setupAxios } from './app/modules/auth';

// Function to check internet connection
const checkInternetConnection = () => {
  return navigator.onLine;
};

const App = () => {
  const [isOnline, setIsOnline] = useState(checkInternetConnection());
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  

  const handleConnectionChange = () => {
    setIsOnline(checkInternetConnection());
    if (navigator.onLine) {
      setShowOnlineMessage(true);
      setTimeout(() => {
        setShowOnlineMessage(false);
      }, 2000); // Show message for 2 seconds
    }
  };

  useEffect(() => {
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MetronicI18nProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </MetronicI18nProvider>
      {!isOnline && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'red',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          Internet connection is lost.
        </div>
      )}
      {showOnlineMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'green',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          You're back online!
        </div>
      )}
    </QueryClientProvider>
  );
};

Chart.register(...registerables);

const queryClient = new QueryClient();
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
