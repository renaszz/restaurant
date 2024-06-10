import { db } from '@/prisma'

export async function GET(): Promise<Response> {
  const produtos = await db.produtos.findMany({
    where: {
      categoria: {
        nome: 'Bebidas',
      },
    },
  })
  return Response.json(produtos)
}
