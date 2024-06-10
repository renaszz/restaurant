import axios from 'axios'
import { router, useRouter } from 'expo-router'
import { useBag } from '@/context/bag'

const handleFinalizarPedido = async (
  data,
  subtotal,
  totalDescontos,
  total,
  produtos,
  esvaziar,
) => {
  if (!data?.user) return

  try {
    const response = await axios.post('/pedidos', {
      subtotal,
      totalDescontos,
      total,
      TaxaEntrega: 8,
      TempoEstimado: 30,
      status: 'CONFIRMADO',
      user: {
        id: data.user.id,
      },
      produtos: produtos.map((produto) => ({
        id: produto.id,
        quant: produto.quant,
      })),
    })

    if (response.status === 201) {
      esvaziar()

      router.navigate('/pedidos')
    }
}
}

export default handleFinalizarPedido
