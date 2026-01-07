import apiService from './api.service';

/**
 * Templates Service
 * Handles invite design templates
 *
 * Backend Implementation Required:
 * - Pre-built templates available to all users
 * - User can save custom templates
 * - Templates include layout, colors, fonts, and component positions
 */

class TemplatesService {
  /**
   * Get all available templates
   * GET /templates
   * Query: ?type=public|user
   * Response: { templates: Array<Template> }
   */
  async getTemplates(type = 'public') {
    return apiService.get(`/templates?type=${type}`);
  }

  /**
   * Get a specific template
   * GET /templates/:id
   * Response: { template: Template }
   */
  async getTemplate(id) {
    return apiService.get(`/templates/${id}`);
  }

  /**
   * Save a custom template
   * POST /templates
   * Body: { name, design, thumbnail }
   * Response: { template: Template }
   */
  async saveTemplate(templateData) {
    return apiService.post('/templates', templateData);
  }

  /**
   * Update a custom template
   * PUT /templates/:id
   * Body: Partial<Template>
   * Response: { template: Template }
   */
  async updateTemplate(id, templateData) {
    return apiService.put(`/templates/${id}`, templateData);
  }

  /**
   * Delete a custom template
   * DELETE /templates/:id
   * Response: { success: boolean }
   */
  async deleteTemplate(id) {
    return apiService.delete(`/templates/${id}`);
  }
}

export default new TemplatesService();
