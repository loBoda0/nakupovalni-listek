import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"
import { getItems, importData } from "@/actions/items"
import { NewItemsSchema } from "@/schemas/GroceryItem"

export async function GET(
  req: NextApiRequest,
) {
  const data = await getItems()
  return Response.json({ items: data })
}

export async function POST(
  req: NextRequest
) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    
    if (!file) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
    
    if (file.type !== 'application/json') {
      return NextResponse.json({ error: 'Only JSON files are allowed' }, { status: 500 })
    }

    const fileContents = await file.text();

    const groceries = JSON.parse(fileContents)

    const validatedGroceries = await NewItemsSchema.parseAsync(groceries)

    importData(validatedGroceries)
    
    return NextResponse.json({ "message": "Data imported successfully."}, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}