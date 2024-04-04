'use server'

import { ShopItemsSchema, ShopItemSchema, NewItem, UpdateItem } from "@/schemas/ShopItem"
import { revalidatePath } from "next/cache"

export const getItems = async() => {
  const response = await fetch('http://localhost:3001/items', {  cache: 'no-cache' })
  const data = await response.json()
  return await ShopItemsSchema.parseAsync(data)
}

export const getItemByName = async(name: string) => {
  const response = await fetch(`http://localhost:3001/items?name=${name}`, {  cache: 'no-cache' })
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

export const updateItem = async(id: string, data: UpdateItem) => {
  const updated = await fetch(`http://localhost:3001/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  revalidatePath('/')
  if (updated.ok) {
    return { success: true }
  } else {
    return { success: false }
  }
}

export const deleteAll = async () => {
  const items = await getItems()
  items.forEach(async item => {
    await deleteItem(item.id)
  })
  revalidatePath('/')
}

export const importData = async(items: NewItem[]) => {
  for (const item of items) {
    const data = await getItemByName(item.name)
    const retreivedItem = data[0]
    if (!retreivedItem) {
      await postItem(item)
      continue
    }
    if (retreivedItem.bought !== item.bought) {
      const boughtUpdate = {
        ...retreivedItem,
        bought: item.bought
      }
      await updateItem(retreivedItem.id, boughtUpdate)
    }
  }
  revalidatePath('/')
}