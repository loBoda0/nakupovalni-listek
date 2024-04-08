import { z } from 'zod'

export type Grocery = z.infer<typeof GrocerySchema>
export const GrocerySchema = z.object({
  id: z.string(),
  name: z.string(),
  bought: z.boolean()
})

export const GroceriesSchema = z.array(GrocerySchema)

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

export const NewItemsSchema = z.array(NewItemSchema)