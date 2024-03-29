'use client'

import { ShopItem } from '@/schemas/ShopItem'
import React, { useRef, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { CiEdit } from "react-icons/ci"

interface ListItemProps {
  item: ShopItem
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [itemName, setItemName] = useState(item.name)
  const [isChecked, setIsChecked] = useState(item.isChecked)
  const [isEdit, setIsEdit] = useState(false)

  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }

  const handleEdit = () => {
    setIsEdit(!isEdit)
    if (inputRef.current && !isEdit) {
      console.log(inputRef.current)
      inputRef.current.focus();
      console.log(inputRef.current)
    }
  }

  return (
    <div className='flex justify-between m-2'>
      <div className="flex gap-2">
        <input type="checkbox" name="isChecked" id={item.name} checked={isChecked} onChange={toggleCheckbox} />
        <input ref={inputRef} type="text" readOnly={!isEdit} name={item.name} value={itemName} onChange={(e) => setItemName(e.target.value)} />   
      </div>
      <div className="flex gap-2">
        <CiEdit  color='blue' size={24} onClick={handleEdit} />
        <FaRegTrashAlt color='red' size={24} />
      </div>
    </div>
  )
}

export default ListItem