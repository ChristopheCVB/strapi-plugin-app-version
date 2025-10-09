import { describe, it, expect, vi, beforeEach } from 'vitest'
import controller from '../../controllers/content'
import { PLUGIN_ID } from '../../pluginId'
import type { Core } from '@strapi/strapi'

describe('content controller', () => {
  const mockStrapi = {
    plugin: vi.fn().mockReturnThis(),
    config: vi.fn(),
  } as unknown as Core.Strapi

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('configVersion', () => {
    it('should return props from config', () => {
      mockStrapi.config.mockImplementation((key: string) => {
        if (key === 'version') return '1.0.0'
        if (key === 'date') return '2024-01-01'
        if (key === 'url') return 'https://example.com'
        return undefined
      })

      const contentController = controller({ strapi: mockStrapi })
      const result = contentController.config()

      expect(mockStrapi.plugin).toHaveBeenCalledWith(PLUGIN_ID)
      expect(mockStrapi.config).toHaveBeenCalledWith('version')
      expect(mockStrapi.config).toHaveBeenCalledWith('date')
      expect(mockStrapi.config).toHaveBeenCalledWith('url')
      expect(result).toEqual({
        version: '1.0.0',
        date: '2024-01-01',
        url: 'https://example.com',
      })
    })

    it('should call strapi plugin with correct plugin ID', () => {
      mockStrapi.config.mockImplementation((key: string) => {
        if (key === 'version') return '1.0.0'
        if (key === 'date') return '2024-01-01'
        if (key === 'url') return 'https://example.com'
        return undefined
      })

      const contentController = controller({ strapi: mockStrapi })
      contentController.config()

      expect(mockStrapi.plugin).toHaveBeenCalledWith(PLUGIN_ID)
    })
  })
}) 
