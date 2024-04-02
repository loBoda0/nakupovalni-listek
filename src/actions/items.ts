'use server'

import { ShopItemsSchema, ShopItemSchema } from "@/schemas/ShopItem"
import { revalidatePath } from "next/cache"

interface NewItem {
  name: string,
  bought: boolean
}

export const getItems = async() => {
  const response = await fetch('http://localhost:3001/items', {  cache: 'no-cache' })
  const data = await response.json()
  return await ShopItemsSchema.parseAsync(data)
}

export const postItem = async(newItem: NewItem) => {
  const response = await fetch('http://localhost:3001/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  })

  if (!response.ok) {
    throw new Error('Failed to add item')
  }

  const data = await response.json()
  revalidatePath('/')
  return await ShopItemSchema.parseAsync(data)
}

export const deleteItem = async(id: string) => {
  const deleted = await fetch(`http://localhost:3001/items/${id}`, { method: 'DELETE' })
  if (deleted.ok) {
    revalidatePath('/')
    return { success: true }
  } else {
    return { success: false }
  }
}