import { Feather, Ionicons } from '@expo/vector-icons'
import { Text, Card, Heading, Pressable, VStack } from '@gluestack-ui/themed'
import { Link } from 'expo-router'

export default function Dashboard() {
  return (
    <VStack flex={1} alignItems="center" justifyContent="center" gap={'$4'}>
      <Link href={'/dashboard/novosPedidos'} asChild>
        <Pressable>
          <Card
            alignItems="center"
            justifyContent="center"
            w={'$72'}
            h={'$72'}
            bg="$blueGray200"
          >
            <Heading mb={'$12'}>Novos Pedidos</Heading>
            <Ionicons name="receipt-outline" size={80} color={'#273386'} />
            <Text mt={'$16'}>Vizualizar pedidos recentes</Text>
          </Card>
        </Pressable>
      </Link>
      <Link href={'/dashboard/atualizarPedidos'} asChild>
        <Pressable>
          <Card
            alignItems="center"
            justifyContent="center"
            bg="$blueGray200"
            w={'$72'}
            h={'$72'}
          >
            <Heading mb={'$12'}>Atualizar Pedido</Heading>
            <Feather name="edit" size={80} color={'#273386'} />
            <Text mt={'$16'}>Atualizar o status de um pedido</Text>
          </Card>
        </Pressable>
      </Link>
    </VStack>
  )
}
