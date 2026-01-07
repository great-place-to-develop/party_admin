# Contributing to Party Admin

Thank you for your interest in contributing to Party Admin! This document provides guidelines and setup instructions for developers.

## Table of Contents

- [Development Setup](#development-setup)
- [TypeScript](#typescript)
- [Code Quality](#code-quality)
- [Git Workflow](#git-workflow)
- [Project Structure](#project-structure)
- [Best Practices](#best-practices)

---

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- VS Code (recommended)

### Initial Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd party_admin
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env and add your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

---

## TypeScript

This project supports both JavaScript and TypeScript. You can write new code in either language.

### TypeScript Configuration

- **tsconfig.json** - Main TypeScript configuration
- **tsconfig.node.json** - Configuration for Vite config files

### Path Aliases

TypeScript is configured with path aliases for cleaner imports:

```typescript
// Instead of:
import Button from '../../../components/common/Button';

// You can use:
import Button from '@components/common/Button';
```

Available aliases:

- `@/*` → `./src/*`
- `@components/*` → `./src/components/*`
- `@pages/*` → `./src/pages/*`
- `@services/*` → `./src/services/*`
- `@hooks/*` → `./src/hooks/*`
- `@utils/*` → `./src/utils/*`
- `@config/*` → `./src/config/*`
- `@contexts/*` → `./src/contexts/*`
- `@theme/*` → `./src/theme/*`

### Type Checking

Run TypeScript type checking without building:

```bash
npm run type-check
```

Type checking is automatically run during the build process.

---

## Code Quality

We use ESLint, Prettier, and Husky to maintain code quality.

### ESLint

ESLint checks for code quality and potential bugs.

**Run linting:**

```bash
npm run lint
```

**Auto-fix issues:**

```bash
npm run lint:fix
```

**ESLint Rules:**

- Extends recommended rules for JavaScript, TypeScript, and React
- Enforces React Hooks rules
- Warns on unused variables (prefix with `_` to ignore)
- Compatible with Prettier

### Prettier

Prettier ensures consistent code formatting.

**Format all files:**

```bash
npm run format
```

**Check formatting:**

```bash
npm run format:check
```

**Prettier Configuration (.prettierrc):**

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### Pre-commit Hooks

We use Husky and lint-staged to automatically format and lint code before commits.

**What happens on commit:**

1. Staged `.js`, `.jsx`, `.ts`, `.tsx` files are linted and formatted
2. Staged `.json`, `.css`, `.md` files are formatted
3. Commit is blocked if there are unfixable errors

**Bypass hooks (not recommended):**

```bash
git commit --no-verify
```

---

## Git Workflow

### Branch Naming

Use descriptive branch names:

- `feature/add-email-templates`
- `fix/rsvp-count-bug`
- `refactor/invite-builder-component`
- `docs/update-readme`

### Commit Messages

Write clear, descriptive commit messages:

**Good commits:**

```
Add email template customization feature
Fix RSVP count calculation bug
Refactor InviteBuilder to use TypeScript
Update API documentation for invites endpoint
```

**Bad commits:**

```
fix
update
changes
wip
```

**Commit message format:**

```
<type>: <subject>

<body (optional)>
```

Types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`

### Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass and code is linted
4. Push your branch
5. Create a pull request with a clear description
6. Request review from team members
7. Address review feedback
8. Merge after approval

---

## Project Structure

```
party_admin/
├── .husky/              # Git hooks
├── .vscode/             # VS Code settings and extensions
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Generic components (Button, Input, etc.)
│   │   ├── layout/      # Layout components (Header, Sidebar, etc.)
│   │   └── ads/         # Advertisement components
│   ├── pages/           # Page components (routing)
│   ├── features/        # Feature-specific components
│   │   ├── invites/     # Invite-related components
│   │   ├── invite-builder/  # Drag & drop builder
│   │   └── things-to-know/  # Event info management
│   ├── services/        # API service layers
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── config/          # Configuration files
│   ├── contexts/        # React contexts
│   ├── theme/           # MUI theme configuration
│   ├── locales/         # Translation files (i18n)
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.js       # Vite configuration
```

---

## Best Practices

### React Components

**Use functional components:**

```jsx
// Good
export const MyComponent = ({ title }) => {
  return <h1>{title}</h1>;
};

// Avoid
export class MyComponent extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}
```

**Extract reusable logic into custom hooks:**

```jsx
// hooks/useInvites.js
export const useInvites = () => {
  const [invites, setInvites] = useState([]);
  // ... logic
  return { invites, loading, error };
};

// In component
const { invites, loading } = useInvites();
```

**Keep components small and focused:**

- One component per file
- Single responsibility principle
- Extract complex logic into separate functions

### State Management

**Use local state when possible:**

```jsx
const [isOpen, setIsOpen] = useState(false);
```

**Use contexts for global state:**

```jsx
// contexts/ThemeContext.jsx
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
```

### API Calls

**Use the API service layer:**

```javascript
// services/invites.service.js
import apiService from './api.service';

class InvitesService {
  async getInvites() {
    return apiService.get('/invites');
  }
}

export default new InvitesService();
```

**Handle errors gracefully:**

```jsx
try {
  const data = await invitesService.getInvites();
  setInvites(data.invites);
} catch (error) {
  console.error('Error loading invites:', error);
  setError('Failed to load invites');
}
```

### Performance

**Memoize expensive calculations:**

```jsx
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);
```

**Prevent unnecessary re-renders:**

```jsx
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

**Use lazy loading for routes:**

```jsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

### Accessibility

**Use semantic HTML:**

```jsx
// Good
<button onClick={handleClick}>Click me</button>

// Avoid
<div onClick={handleClick}>Click me</div>
```

**Add ARIA labels:**

```jsx
<button aria-label="Close dialog" onClick={handleClose}>
  <CloseIcon />
</button>
```

**Ensure keyboard navigation:**

```jsx
<div role="button" tabIndex={0} onClick={handleClick} onKeyPress={handleKeyPress}>
  Click me
</div>
```

### Internationalization

**Always use translation keys:**

```jsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
return <h1>{t('landing.hero.title')}</h1>;
```

**Never hardcode text:**

```jsx
// Bad
<button>Save</button>

// Good
<button>{t('common.save')}</button>
```

### Testing (Future)

When tests are added, follow these guidelines:

- Write tests for all new features
- Test user interactions, not implementation details
- Aim for high coverage on critical paths
- Use descriptive test names

---

## VS Code Setup

### Recommended Extensions

When you open the project in VS Code, you'll be prompted to install recommended extensions:

- **ESLint** - Linting support
- **Prettier** - Code formatting
- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **Path Intellisense** - Autocomplete for file paths
- **Error Lens** - Inline error messages
- **TypeScript** - Enhanced TypeScript support

### Shortcuts

- `Cmd/Ctrl + Shift + P` → Command palette
- `Cmd/Ctrl + P` → Quick file open
- `F2` → Rename symbol
- `F12` → Go to definition
- `Alt + Shift + F` → Format document

### Settings

The project includes `.vscode/settings.json` with:

- Format on save enabled
- ESLint auto-fix on save
- Consistent formatting rules
- TypeScript workspace version

---

## Debugging

### Browser Debugging

1. Open Chrome DevTools
2. Go to Sources tab
3. Find your file in `webpack://`
4. Set breakpoints
5. Trigger the code

### VS Code Debugging

1. Press `F5` or go to Run & Debug
2. Select "Launch Chrome against localhost"
3. Set breakpoints in VS Code
4. Debug directly in the editor

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint errors
npm run format          # Format all files
npm run format:check    # Check formatting
npm run type-check      # Run TypeScript checks

# Git
git add .
git commit -m "message"  # Runs pre-commit hooks
git push
```

---

## Troubleshooting

### ESLint errors on save

1. Ensure ESLint extension is installed
2. Check `.vscode/settings.json` is present
3. Reload VS Code window

### TypeScript errors

1. Run `npm run type-check` to see all errors
2. Check `tsconfig.json` configuration
3. Ensure `@types/*` packages are installed

### Git hooks not running

1. Ensure Husky is installed: `npm run prepare`
2. Check `.husky/pre-commit` has execute permissions
3. Try `git commit` (not through GUI)

### Format conflicts between ESLint and Prettier

This shouldn't happen as we use `eslint-config-prettier`, but if it does:

1. Run `npm run format` first
2. Then run `npm run lint:fix`
3. Report the conflict so we can fix the config

---

## Getting Help

- Check existing documentation (README.md, API_SPECIFICATION.md, etc.)
- Review code examples in the codebase
- Ask questions in team chat
- Create an issue for bugs or feature requests

---

## Code Review Guidelines

When reviewing code:

- Be constructive and respectful
- Focus on the code, not the person
- Explain why, not just what
- Suggest improvements
- Approve if minor changes needed
- Request changes if major issues

When receiving reviews:

- Don't take it personally
- Ask for clarification if needed
- Implement feedback
- Thank reviewers
- Learn from the feedback

---

Thank you for contributing to Party Admin! 🎉
