import { ShopItem } from '@/schemas/GroceryItem'
import React from 'react'
import GroceryItem from './GroceryItem'
import AddItem from './AddItem'
import FileActions from './FileActions'
import EmptyState from './EmptyState'

interface GroceryListProps {
  items: ShopItem[]
}

const GroceryList: React.FC<GroceryListProps> = ({ items }) => {
  return (
    <div className='w-[412px] m-3'>
      <AddItem />
      <div className="bg-white rounded-md h-96 overflow-scroll">
      {
        items.length > 0 ? 
          <>
            {
              items.map(item => (
                <GroceryItem key={item.id} item={item} />
              ))
            }
          </>
         : <EmptyState />
        }
      </div>
      <FileActions />
    </div>
  )
}

export default GroceryList