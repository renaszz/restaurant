import { useEffect, useState } from 'react'
import Header from '@/components/header'
import ItemPedido from '@/components/pedidos/itemPedido'
import { useAuth } from '@/context/auth'
import { Heading, ScrollView, Spinner, VStack } from '@gluestack-ui/themed'
import { api } from '../server/api'
import { Prisma } from '@prisma/client'

export default function Pedidos() {
  const [loading, setLoading] = useState(true)
  const [pedidos, setPedidos] = useState<
    Prisma.PedidosGetPayload<{
      include: {
        produtos: {
          include: {
            produtos: true
          }
        }
      }
    }>[]
  >([])
  const { user } = useAuth()

  useEffect(() => {
    const getPedidos = async () => {
      try {
        const response = await api.get<
          Prisma.PedidosGetPayload<{
            include: {
              produtos: {
                include: {
                  produtos: true
                }
              }
            }
          }>[]
        >('/pedidosUser', {
          params: {
            userId: user?.id,
          },
        })
        setPedidos(response.data)
      } catch (error) {
        console.error('Erro ao buscar os pedidos:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) {
      getPedidos()
    }
  }, [user?.id])
  return (
    <ScrollView>
      <Header />
      <Heading mx={'$3'} mt={'$4'}>
        Meus Pedidos
      </Heading>
      <VStack>
        {loading ? (
          <Spinner size={'large'} alignSelf="center" />
        ) : (
          pedidos.map((pedido) => (
            <ItemPedido key={pedido.id} pedido={pedido} />
          ))
        )}
      </VStack>
    </ScrollView>
  )
}
