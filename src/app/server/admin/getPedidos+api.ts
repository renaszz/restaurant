import { db } from '@/prisma'

export async function GET(): Promise<Response> {
  const pedidos = await db.pedidos.findMany({
    where: {
      status: 'CONFIRMADO',
    },
    select: {
      id: true,
      userId: true,
      subtotal: true,
      total: true,
      createdAt: true,
      status: true,
      metodoPay: true,
      user: {
        select: {
          nome: true,
          endereco: true,
        },
      },
      produtos: {
        include: {
          produtos: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })
  return Response.json(pedidos)
}
