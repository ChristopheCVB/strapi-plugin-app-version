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
    it('should return version from config', () => {
      const mockVersion = '1.0.0'
      mockStrapi.config.mockReturnValue(mockVersion)

      const contentController = controller({ strapi: mockStrapi })
      const result = contentController.configVersion()

      expect(mockStrapi.plugin).toHaveBeenCalledWith(PLUGIN_ID)
      expect(mockStrapi.config).toHaveBeenCalledWith('version')
      expect(result).toEqual({
        version: mockVersion,
      })
    })

    it('should return default version when config returns unknown', () => {
      const mockVersion = 'unknown'
      mockStrapi.config.mockReturnValue(mockVersion)

      const contentController = controller({ strapi: mockStrapi })
      const result = contentController.configVersion()

      expect(mockStrapi.plugin).toHaveBeenCalledWith(PLUGIN_ID)
      expect(mockStrapi.config).toHaveBeenCalledWith('version')
      expect(result).toEqual({
        version: mockVersion,
      })
    })

    it('should return custom version from config', () => {
      const mockVersion = '2.1.3-beta'
      mockStrapi.config.mockReturnValue(mockVersion)

      const contentController = controller({ strapi: mockStrapi })
      const result = contentController.configVersion()

      expect(mockStrapi.plugin).toHaveBeenCalledWith(PLUGIN_ID)
      expect(mockStrapi.config).toHaveBeenCalledWith('version')
      expect(result).toEqual({
        version: mockVersion,
      })
    })

    it('should handle empty string version', () => {
      const mockVersion = ''
      mockStrapi.config.mockReturnValue(mockVersion)

      const contentController = controller({ strapi: mockStrapi })
      const result = contentController.configVersion()

      expect(mockStrapi.plugin).toHaveBeenCalledWith(PLUGIN_ID)
      expect(mockStrapi.config).toHaveBeenCalledWith('version')
      expect(result).toEqual({
        version: mockVersion,
      })
    })

    it('should return correct structure with version property', () => {
      const mockVersion = '3.0.0'
      mockStrapi.config.mockReturnValue(mockVersion)

      const contentController = controller({ strapi: mockStrapi })
      const result = contentController.configVersion()

      expect(result).toHaveProperty('version')
      expect(typeof result.version).toBe('string')
      expect(result.version).toBe(mockVersion)
    })

    it('should call strapi plugin with correct plugin ID', () => {
      const mockVersion = '1.0.0'
      mockStrapi.config.mockReturnValue(mockVersion)

      const contentController = controller({ strapi: mockStrapi })
      contentController.configVersion()

      expect(mockStrapi.plugin).toHaveBeenCalledWith(PLUGIN_ID)
    })

    it('should call strapi config with version parameter', () => {
      const mockVersion = '1.0.0'
      mockStrapi.config.mockReturnValue(mockVersion)

      const contentController = controller({ strapi: mockStrapi })
      contentController.configVersion()

      expect(mockStrapi.config).toHaveBeenCalledWith('version')
    })
  })
}) 
