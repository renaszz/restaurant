import { db } from '@/prisma'

export async function GET(): Promise<Response> {
  const acompanhamentos = await db.acompanhamentos.findMany({})
  const carnes = await db.carnes.findMany({})
  const saladas = await db.saladas.findMany({})
  const legumes = await db.legumes.findMany({})
  return Response.json({ acompanhamentos, carnes, saladas, legumes })
}
