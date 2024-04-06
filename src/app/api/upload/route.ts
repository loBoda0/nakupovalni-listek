import { NextApiRequest } from "next"
import fs from 'fs'
import { NextRequest, NextResponse } from "next/server"
import { importData } from "@/actions/items"

export function GET(
  req: NextApiRequest,
) {
  return Response.json({ message: 'Hello from Next.js!' })
}

export async function POST(
  req: NextRequest
) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as string | null

    console.log(file)
    
    if (!file) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    const data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })
    
    const groceries = JSON.parse(data)

    importData(groceries)
    
    return NextResponse.json({ "message": "Data imported successfully."}, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}