import React, { useEffect, useState } from 'react'
import { api } from '@/app/server/api'
import ItemMarmitex from './ItemMarmitex'
import { HStack } from '@gluestack-ui/themed'
import { Produtos } from '@prisma/client'

const ListaMarmitex = () => {
  const [produtos, setProdutos] = useState<Produtos[]>([])

  useEffect(() => {
    const getProdutos = async () => {
      try {
        const response = await api.get<Produtos[]>('/marmitex')
        setProdutos(response.data)
      } catch (error) {
        console.error('Erro ao buscar as marmitex:', error)
      }
    }

    getProdutos()
  }, [])

  return (
    <HStack>
      {produtos.map((produto) => (
        <ItemMarmitex key={produto.id} produtos={produto} />
      ))}
    </HStack>
  )
}
export default ListaMarmitex
