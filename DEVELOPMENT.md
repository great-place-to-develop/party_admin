# Development Quick Reference

Quick reference for common development tasks.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## Common Commands

### Development

```bash
npm run dev              # Start dev server with hot reload
npm run type-check       # Check TypeScript types without building
```

### Building

```bash
npm run build           # Type check + build for production
npm run preview         # Preview production build locally
```

### Code Quality

```bash
npm run lint            # Check for linting errors
npm run lint:fix        # Auto-fix linting errors
npm run format          # Format all code with Prettier
npm run format:check    # Check if code is formatted
```

## File Naming Conventions

- **Components**: PascalCase - `UserProfile.jsx`, `InviteCard.tsx`
- **Hooks**: camelCase with 'use' prefix - `useInvites.js`, `useAuth.ts`
- **Utils**: camelCase - `formatDate.js`, `validation.ts`
- **Services**: camelCase with '.service' - `invites.service.js`, `api.service.ts`
- **Constants**: UPPER_SNAKE_CASE - `API_ENDPOINTS.js`, `FEATURE_FLAGS.ts`

## Import Order

Follow this order for imports:

```javascript
// 1. External dependencies
import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

// 2. Internal dependencies (using path aliases)
import { UserProfile } from '@components/UserProfile';
import { useAuth } from '@hooks/useAuth';
import { formatDate } from '@utils/formatDate';

// 3. Relative imports
import { LocalComponent } from './LocalComponent';

// 4. Types (if TypeScript)
import type { User } from '@/types';

// 5. Styles
import './styles.css';
```

## TypeScript Tips

### Optional Usage

TypeScript is optional. You can use `.jsx` or `.tsx` - both work!

### Type Imports

```typescript
import type { User } from '@/types';
// or
import { type User } from '@/types';
```

### Prop Types

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button = ({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) => {
  // ...
};
```

### Path Aliases

```typescript
// Instead of:
import Button from '../../../components/Button';

// Use:
import Button from '@components/Button';
```

## ESLint & Prettier

### Disable Rules (use sparingly)

**For a line:**

```javascript
// eslint-disable-next-line no-console
console.log('debug info');
```

**For a file:**

```javascript
/* eslint-disable no-console */
// File content...
/* eslint-enable no-console */
```

**Ignore unused variables:**

```javascript
const [_unused, setUsed] = useState();
```

### Prettier Ignore

**For a block:**

```javascript
// prettier-ignore
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
```

## Git Workflow

### Daily Workflow

```bash
# 1. Start new feature
git checkout main
git pull
git checkout -b feature/my-feature

# 2. Make changes
# ... code changes ...

# 3. Stage and commit (pre-commit hooks run automatically)
git add .
git commit -m "Add my feature"

# 4. Push to remote
git push -u origin feature/my-feature

# 5. Create pull request on GitHub
```

### Pre-commit Hooks

Hooks run automatically on `git commit`. They:

- Lint and auto-fix JavaScript/TypeScript files
- Format all staged files
- Prevent commit if unfixable errors exist

**Skip hooks (not recommended):**

```bash
git commit --no-verify -m "message"
```

## Debugging

### Console Logging

```javascript
console.log('Simple log');
console.warn('Warning');
console.error('Error');
console.table({ key: 'value' }); // Nice table format
console.group('Group name');
console.log('Grouped item');
console.groupEnd();
```

### React DevTools

1. Install React DevTools browser extension
2. Open DevTools
3. Go to "Components" or "Profiler" tab

### VS Code Debugging

1. Set breakpoint in code (click left of line number)
2. Press `F5`
3. Select "Launch Chrome against localhost"
4. Interact with app to hit breakpoint

### Network Debugging

```javascript
// In api.service.js
console.log('Request:', config);
console.log('Response:', response);
```

## Common Tasks

### Add New Page

1. Create component in `src/pages/MyPage.jsx`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/layout/Sidebar.jsx`

### Add Translation

1. Edit `src/locales/en/translation.json`
2. Edit `src/locales/es/translation.json`
3. Use in component: `{t('my.new.key')}`

### Add API Endpoint

1. Add method to service in `src/services/`
2. Call from component using async/await
3. Handle loading and error states

### Add Feature Flag

1. Add flag to `src/config/launchdarkly.config.js`
2. Add default value to `DEFAULT_FLAGS`
3. Use in component: `useFeatureFlag(FEATURE_FLAGS.MY_FLAG)`

### Add Custom Hook

1. Create file in `src/hooks/useMyHook.js`
2. Export hook function
3. Use in components

```javascript
// src/hooks/useMyHook.js
export const useMyHook = () => {
  const [data, setData] = useState(null);
  // ... logic
  return { data };
};

// In component
const { data } = useMyHook();
```

## Performance Tips

### Avoid Re-renders

```javascript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // ...
});

// Use useMemo for expensive calculations
const result = useMemo(() => expensiveCalculation(data), [data]);

// Use useCallback for function props
const handleClick = useCallback(() => {
  // ...
}, [dependency]);
```

### Code Splitting

```javascript
// Lazy load routes
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Use in route
<Route
  path="/dashboard"
  element={
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  }
/>;
```

## Environment Variables

### Adding New Variable

1. Add to `.env.example` with placeholder
2. Add to your local `.env` with real value
3. Access in code: `import.meta.env.VITE_MY_VAR`

**Important:** Only variables prefixed with `VITE_` are exposed to the app!

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill
# or
npx kill-port 5173
```

### Clear Cache

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Reset Git Hooks

```bash
rm -rf .husky
npm run prepare
```

### ESLint Not Working in VS Code

1. Reload VS Code window
2. Check ESLint extension is installed
3. Check `.vscode/settings.json` exists

## Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Material-UI Docs](https://mui.com)
- [Vite Guide](https://vitejs.dev)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## Getting Help

1. Check this guide
2. Check [CONTRIBUTING.md](./CONTRIBUTING.md)
3. Check [README.md](./README.md)
4. Search codebase for examples
5. Ask team members
6. Create an issue on GitHub
