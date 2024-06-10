import { useBag } from '@/context/bag'
import {
  Card,
  HStack,
  Heading,
  Pressable,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed'
import { Prisma } from '@prisma/client'
import { router } from 'expo-router'

interface ItemPedidoProps {
  pedido: Prisma.PedidosGetPayload<{
    include: {
      produtos: {
        include: {
          produtos: true
        }
      }
    }
  }>
}

const ItemPedido = ({ pedido }: ItemPedidoProps) => {
  const { addProduto } = useBag()
  const RefazerPedido = () => {
    for (const pedidoProduto of pedido.produtos) {
      addProduto({
        id: pedidoProduto.produtos.id,
        nome: pedidoProduto.produtos.nome,
        preco: Number(pedidoProduto.produtos.preco),
        image: pedidoProduto.produtos.imagemUrl,
        quant: pedidoProduto.quant,
        descricao: pedidoProduto.descricao
          ? [pedidoProduto.descricao]
          : undefined,
      })
    }
    router.navigate('/profile/sacola')
  }
  return (
    <Card mx={'$2'} my={'$1'}>
      <HStack justifyContent="space-between">
        <Text
          bg="$darkBlue700"
          w={'$32'}
          rounded={'$full'}
          textAlign="center"
          color="$white"
          mb={'$3'}
          mt={'$1'}
          textTransform="capitalize"
        >
          {pedido.status}
        </Text>
        <Text textTransform="capitalize" mb={'$3'} mt={'$1'} size="sm">
          {pedido.metodoPay}
        </Text>
      </HStack>
      <VStack>
        {pedido.produtos.map((pedidoProduto) => (
          <HStack key={pedidoProduto.id} alignItems="center" mt={'$1'}>
            <Text
              w={'$6'}
              h={'$6'}
              rounded={'$full'}
              bg="$blueGray400"
              textAlign="center"
              color="$white"
              lineHeight={'$lg'}
            >
              {pedidoProduto.quant}
            </Text>
            <VStack mx={'$1.5'}>
              <Heading size="sm">{pedidoProduto.produtos.nome}</Heading>
              {pedidoProduto?.descricao && (
                <Text mr={'$1.5'}>{pedidoProduto.descricao}</Text>
              )}
            </VStack>
          </HStack>
        ))}
        <View
          flex={1}
          h={0.5}
          borderWidth={0.25}
          my={'$4'}
          borderColor="$blueGray200"
        />
        <HStack justifyContent="space-between">
          <Text color="$black">
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(pedido.total))}
          </Text>
          <Pressable onPress={RefazerPedido}>
            <Text color="$red600">Refazer pedido</Text>
          </Pressable>
        </HStack>
      </VStack>
    </Card>
  )
}

export default ItemPedido
