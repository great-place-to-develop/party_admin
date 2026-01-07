import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth0 } from '@auth0/auth0-react';
import { Auth0ProviderWithHistory } from './contexts/Auth0ProviderWithHistory';
import { LaunchDarklyProvider } from './contexts/LaunchDarklyProvider';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import theme from './theme/theme';
import './config/i18n.config';
import { initializeHotjar, identifyHotjarUser } from './utils/hotjar';

// Pages
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { InvitesList } from './pages/InvitesList';
import { InviteBuilder } from './pages/InviteBuilder';
import { InviteDetails } from './pages/InviteDetails';

function AppRoutes() {
  const { user, isAuthenticated } = useAuth0();

  // Initialize Hotjar and identify user
  useEffect(() => {
    initializeHotjar();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      identifyHotjarUser(user.sub, {
        email: user.email,
        name: user.name,
      });
    }
  }, [isAuthenticated, user]);

  return (
    <LaunchDarklyProvider user={user}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invites"
          element={
            <ProtectedRoute>
              <InvitesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-invite"
          element={
            <ProtectedRoute>
              <InviteBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invites/:id"
          element={
            <ProtectedRoute>
              <InviteDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invites/:id/edit"
          element={
            <ProtectedRoute>
              <InviteBuilder />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LaunchDarklyProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Auth0ProviderWithHistory>
            <AppRoutes />
          </Auth0ProviderWithHistory>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
