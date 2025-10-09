import { z } from 'zod'

const configSchema = z.object({
  version: z.string().min(1),
  date: z.iso.datetime().optional(),
  url: z.url().optional(),
})

export type Config = z.infer<typeof configSchema>

export default {
  default: {
    version: 'unknown',
    date: undefined,
    url: undefined,
  } satisfies Config,
  validator(config: unknown) {
    configSchema.parse(config)
  },
}
