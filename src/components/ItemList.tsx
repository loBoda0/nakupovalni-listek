import { ShopItem } from '@/schemas/ShopItem'
import React from 'react'
import ListItem from './ListItem'
import AddItem from './AddItem'
import FileActions from './FileActions'

interface ItemListProps {
  items: ShopItem[]
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div className='bg-white rounded-md p-4 w-[412px] m-3'>
      <AddItem />
      {
        items.map(item => (
          <ListItem key={item.id} item={item} />
        ))
      }
      <FileActions />
    </div>
  )
}

export default ItemList