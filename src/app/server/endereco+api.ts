import { db } from '@/prisma'

export async function PATCH(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  const { endereco: newEnderenco } = await request.json()

  if (!id) {
    return new Response(JSON.stringify({ error: 'Pedido não encontrado' }), {
      status: 400,
    })
  }

  try {
    const userAtualizado = await db.user.update({
      where: {
        id,
      },
      data: {
        endereco: newEnderenco,
      },
    })

    return new Response(JSON.stringify(userAtualizado), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ error: 'Erro ao atualizar seu endereço' }),
      {
        status: 500,
      },
    )
  }
}
