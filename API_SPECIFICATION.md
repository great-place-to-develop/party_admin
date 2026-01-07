# Party Admin - Backend API Specification

## Overview

This document provides the complete API specification for the Party Admin backend. The frontend is built with React and Auth0 authentication. The backend should implement these endpoints to support all features.

## Base URL

```
Production: https://api.partyadmin.com/api
Development: http://localhost:3001/api
```

## Authentication

All authenticated endpoints require a Bearer token from Auth0 in the Authorization header:

```
Authorization: Bearer <auth0_token>
```

### Auth0 Configuration

- **Provider**: Auth0
- **Token Type**: JWT
- **Validation**: Backend must validate Auth0 JWT tokens
- **User Identification**: Extract user ID from token's `sub` claim
- **Scopes**: `openid profile email`

### User Model

```typescript
interface User {
  id: string;
  auth0Id: string; // From Auth0 'sub' claim
  email: string;
  name: string;
  picture?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Data Models

### Invite

```typescript
interface Invite {
  id: string;
  userId: string;
  eventName: string;
  eventDate: Date;
  eventTime?: string;
  location: string;
  description?: string;
  maxSeats: number;
  confirmedSeats: number;
  pendingSeats: number;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  design: InviteDesign;
  publicToken: string; // Unique token for public access
  createdAt: Date;
  updatedAt: Date;
}

interface InviteDesign {
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  fontFamily: string;
  components: DesignComponent[];
}

interface DesignComponent {
  id: string;
  type: 'title' | 'text' | 'image' | 'date' | 'location';
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: string;
  style: Record<string, any>;
}
```

### RSVP

```typescript
interface RSVP {
  id: string;
  inviteId: string;
  guestName: string;
  guestEmail: string;
  status: 'confirmed' | 'declined' | 'pending';
  requestedSeats: number;
  confirmedSeats: number;
  message?: string;
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### ThingToKnow

```typescript
interface ThingToKnow {
  id: string;
  inviteId: string;
  category: 'hotels' | 'restaurants' | 'attractions' | 'transportation' | 'other';
  title: string;
  description: string;
  address?: string;
  website?: string;
  phone?: string;
  imageUrl?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Template

```typescript
interface Template {
  id: string;
  userId?: string; // null for public templates
  name: string;
  type: 'public' | 'user';
  design: InviteDesign;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### Authentication Endpoints

#### Create/Get User Profile
```
POST /auth/profile
```

**Description**: Create or retrieve user profile based on Auth0 token

**Headers**:
```
Authorization: Bearer <auth0_token>
```

**Request Body**: None (extract from token)

**Response**: `200 OK`
```json
{
  "user": {
    "id": "user_123",
    "auth0Id": "auth0|123456",
    "email": "user@example.com",
    "name": "John Doe",
    "picture": "https://...",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z"
  }
}
```

---

### Invite Endpoints

#### Get All Invites
```
GET /invites
```

**Authentication**: Required

**Query Parameters**:
- `status` (optional): Filter by status
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset

**Response**: `200 OK`
```json
{
  "invites": [Invite[]],
  "total": 25,
  "limit": 50,
  "offset": 0
}
```

---

#### Get Single Invite
```
GET /invites/:id
```

**Authentication**: Required

**Response**: `200 OK`
```json
{
  "invite": Invite
}
```

**Error Responses**:
- `404 Not Found`: Invite not found
- `403 Forbidden`: User doesn't own this invite

---

#### Create Invite
```
POST /invites
```

**Authentication**: Required

**Request Body**:
```json
{
  "eventName": "Summer Party 2026",
  "eventDate": "2026-07-15",
  "eventTime": "18:00",
  "location": "123 Party Street",
  "description": "Join us!",
  "maxSeats": 100,
  "design": InviteDesign
}
```

**Response**: `201 Created`
```json
{
  "invite": Invite
}
```

**Validation**:
- `eventName`: Required, min 1 char, max 200 chars
- `eventDate`: Required, must be valid date
- `maxSeats`: Required, must be > 0
- Auto-generate unique `publicToken`

---

#### Update Invite
```
PUT /invites/:id
```

**Authentication**: Required

**Request Body**: Partial<Invite>

**Response**: `200 OK`
```json
{
  "invite": Invite
}
```

**Error Responses**:
- `404 Not Found`: Invite not found
- `403 Forbidden`: User doesn't own this invite

---

#### Delete Invite
```
DELETE /invites/:id
```

**Authentication**: Required

**Response**: `200 OK`
```json
{
  "success": true
}
```

**Note**: Should also delete all associated RSVPs and ThingsToKnow

---

#### Send Invites
```
POST /invites/:id/send
```

**Authentication**: Required

**Request Body**:
```json
{
  "recipients": [
    {
      "email": "guest@example.com",
      "name": "Guest Name"
    }
  ]
}
```

**Response**: `200 OK`
```json
{
  "sent": 5,
  "failed": [
    {
      "email": "invalid@email",
      "error": "Invalid email"
    }
  ]
}
```

**Implementation Notes**:
- Send email with invite link containing publicToken
- Create pending RSVP for each recipient
- Email should include QR code and direct link
- Rate limit: Max 100 emails per invite per hour

---

#### Generate QR Code
```
GET /invites/:id/qr
```

**Authentication**: Required

**Response**: `200 OK`
```json
{
  "qrCodeUrl": "https://...",
  "inviteUrl": "https://partyadmin.com/rsvp/abc123"
}
```

---

#### Get Invite Statistics
```
GET /invites/:id/stats
```

**Authentication**: Required

**Response**: `200 OK`
```json
{
  "totalSeats": 100,
  "confirmedSeats": 45,
  "pendingSeats": 12,
  "declinedSeats": 3,
  "availableSeats": 55,
  "totalViews": 234,
  "uniqueViews": 123
}
```

---

### Public Invite Endpoints (No Authentication)

#### Get Public Invite
```
GET /invites/public/:token
```

**Authentication**: None

**Response**: `200 OK`
```json
{
  "invite": {
    "id": "invite_123",
    "eventName": "Summer Party",
    "eventDate": "2026-07-15",
    "eventTime": "18:00",
    "location": "123 Party Street",
    "description": "Join us!",
    "design": InviteDesign,
    "thingsToKnow": ThingToKnow[]
  }
}
```

**Note**: Don't expose userId, maxSeats, or RSVP details

---

#### RSVP to Invite
```
POST /invites/public/:token/rsvp
```

**Authentication**: None

**Request Body**:
```json
{
  "guestName": "John Doe",
  "guestEmail": "john@example.com",
  "status": "confirmed",
  "requestedSeats": 2,
  "message": "Looking forward to it!"
}
```

**Response**: `200 OK`
```json
{
  "rsvp": RSVP
}
```

**Validation**:
- Check available seats
- Validate email format
- Prevent duplicate RSVPs (by email)
- Send confirmation email to guest

---

### RSVP Management Endpoints

#### Get All RSVPs for Invite
```
GET /invites/:id/rsvps
```

**Authentication**: Required

**Response**: `200 OK`
```json
{
  "rsvps": RSVP[]
}
```

---

#### Update RSVP Status
```
PATCH /invites/:inviteId/rsvps/:rsvpId
```

**Authentication**: Required

**Request Body**:
```json
{
  "status": "confirmed",
  "confirmedSeats": 2
}
```

**Response**: `200 OK`
```json
{
  "rsvp": RSVP
}
```

**Note**: Update invite's seat counts accordingly

---

### Things To Know Endpoints

#### Get All Items
```
GET /invites/:inviteId/things-to-know
```

**Authentication**: Required for owner, Public with token

**Query Parameters**:
- `category` (optional): Filter by category

**Response**: `200 OK`
```json
{
  "items": ThingToKnow[]
}
```

---

#### Create Item
```
POST /invites/:inviteId/things-to-know
```

**Authentication**: Required

**Request Body**:
```json
{
  "category": "hotels",
  "title": "Grand Hotel",
  "description": "Luxury hotel near venue",
  "address": "456 Hotel Ave",
  "website": "https://grandhotel.com",
  "phone": "+1-555-0123"
}
```

**Response**: `201 Created`
```json
{
  "item": ThingToKnow
}
```

---

#### Update Item
```
PUT /invites/:inviteId/things-to-know/:itemId
```

**Authentication**: Required

**Request Body**: Partial<ThingToKnow>

**Response**: `200 OK`
```json
{
  "item": ThingToKnow
}
```

---

#### Delete Item
```
DELETE /invites/:inviteId/things-to-know/:itemId
```

**Authentication**: Required

**Response**: `200 OK`
```json
{
  "success": true
}
```

---

#### Reorder Items
```
PATCH /invites/:inviteId/things-to-know/reorder
```

**Authentication**: Required

**Request Body**:
```json
{
  "items": [
    { "id": "item_1", "order": 0 },
    { "id": "item_2", "order": 1 }
  ]
}
```

**Response**: `200 OK`
```json
{
  "success": true
}
```

---

### Template Endpoints

#### Get All Templates
```
GET /templates
```

**Authentication**: Required

**Query Parameters**:
- `type`: 'public' | 'user' (default: 'public')

**Response**: `200 OK`
```json
{
  "templates": Template[]
}
```

---

#### Get Single Template
```
GET /templates/:id
```

**Authentication**: Required

**Response**: `200 OK`
```json
{
  "template": Template
}
```

---

#### Save Custom Template
```
POST /templates
```

**Authentication**: Required

**Request Body**:
```json
{
  "name": "My Custom Template",
  "design": InviteDesign,
  "thumbnail": "data:image/png;base64,..."
}
```

**Response**: `201 Created`
```json
{
  "template": Template
}
```

---

#### Update Template
```
PUT /templates/:id
```

**Authentication**: Required

**Request Body**: Partial<Template>

**Response**: `200 OK`
```json
{
  "template": Template
}
```

---

#### Delete Template
```
DELETE /templates/:id
```

**Authentication**: Required

**Response**: `200 OK`
```json
{
  "success": true
}
```

**Note**: Can only delete user templates, not public ones

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Common Error Codes

- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid auth token
- `403 Forbidden`: User doesn't have permission
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (e.g., duplicate RSVP)
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

---

## Database Considerations

### Indexes

Recommended indexes for performance:

```sql
-- Users
CREATE INDEX idx_users_auth0_id ON users(auth0_id);

-- Invites
CREATE INDEX idx_invites_user_id ON invites(user_id);
CREATE INDEX idx_invites_public_token ON invites(public_token);
CREATE INDEX idx_invites_status ON invites(status);

-- RSVPs
CREATE INDEX idx_rsvps_invite_id ON rsvps(invite_id);
CREATE INDEX idx_rsvps_guest_email ON rsvps(guest_email);

-- ThingsToKnow
CREATE INDEX idx_things_to_know_invite_id ON things_to_know(invite_id);
CREATE INDEX idx_things_to_know_category ON things_to_know(category);

-- Templates
CREATE INDEX idx_templates_user_id ON templates(user_id);
CREATE INDEX idx_templates_type ON templates(type);
```

### Constraints

- `publicToken` must be unique
- Prevent duplicate RSVPs per email per invite
- Cascade delete RSVPs and ThingsToKnow when invite is deleted

---

## Email Templates

### Invitation Email

**Subject**: You're invited to {eventName}!

**Body**:
```
Hi {guestName},

You're invited to {eventName}!

📅 Date: {eventDate} at {eventTime}
📍 Location: {location}

{description}

RSVP now by clicking the link below or scanning the QR code:
{inviteUrl}

[QR Code Image]

We hope to see you there!
```

### RSVP Confirmation Email

**Subject**: RSVP Confirmed for {eventName}

**Body**:
```
Hi {guestName},

Your RSVP has been confirmed!

Event: {eventName}
Seats: {confirmedSeats}
Status: {status}

Event Details:
📅 {eventDate} at {eventTime}
📍 {location}

Need to make changes? Visit: {inviteUrl}

See you there!
```

---

## Rate Limits

Implement the following rate limits:

- **General API**: 100 requests per minute per user
- **Send Invites**: 100 emails per invite per hour
- **Public RSVP**: 10 requests per IP per minute
- **Create Invite**: 20 per hour per user

---

## File Upload

For image uploads (invite designs, template thumbnails):

### Upload Endpoint
```
POST /uploads/image
```

**Authentication**: Required

**Request**: multipart/form-data
```
file: [image file]
```

**Response**: `200 OK`
```json
{
  "url": "https://cdn.partyadmin.com/uploads/abc123.jpg",
  "width": 1200,
  "height": 800
}
```

**Constraints**:
- Max file size: 5MB
- Allowed types: jpg, png, gif, webp
- Auto-resize large images
- Generate thumbnails

---

## WebSocket Events (Optional Enhancement)

For real-time RSVP updates:

```typescript
// Client subscribes to invite updates
socket.emit('subscribe', { inviteId: 'invite_123' });

// Server sends updates
socket.on('rsvp:new', (rsvp: RSVP) => {});
socket.on('rsvp:updated', (rsvp: RSVP) => {});
socket.on('stats:updated', (stats: InviteStats) => {});
```

---

## Testing Requirements

The backend should include:

1. **Unit Tests**: Test all service functions
2. **Integration Tests**: Test all API endpoints
3. **Auth Tests**: Verify Auth0 token validation
4. **Load Tests**: Handle 1000 concurrent users
5. **Email Tests**: Mock email sending

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Auth0 application created and configured
- [ ] Database migrations run
- [ ] Indexes created
- [ ] Email service configured (SendGrid, AWS SES, etc.)
- [ ] File storage configured (S3, CloudFlare R2, etc.)
- [ ] Rate limiting implemented
- [ ] CORS configured for frontend domain
- [ ] SSL/TLS enabled
- [ ] Monitoring and logging set up
- [ ] Backup strategy implemented

---

## Support

For questions about this API specification, contact the frontend team or refer to the frontend code in the `/src/services` directory for implementation examples.
