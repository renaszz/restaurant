import { db } from '@/prisma'

export async function GET(): Promise<Response> {
  const restaurante = await db.restaurante.findMany({})
  return Response.json(restaurante)
}
