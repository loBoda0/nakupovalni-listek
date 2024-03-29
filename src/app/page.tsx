import { ShopItem } from "@/schemas/ShopItem";
import ItemList from "../components/ItemList";

const tempList: ShopItem[] = [
  {
    id: 1,
    name: "mleko",
    isChecked: false,
  },
  {
    id: 2,
    name: "mleko",
    isChecked: true,
  },
  {
    id: 3,
    name: "mleko",
    isChecked: true,
  },
  {
    id: 4,
    name: "mleko",
    isChecked: true,
  },
  {
    id: 5,
    name: "mleko",
    isChecked: false,
  },
  {
    id: 6,
    name: "mleko",
    isChecked: false,
  },
  {
    id: 7,
    name: "mleko",
    isChecked: false,
  },
]

export default function Home() {
  return (
    <div className="flex h-full justify-center items-center bg-sky-600">
      <ItemList items={tempList} />
    </div>
  );
}
