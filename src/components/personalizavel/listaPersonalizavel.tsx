import { api } from '@/app/server/api'
import { VStack } from '@gluestack-ui/themed'
import {
  Cardapio,
  Acompanhamentos,
  Carnes,
  Saladas,
  Legumes,
} from '@prisma/client'
import { useEffect, useState } from 'react'
import ItemPersonalizavel from './itemPersonalizavel'
import { ListaPersonalizavelProps } from '@/@types/interfaces'

const ListaPersonalizavel = ({ secao }: ListaPersonalizavelProps) => {
  const [produtos, setProdutos] = useState<Cardapio[]>([])

  useEffect(() => {
    const getProdutos = async () => {
      try {
        const response = await api.get<{ [key: string]: Cardapio[] }>(
          '/cardapio',
        )
        if (secao && response.data[secao]) {
          setProdutos(response.data[secao])
        }
      } catch (error) {
        console.error('Erro ao buscar o cardápio:', error)
      }
    }

    getProdutos()
  }, [secao])

  return (
    <VStack>
      {produtos.map((item) => (
        <ItemPersonalizavel
          key={item.id}
          secao={
            item as unknown as Acompanhamentos | Carnes | Saladas | Legumes
          }
        />
      ))}
    </VStack>
  )
}

export default ListaPersonalizavel
