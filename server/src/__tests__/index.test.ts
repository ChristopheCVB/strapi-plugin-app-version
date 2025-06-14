import { describe, it, expect, vi, beforeEach } from 'vitest'
import admin from '../controllers/admin'
import config from '../config'
import { PLUGIN_ID } from '../pluginId'
import type { Core } from '@strapi/strapi'
import { z } from 'zod'

describe('App Version Plugin', () => {
  describe('Admin Controller', () => {
    const mockStrapi = {
      plugin: vi.fn().mockReturnThis(),
      config: vi.fn(),
    } as unknown as Core.Strapi

    beforeEach(() => {
      vi.clearAllMocks()
      mockStrapi.config.mockReturnValue('1.0.0')
    })

    it('should return version from config', () => {
      const controller = admin({ strapi: mockStrapi })
      const result = controller.configVersion()

      expect(mockStrapi.plugin).toHaveBeenCalledWith(PLUGIN_ID)
      expect(mockStrapi.config).toHaveBeenCalledWith('version')
      expect(result).toEqual({ version: '1.0.0' })
    })
  })

  describe('Config', () => {
    it('should have valid default version', () => {
      expect(config.default).toEqual({ version: 'unknown' })
      expect(() => config.validator(config.default)).not.toThrow()
    })

    it('should validate valid config', () => {
      const validConfig = { version: '1.0.0' }
      expect(() => config.validator(validConfig)).not.toThrow()
    })

    it('should throw on invalid config', () => {
      const invalidConfigs = [
        { version: 123 }, // number instead of string
        { version: null }, // null instead of string
        { version: undefined }, // undefined instead of string
        {}, // missing version
        { version: '' }, // empty string
        { version: {} }, // object instead of string
        { version: [] }, // array instead of string
        { version: true }, // boolean instead of string
      ]

      invalidConfigs.forEach((invalidConfig) => {
        expect(() => config.validator(invalidConfig)).toThrow(z.ZodError)
      })
    })
  })
}) 
