import React from 'react'
import { MdFileUpload, MdFileDownload } from "react-icons/md";

const FileActions = () => {
  return (
    <div className='flex h-48'>
      <div className='w-1/2 flex items-center justify-center border-dashed border-2 m-1'>
        <MdFileDownload size={48} />
      </div>
      <div className='w-1/2 flex items-center justify-center border-dashed border-2 m-1'>
        <MdFileUpload size={48} />
      </div>
    </div>
  )
}

export default FileActions
