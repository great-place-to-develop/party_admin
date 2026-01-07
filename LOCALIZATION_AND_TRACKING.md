# Localization, Analytics & Feature Flags Guide

This document explains how to use internationalization (i18n), Hotjar analytics, and LaunchDarkly feature flags in the Party Admin application.

## Table of Contents

- [Localization (i18n)](#localization-i18n)
- [Hotjar Analytics](#hotjar-analytics)
- [LaunchDarkly Feature Flags](#launchdarkly-feature-flags)

---

## Localization (i18n)

The application supports multiple languages using react-i18next. Currently supported languages:
- **English** (en)
- **Spanish** (es)

### Configuration

Set the default language in your `.env` file:

```env
VITE_DEFAULT_LANGUAGE=en
```

### Using Translations in Components

Import and use the `useTranslation` hook:

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('landing.hero.title')}</h1>
      <p>{t('landing.hero.subtitle')}</p>
    </div>
  );
}
```

### Translation Files

Translation files are located in:
- `/src/locales/en/translation.json` - English translations
- `/src/locales/es/translation.json` - Spanish translations

### Adding New Translations

1. Add the key-value pair to both language files:

**en/translation.json**:
```json
{
  "myFeature": {
    "title": "My Feature",
    "description": "This is my new feature"
  }
}
```

**es/translation.json**:
```json
{
  "myFeature": {
    "title": "Mi Funcionalidad",
    "description": "Esta es mi nueva funcionalidad"
  }
}
```

2. Use in your component:
```jsx
{t('myFeature.title')}
{t('myFeature.description')}
```

### Language Switcher

The language switcher is available in the header. Users can click the language icon to switch between English and Spanish.

The selected language is automatically saved to localStorage and persists across sessions.

### Interpolation

Use interpolation for dynamic values:

**Translation file**:
```json
{
  "greeting": "Hello, {{name}}!"
}
```

**Component**:
```jsx
{t('greeting', { name: user.name })}
```

### Pluralization

Use count-based pluralization:

**Translation file**:
```json
{
  "items": "{{count}} item",
  "items_plural": "{{count}} items"
}
```

**Component**:
```jsx
{t('items', { count: 5 })} // "5 items"
{t('items', { count: 1 })} // "1 item"
```

### Adding More Languages

To add a new language:

1. Create a new translation file: `/src/locales/[lang-code]/translation.json`
2. Add the language to `src/config/i18n.config.js`:
```javascript
supportedLngs: ['en', 'es', 'fr'], // Add 'fr' for French
```
3. Add the language to the LanguageSwitcher component:
```javascript
const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];
```

---

## Hotjar Analytics

Hotjar is integrated for user behavior tracking, heatmaps, and session recordings.

### Configuration

1. Sign up for Hotjar at https://www.hotjar.com
2. Get your Hotjar Site ID
3. Add to `.env`:

```env
VITE_HOTJAR_ID=your-hotjar-id
VITE_HOTJAR_VERSION=6
```

### How It Works

Hotjar is automatically initialized when the app loads. The utility checks:
- If a Hotjar ID is configured
- If the app is NOT in development mode

In development, Hotjar is skipped to avoid polluting your analytics data.

### Identifying Users

When a user signs in with Auth0, they are automatically identified in Hotjar with their:
- User ID (from Auth0)
- Email
- Name

This happens in `App.jsx`:

```javascript
useEffect(() => {
  if (isAuthenticated && user) {
    identifyHotjarUser(user.sub, {
      email: user.email,
      name: user.name,
    });
  }
}, [isAuthenticated, user]);
```

### Triggering Custom Events

Track specific user actions:

```javascript
import { triggerHotjarEvent } from '../utils/hotjar';

function MyComponent() {
  const handleAction = () => {
    // Your logic here
    triggerHotjarEvent('custom_action_name');
  };

  return <button onClick={handleAction}>Do Something</button>;
}
```

### Tagging Recordings

Tag recordings for easy filtering:

```javascript
import { tagHotjarRecording } from '../utils/hotjar';

// Tag this user's session
tagHotjarRecording(['premium-user', 'paid-plan']);
```

### Useful Events to Track

Consider tracking these events:
- `invite_created` - When user creates an invite
- `invite_sent` - When user sends invitations
- `qr_code_generated` - When QR code is generated
- `template_selected` - When user selects a template
- `payment_completed` - If you add payment features

---

## LaunchDarkly Feature Flags

LaunchDarkly allows you to toggle features on/off without deploying new code.

### Configuration

1. Sign up for LaunchDarkly at https://launchdarkly.com
2. Create a client-side SDK key
3. Add to `.env`:

```env
VITE_LAUNCHDARKLY_CLIENT_ID=your-launchdarkly-client-id
```

### Predefined Feature Flags

The following flags are defined in `src/config/launchdarkly.config.js`:

- `enable-new-invite-builder` - Toggle new invite builder UI
- `enable-email-templates` - Enable email template customization
- `enable-sms-notifications` - Enable SMS notifications
- `enable-guest-checkin` - Enable guest check-in app
- `enable-analytics-dashboard` - Show analytics dashboard
- `enable-payment-integration` - Enable payment features
- `enable-multi-language` - Enable multi-language support
- `max-invites-per-user` - Maximum invites per user (number)
- `max-guests-per-invite` - Maximum guests per invite (number)

### Using Feature Flags

Use the `useFeatureFlag` hook:

```jsx
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { FEATURE_FLAGS } from '../config/launchdarkly.config';

function MyComponent() {
  const showNewBuilder = useFeatureFlag(FEATURE_FLAGS.ENABLE_NEW_INVITE_BUILDER);
  const maxInvites = useFeatureFlag(FEATURE_FLAGS.MAX_INVITES_PER_USER);

  return (
    <div>
      {showNewBuilder ? (
        <NewInviteBuilder />
      ) : (
        <OldInviteBuilder />
      )}
      <p>You can create up to {maxInvites} invites</p>
    </div>
  );
}
```

### Using All Flags

Get all flags at once:

```jsx
import { useFeatureFlags } from '../hooks/useFeatureFlag';

function MyComponent() {
  const flags = useFeatureFlags();

  return (
    <div>
      {flags['enable-analytics-dashboard'] && <AnalyticsDashboard />}
      {flags['enable-payment-integration'] && <PaymentForm />}
    </div>
  );
}
```

### Default Values

If LaunchDarkly is not configured, the app uses default values from `DEFAULT_FLAGS` in the config file.

This ensures the app works even without LaunchDarkly configured.

### Adding New Feature Flags

1. Add the flag to LaunchDarkly dashboard
2. Add it to `FEATURE_FLAGS` in `src/config/launchdarkly.config.js`:

```javascript
export const FEATURE_FLAGS = {
  // ... existing flags
  MY_NEW_FEATURE: 'my-new-feature',
};
```

3. Add default value to `DEFAULT_FLAGS`:

```javascript
export const DEFAULT_FLAGS = {
  // ... existing defaults
  [FEATURE_FLAGS.MY_NEW_FEATURE]: false,
};
```

4. Use in component:

```jsx
const isEnabled = useFeatureFlag(FEATURE_FLAGS.MY_NEW_FEATURE);
```

### User Targeting

LaunchDarkly automatically receives user context:
- User ID (from Auth0)
- Email
- Name
- Anonymous status

You can use this in LaunchDarkly to target specific users:
- Beta test with specific email domains
- Enable features for specific users
- A/B test different user segments

### Best Practices

1. **Always use constants**: Import `FEATURE_FLAGS` and use constants instead of strings
2. **Provide defaults**: Always set sensible defaults in `DEFAULT_FLAGS`
3. **Clean up**: Remove old flags from code after full rollout
4. **Document flags**: Add comments explaining what each flag does
5. **Test both states**: Test your app with flags both on and off

---

## Environment Variables Summary

Add these to your `.env` file:

```env
# Localization
VITE_DEFAULT_LANGUAGE=en

# Hotjar
VITE_HOTJAR_ID=your-hotjar-id
VITE_HOTJAR_VERSION=6

# LaunchDarkly
VITE_LAUNCHDARKLY_CLIENT_ID=your-launchdarkly-client-id
```

---

## Testing

### Testing Localization

1. Change language using the language switcher in the header
2. Verify all text changes to the selected language
3. Check that the language persists after page reload

### Testing Hotjar

1. Set up Hotjar ID in production environment
2. Visit the site and perform actions
3. Check Hotjar dashboard for recordings and heatmaps
4. Verify user identification works after login

### Testing Feature Flags

1. Create flags in LaunchDarkly dashboard
2. Toggle flags on/off
3. Verify app behavior changes without deployment
4. Test default values by removing LaunchDarkly ID

---

## Troubleshooting

### Translations Not Working

- Check that translation keys exist in both language files
- Verify `i18n.config.js` is imported in `App.jsx`
- Check browser console for i18next errors

### Hotjar Not Recording

- Verify `VITE_HOTJAR_ID` is set in production environment
- Check that you're not in development mode
- Allow a few minutes for data to appear in Hotjar dashboard

### Feature Flags Not Working

- Verify `VITE_LAUNCHDARKLY_CLIENT_ID` is correct
- Check LaunchDarkly dashboard that flags are created
- Verify flag keys match between code and dashboard
- Check browser console for LaunchDarkly errors

---

## Production Checklist

Before deploying to production:

- [ ] Set `VITE_DEFAULT_LANGUAGE` for your primary market
- [ ] Configure Hotjar ID for production environment
- [ ] Set up LaunchDarkly project and get production SDK key
- [ ] Test all translations thoroughly
- [ ] Create initial feature flags in LaunchDarkly
- [ ] Verify analytics tracking works
- [ ] Test language switching on all pages
- [ ] Document all active feature flags

---

## Additional Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [Hotjar Documentation](https://help.hotjar.com/)
- [LaunchDarkly React SDK](https://docs.launchdarkly.com/sdk/client-side/react/react-web)
