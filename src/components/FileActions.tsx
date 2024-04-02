'use client'

import { getItems } from '@/actions/items';
import React from 'react'
import { MdFileUpload, MdFileDownload } from "react-icons/md";

const FileActions = () => {
  const exportData = async () => {
    const data = await getItems()
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  }
  return (
    <div className='flex h-48'>
      <div className='w-1/2 flex items-center justify-center border-dashed border-2 m-1' onClick={exportData}>
        <MdFileDownload size={48} />
      </div>
      <div className='w-1/2 flex items-center justify-center border-dashed border-2 m-1'>
        <MdFileUpload size={48} />
      </div>
    </div>
  )
}

export default FileActions
