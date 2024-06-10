import { api } from '@/app/server/api'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { HStack, Text } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'

interface RestauranteData {
  TaxaEntrega: number
  TempoEstimado: number
}

const Restaurante = () => {
  const [restauranteData, setRestauranteData] =
    useState<RestauranteData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<RestauranteData[]>('/restaurante')
        setRestauranteData(response.data[0])
      } catch (error) {
        console.error('Erro ao buscar informações:', error)
      }
    }

    fetchData()
  }, [])

  if (!restauranteData) return null

  return (
    <HStack justifyContent="space-between" mt={10} mx={15} gap={5}>
      <HStack>
        <Text>Pedido min. </Text>
        <Text color="black">R$16,00</Text>
      </HStack>
      <HStack justifyContent="flex-end">
        <MaterialIcons name="sports-motorsports" size={20} color="#273386" />
        <Text color="black">
          {' '}
          R$
          {Intl.NumberFormat('pt-br', {
            currency: 'BRL',
            minimumFractionDigits: 2,
          }).format(restauranteData.TaxaEntrega)}
          {'    '}
        </Text>
        <Ionicons name="timer-outline" size={20} color="#273386" />
        <Text color="black"> {restauranteData.TempoEstimado} min</Text>
      </HStack>
    </HStack>
  )
}

export default Restaurante
