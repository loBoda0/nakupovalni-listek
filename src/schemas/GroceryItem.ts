import { z } from 'zod'

export type ShopItem = z.infer<typeof ShopItemSchema>
export const ShopItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  bought: z.boolean()
})

export const ShopItemsSchema = z.array(ShopItemSchema)

export type NewItem = z.infer<typeof NewItemSchema>

export type UpdateItem = z.infer<typeof UpdateItemSchema>

export const NewItemSchema = z.object({
  name: z.string(),
  bought: z.boolean(),
});

export const UpdateItemSchema = z.object({
  name: z.string().optional(),
  bought: z.boolean().optional(),
});