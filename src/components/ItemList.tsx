import { ShopItem } from '@/schemas/ShopItem'
import React from 'react'
import ListItem from './ListItem'
import AddItem from './AddItem'
import FileActions from './FileActions'
import EmptyState from './EmptyState'

interface ItemListProps {
  items: ShopItem[]
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div className='bg-white rounded-md p-4 w-[412px] m-3'>
      <AddItem />
      <div className="h-96 overflow-scroll">
      {
        items.length > 0 ? 
          <>
            {
              items.map(item => (
                <ListItem key={item.id} item={item} />
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

export default ItemList