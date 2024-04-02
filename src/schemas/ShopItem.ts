import { z } from 'zod'

export type ShopItem = z.infer<typeof ShopItemSchema>
export const ShopItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  bought: z.boolean()
})

export const ShopItemsSchema = z.array(ShopItemSchema)