'use client'

import { postItem } from '@/actions/items'
import React, { useState } from 'react'
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

    postItem(newItem)
    setItemName('')
  }

  return (
    <form action={submitItem} className='flex bg-yellow-300 rounded-md p-2 items-center gap-2 mb-1 px-3 justify-between'>
      <input type="text" className='w-full' name="itemName" id="name" value={itemName} onChange={e => setItemName(e.target.value)} />
      <GoPlusCircle size={32} onClick={submitItem} />
    </form>
  )
}

export default AddItem