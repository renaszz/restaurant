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
import ItemTradicional from './itemTradicional'

interface ListaTradicionalProps {
  secao: string
  maxOpcoes: number
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
}

const ListaTradicional = ({
  secao,
  maxOpcoes,
  setSelectedItems,
}: ListaTradicionalProps) => {
  const [produtos, setProdutos] = useState<Cardapio[]>([])
  const [selectionCount, setSelectionCount] = useState(0)

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

  const handleSelection = (nome: string) => {
    if (selectionCount < maxOpcoes) {
      setSelectionCount(selectionCount + 1)
      setSelectedItems((prev) => [...prev, nome])
    }
  }

  const handleDeselection = (nome: string) => {
    setSelectionCount(selectionCount - 1)
    setSelectedItems((prev) => prev.filter((item) => item !== nome))
  }

  return (
    <VStack>
      {produtos.map((item) => (
        <ItemTradicional
          key={item.id}
          secao={
            item as unknown as Acompanhamentos | Carnes | Saladas | Legumes
          }
          onSelection={handleSelection}
          onDeselection={handleDeselection}
          maxAtingido={selectionCount < maxOpcoes}
        />
      ))}
    </VStack>
  )
}

export default ListaTradicional
