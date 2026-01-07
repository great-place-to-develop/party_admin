import { useFlags } from 'launchdarkly-react-client-sdk';
import { DEFAULT_FLAGS } from '../config/launchdarkly.config';

/**
 * Custom hook to access feature flags
 *
 * This hook provides a fallback to default values when LaunchDarkly is not configured.
 * Usage: const isNewBuilderEnabled = useFeatureFlag('enable-new-invite-builder');
 */
export const useFeatureFlag = (flagKey, defaultValue = null) => {
  try {
    const flags = useFlags();
    return flags[flagKey] !== undefined ? flags[flagKey] : (DEFAULT_FLAGS[flagKey] ?? defaultValue);
  } catch (error) {
    // If LaunchDarkly is not initialized, use default values
    return DEFAULT_FLAGS[flagKey] ?? defaultValue;
  }
};

/**
 * Custom hook to access all feature flags
 *
 * Usage: const flags = useFeatureFlags();
 */
export const useFeatureFlags = () => {
  try {
    const flags = useFlags();
    return { ...DEFAULT_FLAGS, ...flags };
  } catch (error) {
    // If LaunchDarkly is not initialized, use default values
    return DEFAULT_FLAGS;
  }
};
