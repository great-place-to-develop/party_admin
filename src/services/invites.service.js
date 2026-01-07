import apiService from './api.service';

/**
 * Invites Service
 * Handles all invite-related API calls
 *
 * Backend Implementation Required:
 * - All endpoints should be authenticated
 * - User can only access their own invites
 * - QR codes should be unique and secure
 */

class InvitesService {
  /**
   * Get all invites for the authenticated user
   * GET /invites
   * Response: { invites: Array<Invite> }
   */
  async getInvites(filters = {}) {
    const params = new URLSearchParams(filters);
    return apiService.get(`/invites?${params}`);
  }

  /**
   * Get a single invite by ID
   * GET /invites/:id
   * Response: { invite: Invite }
   */
  async getInvite(id) {
    return apiService.get(`/invites/${id}`);
  }

  /**
   * Create a new invite
   * POST /invites
   * Body: { eventName, eventDate, location, description, maxSeats, design, thingsToKnow }
   * Response: { invite: Invite }
   */
  async createInvite(inviteData) {
    return apiService.post('/invites', inviteData);
  }

  /**
   * Update an existing invite
   * PUT /invites/:id
   * Body: Partial<Invite>
   * Response: { invite: Invite }
   */
  async updateInvite(id, inviteData) {
    return apiService.put(`/invites/${id}`, inviteData);
  }

  /**
   * Delete an invite
   * DELETE /invites/:id
   * Response: { success: boolean }
   */
  async deleteInvite(id) {
    return apiService.delete(`/invites/${id}`);
  }

  /**
   * Send invite to guests via email
   * POST /invites/:id/send
   * Body: { recipients: Array<{ email, name }> }
   * Response: { sent: number, failed: Array }
   */
  async sendInvite(id, recipients) {
    return apiService.post(`/invites/${id}/send`, { recipients });
  }

  /**
   * Generate QR code for invite
   * GET /invites/:id/qr
   * Response: { qrCodeUrl: string, inviteUrl: string }
   */
  async generateQRCode(id) {
    return apiService.get(`/invites/${id}/qr`);
  }

  /**
   * Get invite statistics
   * GET /invites/:id/stats
   * Response: { totalSeats, confirmedSeats, pendingSeats, availableSeats, views }
   */
  async getInviteStats(id) {
    return apiService.get(`/invites/${id}/stats`);
  }

  /**
   * Get all RSVPs for an invite
   * GET /invites/:id/rsvps
   * Response: { rsvps: Array<RSVP> }
   */
  async getInviteRSVPs(id) {
    return apiService.get(`/invites/${id}/rsvps`);
  }

  /**
   * Update RSVP status
   * PATCH /invites/:id/rsvps/:rsvpId
   * Body: { status: 'confirmed' | 'declined' | 'pending', additionalSeats }
   * Response: { rsvp: RSVP }
   */
  async updateRSVP(inviteId, rsvpId, data) {
    return apiService.patch(`/invites/${inviteId}/rsvps/${rsvpId}`, data);
  }

  /**
   * Public endpoint - RSVP to an invite (guest response)
   * POST /invites/public/:token/rsvp
   * Body: { name, email, status, requestedSeats, message }
   * Response: { rsvp: RSVP }
   */
  async respondToInvite(token, rsvpData) {
    return apiService.post(`/invites/public/${token}/rsvp`, rsvpData);
  }

  /**
   * Public endpoint - Get invite details by token
   * GET /invites/public/:token
   * Response: { invite: PublicInvite }
   */
  async getPublicInvite(token) {
    return apiService.get(`/invites/public/${token}`);
  }
}

export default new InvitesService();
