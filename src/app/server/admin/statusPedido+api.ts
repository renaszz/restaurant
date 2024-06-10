import { db } from '@/prisma'

export async function PATCH(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  const { status: newStatus } = await request.json()

  if (!id) {
    return new Response(JSON.stringify({ error: 'Pedido não encontrado' }), {
      status: 400,
    })
  }

  try {
    const pedidoAtualizado = await db.pedidos.update({
      where: {
        id,
      },
      data: {
        status: newStatus,
      },
    })

    return new Response(JSON.stringify(pedidoAtualizado), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ error: 'Erro ao atualizar o pedido' }),
      {
        status: 500,
      },
    )
  }
}
