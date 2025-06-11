import { z } from 'zod'

const configSchema = z.object({
  version: z.string(),
})

export type Config = z.infer<typeof configSchema>

export default {
  default: {
    version: '',
  } satisfies Config,
  validator(config: unknown) {
    configSchema.parse(config)
  },
}
