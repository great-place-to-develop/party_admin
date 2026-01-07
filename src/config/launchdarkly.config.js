export const launchDarklyConfig = {
  clientSideID: import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID || '',
  options: {
    bootstrap: 'localStorage',
  },
};

/**
 * Feature Flags
 *
 * Define your feature flags here for easy reference throughout the app.
 * These should match the keys in your LaunchDarkly dashboard.
 */
export const FEATURE_FLAGS = {
  // Example feature flags
  ENABLE_NEW_INVITE_BUILDER: 'enable-new-invite-builder',
  ENABLE_EMAIL_TEMPLATES: 'enable-email-templates',
  ENABLE_SMS_NOTIFICATIONS: 'enable-sms-notifications',
  ENABLE_GUEST_CHECKIN: 'enable-guest-checkin',
  ENABLE_ANALYTICS_DASHBOARD: 'enable-analytics-dashboard',
  ENABLE_PAYMENT_INTEGRATION: 'enable-payment-integration',
  ENABLE_MULTI_LANGUAGE: 'enable-multi-language',
  MAX_INVITES_PER_USER: 'max-invites-per-user',
  MAX_GUESTS_PER_INVITE: 'max-guests-per-invite',
};

/**
 * Default flag values
 * Used when LaunchDarkly is not configured or in development
 */
export const DEFAULT_FLAGS = {
  [FEATURE_FLAGS.ENABLE_NEW_INVITE_BUILDER]: false,
  [FEATURE_FLAGS.ENABLE_EMAIL_TEMPLATES]: false,
  [FEATURE_FLAGS.ENABLE_SMS_NOTIFICATIONS]: false,
  [FEATURE_FLAGS.ENABLE_GUEST_CHECKIN]: false,
  [FEATURE_FLAGS.ENABLE_ANALYTICS_DASHBOARD]: false,
  [FEATURE_FLAGS.ENABLE_PAYMENT_INTEGRATION]: false,
  [FEATURE_FLAGS.ENABLE_MULTI_LANGUAGE]: true,
  [FEATURE_FLAGS.MAX_INVITES_PER_USER]: 50,
  [FEATURE_FLAGS.MAX_GUESTS_PER_INVITE]: 500,
};
