'use client'

import { ShopItem } from '@/schemas/GroceryItem'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { CiEdit } from "react-icons/ci"
import { deleteItem, updateItem } from '@/actions/items'
import { IoMdClose } from "react-icons/io"
import { cn } from '@/utils/cn'

interface GroceryItemProps {
  item: ShopItem
}

const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [itemName, setItemName] = useState(item.name)
  const [isChecked, setIsChecked] = useState(item.bought)
  const [initialItemName, setInitialItemName] = useState(item.name)

  useEffect(() => {
    setInitialItemName(item.name)
    setIsChecked(item.bought)
  }, [item.name, item.bought])

  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
    const updatedValue = {
      bought: !isChecked
    }
    updateItem(item.id, updatedValue)
  }

  const handleEdit = () => {
    if (item.name === itemName && !isChecked && inputRef.current != null) {
      inputRef.current.focus();
    }
    const updatedValue = {
      name: itemName
    }
    updateItem(item.id, updatedValue)
  }

  const handleDelete = async () => {
    const { success } = await deleteItem(item.id)
    if (!success) {
      alert('Something went wrong during removing an item')
    }
  }

  const cancelEdit = () => {
    setItemName(initialItemName)
  }

  return (
    <form action={handleEdit} className='flex justify-between m-1 p-3 rounded-md bg-slate-300'>
      <div className="flex gap-2 items-center">
        <input type="checkbox" name="isChecked" className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' id={item.name} checked={isChecked} onChange={toggleCheckbox} />
        <input
          type="text"
          className={cn('w-full', isChecked && 'line-through text-gray-500')}
          name="itemName"
          id="name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item name"
          disabled={isChecked}
          ref={inputRef}
        />
      </div>
      <div className="flex gap-2">
        <button onClick={cancelEdit} type='button' hidden={item.name === itemName || isChecked}>
          <IoMdClose color='red' size={24} />
        </button>
        <button onClick={handleEdit} disabled={isChecked}>
          <CiEdit color={item.name === itemName || isChecked ? 'gray' : 'blue'} size={24} />
        </button>
        <FaRegTrashAlt color='red' size={24} onClick={handleDelete} />
      </div>
    </form>
  )
}

export default GroceryItem