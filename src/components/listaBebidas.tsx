import { api } from '@/app/server/api'
import { Spinner, VStack } from '@gluestack-ui/themed'
import { Produtos } from '@prisma/client'
import { useEffect, useState } from 'react'
import ItemBebidas from './itemBebidas'

const ListaBebidas = () => {
  const [produtos, setProdutos] = useState<Produtos[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProdutos = async () => {
      try {
        const response = await api.get<Produtos[]>('/bebidas')
        setProdutos(response.data)
      } catch (error) {
        console.error('Erro ao buscar as bebidas:', error)
      } finally {
        setLoading(false)
      }
    }

    getProdutos()
  }, [])
  return (
    <VStack>
      {loading ? (
        <Spinner size={'large'} alignSelf="center" />
      ) : (
        produtos.map((produto) => (
          <ItemBebidas key={produto.id} produtos={produto} />
        ))
      )}
    </VStack>
  )
}
export default ListaBebidas
