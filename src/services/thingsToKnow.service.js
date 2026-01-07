import apiService from './api.service';

/**
 * Things To Know Service
 * Handles venue information, hotels, attractions, etc.
 *
 * Backend Implementation Required:
 * - Items belong to specific invites
 * - Support categories: hotels, restaurants, attractions, transportation, other
 * - Support ordering/sorting
 */

class ThingsToKnowService {
  /**
   * Get all items for an invite
   * GET /invites/:inviteId/things-to-know
   * Response: { items: Array<ThingToKnow> }
   */
  async getItems(inviteId, category = null) {
    const params = category ? `?category=${category}` : '';
    return apiService.get(`/invites/${inviteId}/things-to-know${params}`);
  }

  /**
   * Create a new item
   * POST /invites/:inviteId/things-to-know
   * Body: { category, title, description, address, website, phone, imageUrl, order }
   * Response: { item: ThingToKnow }
   */
  async createItem(inviteId, itemData) {
    return apiService.post(`/invites/${inviteId}/things-to-know`, itemData);
  }

  /**
   * Update an item
   * PUT /invites/:inviteId/things-to-know/:itemId
   * Body: Partial<ThingToKnow>
   * Response: { item: ThingToKnow }
   */
  async updateItem(inviteId, itemId, itemData) {
    return apiService.put(`/invites/${inviteId}/things-to-know/${itemId}`, itemData);
  }

  /**
   * Delete an item
   * DELETE /invites/:inviteId/things-to-know/:itemId
   * Response: { success: boolean }
   */
  async deleteItem(inviteId, itemId) {
    return apiService.delete(`/invites/${inviteId}/things-to-know/${itemId}`);
  }

  /**
   * Reorder items
   * PATCH /invites/:inviteId/things-to-know/reorder
   * Body: { items: Array<{ id, order }> }
   * Response: { success: boolean }
   */
  async reorderItems(inviteId, items) {
    return apiService.patch(`/invites/${inviteId}/things-to-know/reorder`, { items });
  }
}

export default new ThingsToKnowService();
