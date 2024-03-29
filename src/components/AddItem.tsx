'use client'

import React, { FormEventHandler, useState } from 'react'
import { GoPlusCircle } from "react-icons/go";

const AddItem = () => {
  const [itemName, setItemName] = useState('')

  const submitItem = () => {
    console.log(itemName);
    if (itemName.length == 0) {
      alert('Cant add empty item')
    }
    setItemName('')
  }

  return (
    <div className='flex bg-yellow-300 rounded-md p-2 items-center gap-2 mb-1 px-3 justify-between'>
      <input type="text" className='w-full' name="itemName" id="name" value={itemName} onChange={e => setItemName(e.target.value)} />
      <GoPlusCircle size={32} onClick={submitItem} />
    </div>
  )
}

export default AddItem