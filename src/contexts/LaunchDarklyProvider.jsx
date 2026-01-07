import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import { useState, useEffect } from 'react';
import { launchDarklyConfig, DEFAULT_FLAGS } from '../config/launchdarkly.config';

/**
 * LaunchDarkly Provider Wrapper
 *
 * This component initializes LaunchDarkly with the user context.
 * If LaunchDarkly is not configured, it falls back to default values.
 */

let LDProvider = null;

export const LaunchDarklyProvider = ({ children, user }) => {
  const [ldProvider, setLdProvider] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeLaunchDarkly = async () => {
      // Skip if no client ID is configured
      if (!launchDarklyConfig.clientSideID) {
        console.log('LaunchDarkly: Not configured, using default flags');
        return;
      }

      try {
        // Create user context for LaunchDarkly
        const ldUser = {
          key: user?.id || 'anonymous',
          email: user?.email,
          name: user?.name,
          anonymous: !user?.id,
        };

        // Initialize LaunchDarkly provider
        const Provider = await asyncWithLDProvider({
          clientSideID: launchDarklyConfig.clientSideID,
          context: ldUser,
          options: launchDarklyConfig.options,
        });

        setLdProvider(() => Provider);
        console.log('LaunchDarkly: Initialized successfully');
      } catch (err) {
        console.error('LaunchDarkly initialization error:', err);
        setError(err);
      }
    };

    initializeLaunchDarkly();
  }, [user]);

  // If LaunchDarkly is not configured or failed, render children directly
  if (!launchDarklyConfig.clientSideID || error) {
    return <>{children}</>;
  }

  // If still initializing, show children (they'll use default flags)
  if (!ldProvider) {
    return <>{children}</>;
  }

  // Render with LaunchDarkly provider
  const Provider = ldProvider;
  return <Provider>{children}</Provider>;
};
