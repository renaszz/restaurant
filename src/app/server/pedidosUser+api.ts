import { db } from '@/prisma'

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const userId = url.searchParams.get('userId')

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Usuário não encontrado' }), {
      status: 400,
    })
  }

  const pedidos = await db.pedidos.findMany({
    where: {
      userId,
    },
    include: {
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

  return new Response(JSON.stringify(pedidos), { status: 200 })
}
