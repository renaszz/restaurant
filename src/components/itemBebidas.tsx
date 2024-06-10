import { calculoDesconto } from '@/app/server/descontos'
import { useBag } from '@/context/bag'
import { Ionicons } from '@expo/vector-icons'
import {
  Image,
  HStack,
  Heading,
  Text,
  VStack,
  Pressable,
} from '@gluestack-ui/themed'
import { Produtos } from '@prisma/client'
import { useState } from 'react'
import MenssagemAdd from './mensagemAdd'

interface ItemProdutoProps {
  produtos: Produtos
}

const ItemBebidas = ({ produtos }: ItemProdutoProps) => {
  const { increaseBagQuant, decreaseBagQuant, removeProduto, addProduto } =
    useBag()
  const [count, setCount] = useState(0)
  const toast = MenssagemAdd()

  const addCount = () => {
    setCount((current) => {
      if (current === 0) {
        addProduto({
          id: produtos.id,
          nome: produtos.nome,
          preco: Number(produtos.preco),
          image: produtos.imagemUrl,
          quant: count + 1,
        })
      } else {
        increaseBagQuant(produtos.id)
      }
      toast()
      return current + 1
    })
  }

  const removeCount = () => {
    setCount((current) => {
      if (current === 0) return 0
      if (current === 1) {
        removeProduto(produtos.id)
      } else {
        decreaseBagQuant(produtos.id)
      }
      return current - 1
    })
  }

  return (
    <HStack borderTopWidth={0.5} borderColor="$coolGray300" h={100} mx={5}>
      <Image
        resizeMode="contain"
        w={90}
        h={90}
        mx={-5}
        alignSelf="center"
        source={{
          uri: produtos.imagemUrl,
        }}
        alt={produtos.nome}
      />
      <VStack flex={1}>
        <Heading mt={'$2'}>{produtos.nome}</Heading>
        <Text size="xs" isTruncated>
          {produtos.descricao}
        </Text>
      </VStack>
      <VStack alignItems="flex-end" mt={'$2'} mr={'$2'}>
        <Heading size="lg" lineHeight={'$lg'}>
          R$
          {Intl.NumberFormat('pt-br', {
            currency: 'BRL',
            minimumFractionDigits: 2,
          }).format(calculoDesconto({ produtos }))}
        </Heading>
        <HStack mt={'$4'}>
          {count > 0 && (
            <Pressable onPress={removeCount}>
              <Ionicons name="remove-circle-outline" size={32} color={'gray'} />
            </Pressable>
          )}
          {count > 0 && (
            <Text size="xl" lineHeight={'$2xl'} mx={'$1'} textAlign="center">
              {count}
            </Text>
          )}
          <Pressable onPress={addCount}>
            <Ionicons name="add-circle-sharp" size={32} color={'#273386'} />
          </Pressable>
        </HStack>
      </VStack>
    </HStack>
  )
}

export default ItemBebidas
