import { db } from '@/prisma'

interface Produto {
  id: number
  quant: number
  descricao: string
}

export async function POST(request: Request): Promise<Response> {
  const {
    userId,
    produtos,
    taxaEntrega,
    tempoEstimado,
    subtotal,
    total,
    metodoPay,
  } = await request.json()

  const pedido = await db.pedidos.create({
    data: {
      userId,
      TaxaEntrega: taxaEntrega,
      TempoEstimado: tempoEstimado,
      subtotal,
      total,
      metodoPay,
      status: 'CONFIRMADO',
      produtos: {
        create: produtos.map((produto: Produto) => ({
          idProdutos: produto.id,
          quant: produto.quant,
          descricao: produto.descricao,
        })),
      },
    },
  })

  return new Response(JSON.stringify(pedido), {
    status: 201,
  })
}
