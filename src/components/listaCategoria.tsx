import React, { useEffect, useState } from 'react'
import { api } from '@/app/server/api'
import ItemCategoria from './itemCategoria'
import { HStack } from '@gluestack-ui/themed'
import { Categorias } from '@prisma/client'

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState<Categorias[]>([])

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const response = await api.get<Categorias[]>('/categorias')
        setCategorias(response.data)
      } catch (error) {
        console.error('Erro ao buscar categorias:', error)
      }
    }

    getCategorias()
  }, [])

  return (
    <HStack>
      {categorias.map((categoria) => (
        <ItemCategoria key={categoria.id} categorias={categoria} />
      ))}
    </HStack>
  )
}
export default ListaCategorias
