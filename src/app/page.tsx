import { Toaster } from "react-hot-toast";
import GroceryList from "../components/GroceryList";
import { getItems } from "@/actions/items";

const Home = async() => {
  const items = await getItems()

  return (
    <div className="flex h-full justify-center items-center bg-sky-600">
      <Toaster />
      <GroceryList items={items} />
    </div>
  );
}

export default Home