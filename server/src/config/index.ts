import { z } from 'zod'

const configSchema = z.object({
  version: z.string().min(1),
})

export type Config = z.infer<typeof configSchema>

export default {
  default: {
    version: 'unknown',
  } satisfies Config,
  validator(config: unknown) {
    configSchema.parse(config)
  },
}
