# Party Admin - Event Invitation Platform

A modern, SEO-optimized web application for creating beautiful party invitations, managing guest lists, and tracking RSVPs. Built with React, Material-UI, and Auth0.

## Features

### 🎨 Custom Invite Designer
- Drag-and-drop invite builder
- Pre-built templates and custom designs
- Customizable colors, fonts, and layouts
- Real-time preview

### 📧 Invite Management
- Send invitations via email
- Generate QR codes for quick RSVP
- Shareable URLs for easy distribution
- Track RSVPs in real-time

### 📊 Guest Management
- Monitor confirmed, pending, and declined RSVPs
- Manage seat allocations
- Send reminders and updates

### ℹ️ Event Information Hub
- Share hotels, restaurants, and attractions
- Transportation and parking information
- Organized by categories
- Easy to update and manage

### 💰 Ad Integration
- Google AdSense ready
- Non-intrusive ad placements
- Helps keep the platform free

### 🔍 SEO Optimized
- Server-side meta tags
- Structured data for search engines
- Optimized for discovery

## Tech Stack

- **Frontend**: React 19
- **UI Framework**: Material-UI (MUI) v7
- **Routing**: React Router v7
- **Authentication**: Auth0
- **Drag & Drop**: @dnd-kit
- **QR Codes**: qrcode.react
- **Build Tool**: Vite
- **HTTP Client**: Axios

## Prerequisites

- Node.js 18+ and npm
- Auth0 account (free tier available)
- Backend API (see API_SPECIFICATION.md)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd party_admin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-audience

# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api

# Google AdSense (optional - for production)
VITE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
```

### 4. Set up Auth0

1. Create a new Auth0 application (Single Page Application)
2. Configure the following settings:
   - **Allowed Callback URLs**: `http://localhost:5173`
   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`
3. Copy your Domain and Client ID to the `.env` file

### 5. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
party_admin/
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/          # Common UI components
│   │   ├── layout/          # Layout components (Header, Sidebar, etc.)
│   │   └── ads/             # Ad components
│   ├── pages/               # Page components
│   ├── features/            # Feature-specific components
│   │   ├── invites/         # Invite-related components
│   │   ├── invite-builder/  # Drag & drop builder
│   │   └── things-to-know/  # Event info management
│   ├── services/            # API services
│   ├── contexts/            # React contexts
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utility functions
│   ├── config/              # Configuration files
│   ├── theme/               # MUI theme
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── API_SPECIFICATION.md     # Backend API specification
└── README.md
```

## Backend Integration

This frontend app requires a backend API. See `API_SPECIFICATION.md` for complete API documentation including:

- Authentication with Auth0
- All required endpoints
- Data models and schemas
- Error handling
- Rate limiting
- Email templates

The backend should implement all endpoints specified in the API documentation.

## Features Breakdown

### Landing Page
- SEO-optimized with meta tags and structured data
- Feature showcase
- Call-to-action sections
- Responsive design

### Dashboard
- Overview of all invites
- Quick statistics
- Recent activity
- Quick actions

### Invite Builder
- Drag-and-drop interface
- Component palette (text, images, dates, etc.)
- Design customization panel
- Real-time preview
- Save and publish

### Invite Management
- List all invites
- Filter and search
- View detailed statistics
- Generate QR codes
- Send email invitations
- Track RSVPs

### Things to Know
- Categorized information (hotels, restaurants, etc.)
- Easy CRUD operations
- Drag to reorder
- Rich information fields

## Authentication Flow

1. User clicks "Sign In" on landing page
2. Redirects to Auth0 login
3. Auth0 authenticates and returns to app
4. Frontend receives JWT token
5. Token included in all API requests
6. Backend validates token with Auth0

## Ad Integration

The app includes placeholder components for Google AdSense:

1. Sign up for Google AdSense
2. Get your publisher ID
3. Add it to `.env` as `VITE_ADSENSE_CLIENT_ID`
4. Add AdSense script to `index.html`
5. Ads will automatically appear in designated areas

## Deployment

### Frontend Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Any static hosting service

3. Update Auth0 settings with production URLs

4. Set production environment variables

### Environment Variables for Production

Make sure to set these in your hosting platform:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-prod-client-id
VITE_AUTH0_AUDIENCE=your-api-audience
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
```

## SEO Optimization

The app includes several SEO features:

- **Meta Tags**: Comprehensive meta tags for search engines and social media
- **Structured Data**: Schema.org markup for rich snippets
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Open Graph**: Facebook and social media preview optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Sitemap**: Generate a sitemap for search engines (recommended)
- **robots.txt**: Configure search engine crawling

### Recommended SEO Enhancements

1. Add `sitemap.xml` to the public folder
2. Add `robots.txt` to the public folder
3. Set up Google Search Console
4. Set up Google Analytics
5. Optimize images with alt text and proper formats
6. Use descriptive URLs
7. Ensure fast load times (already optimized with Vite)

## Performance Optimization

The app is optimized for performance:

- **Code Splitting**: Automatic with Vite
- **Lazy Loading**: Routes can be lazy loaded
- **Image Optimization**: Use WebP and responsive images
- **Bundle Size**: Minimal dependencies
- **Caching**: Browser caching headers
- **CDN**: Use a CDN for static assets

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

[Add your license here]

## Support

For questions or issues:
- Check the API_SPECIFICATION.md for backend integration
- Review the code in `/src/services` for API usage examples
- Contact the development team

## Roadmap

Future enhancements:
- [ ] Email template customization
- [ ] SMS notifications
- [ ] Guest check-in app
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Payment integration for paid events
- [ ] Calendar sync (Google Calendar, iCal)
- [ ] Advanced RSVP forms with custom fields
- [ ] Photo gallery for events

## Acknowledgments

Built with:
- React
- Material-UI
- Auth0
- Vite
- And many other amazing open-source libraries

---

Made with ❤️ for event planners everywhere
