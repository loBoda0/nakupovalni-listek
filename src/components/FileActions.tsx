'use client'

import { deleteAll, getItems, importData } from '@/actions/items'
import { NewItemSchema, Grocery } from '@/schemas/GroceryItem'
import React from 'react'
import { MdFileUpload, MdFileDownload } from "react-icons/md"

const FileActions = () => {
  const deleteAllItems = async() => {
    await deleteAll()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const json = JSON.parse(e.target?.result as string)
        if (Array.isArray(json) && json.every(isValidGrocery)) {
          await importData(json)
        } else {
          throw new Error('Invalid JSON format or Grocery structure')
        }
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    }

    if (file) {
      if (file.type === 'application/json') {
        reader.readAsText(file)
      } else {
        console.error('Invalid file type. Please select a .json file.')
      }
    }
  }

  const isValidGrocery = (item: any): item is Grocery => {
    try {
      return !!NewItemSchema.parse(item)
    } catch (error) {
      return false;
    }
  }

  const exportData = async () => {
    const data = await getItems()
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`

    const link = document.createElement("a")
    link.href = jsonString
    link.download = "data.json"

    link.click()
  }

  return (
    <div className='flex bg-white rounded-md p-2 mt-4 gap-2'>
      <button className="w-1/3 flex items-center justify-center bg-red-400 hover:bg-red-500 rounded-md" onClick={deleteAllItems}>Delete all</button>
      <button className='w-1/3 flex items-center justify-center border-dashed border-2' onClick={exportData}>
        Download <MdFileDownload size={24} />
      </button>
      <label className='w-1/3 flex items-center justify-center border-dashed border-2'>
        Import
        <input 
          type='file' 
          accept='.json' 
          onChange={handleFileChange} 
          className='hidden'
        />
        <MdFileUpload size={24} />
      </label>
    </div>
  )
}

export default FileActions
