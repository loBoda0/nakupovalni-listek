'use client'

import { ShopItem } from '@/schemas/ShopItem'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { CiEdit } from "react-icons/ci"
import { deleteItem, updateItem } from '@/actions/items'
import { IoMdClose } from "react-icons/io"
import { cn } from '@/utils/cn'

interface ListItemProps {
  item: ShopItem
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
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
    <div className='flex justify-between m-2'>
      <div className="flex gap-2">
        <input type="checkbox" name="isChecked" id={item.name} checked={isChecked} onChange={toggleCheckbox} />
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
        <button onClick={cancelEdit} hidden={item.name === itemName || isChecked}>
          <IoMdClose color='red' size={24} />
        </button>
        <button onClick={handleEdit} disabled={isChecked}>
          <CiEdit color={item.name === itemName || isChecked ? 'gray' : 'blue'} size={24} />
        </button>
        <FaRegTrashAlt color='red' size={24} onClick={handleDelete} />
      </div>
    </div>
  )
}

export default ListItem