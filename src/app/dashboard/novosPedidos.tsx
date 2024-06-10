import { Heading, ScrollView, Spinner } from '@gluestack-ui/themed'
import { api } from '../server/api'
import { useEffect, useState } from 'react'
import HeaderAdmin from '@/components/admin/headerAdmin'
import ItemPedidoAdmin from '@/components/admin/itemPedidoAdmin'
import { PedidoComUsuario } from '@/@types/interfaces'
import MenssagemAdmin from '@/components/admin/mensagemAdmin'

export default function NovosPedidos() {
  const [pedidos, setPedidos] = useState<PedidoComUsuario[]>([])
  const [loading, setLoading] = useState(true)
  const [atualizar, setAtualizar] = useState(false)
  const toast = MenssagemAdmin()

  useEffect(() => {
    const getPedidos = async () => {
      try {
        const response = await api.get<PedidoComUsuario[]>('/admin/getPedidos')
        setPedidos(response.data)
      } catch (error) {
        console.error('Erro ao buscar os pedidos:', error)
      } finally {
        setLoading(false)
      }
    }

    getPedidos()
  }, [atualizar])

  const handleRefresh = () => {
    setAtualizar((prev) => !prev)
    toast()
  }

  return (
    <ScrollView>
      <HeaderAdmin />
      <Heading mx={'$2'} mt={'$2'}>
        Pedidos Recentes
      </Heading>
      {loading ? (
        <Spinner size={'large'} alignSelf="center" />
      ) : (
        pedidos.map((pedido) => (
          <ItemPedidoAdmin
            key={pedido.id}
            pedido={pedido}
            onRefresh={handleRefresh}
          />
        ))
      )}
    </ScrollView>
  )
}
