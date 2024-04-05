'use client'

import { postItem } from '@/actions/items'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { GoPlusCircle } from "react-icons/go"

const AddItem = () => {
  const [itemName, setItemName] = useState('')

  const submitItem = async () => {
    if (!itemName.trim()) {
      return
    }

    const newItem = {
      name: itemName,
      bought: false
    }

    const response = await postItem(newItem)
    if (response?.dupicate) {
      toast.error('This item already exists');
      
    }
    setItemName('')
  }

  return (
    <form action={submitItem} className='flex bg-yellow-300 rounded-md p-2 items-center gap-2 mb-4 px-3 justify-between'>
      <input type="text" className='w-full border-b-2 border-stone-900' name="itemName" id="name" value={itemName} onChange={e => setItemName(e.target.value)} placeholder='Insert new grocery' />
      <GoPlusCircle size={32} onClick={submitItem} />
    </form>
  )
}

export default AddItem