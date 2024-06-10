import { db } from '@/prisma'

export async function GET(): Promise<Response> {
  const categorias = await db.categorias.findMany({})
  return Response.json(categorias)
}
