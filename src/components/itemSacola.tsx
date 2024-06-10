import React from 'react'
import {
  HStack,
  Image,
  VStack,
  Text,
  Heading,
  Pressable,
} from '@gluestack-ui/themed'
import { Produto, useBag } from '@/context/bag'
import { Ionicons } from '@expo/vector-icons'

interface ItemSacolaProps {
  produto: Produto
  format: (value: number) => string
}

const ItemSacola = ({ produto, format }: ItemSacolaProps) => {
  const { increaseBagQuant, decreaseBagQuant, removeProduto } = useBag()

  const add = () => {
    increaseBagQuant(produto.id)
  }

  const remove = () => {
    if (produto.quant === 1) {
      removeProduto(produto.id)
    } else {
      decreaseBagQuant(produto.id)
    }
  }

  return (
    <HStack
      borderWidth={0.5}
      borderColor="$backgroundDark300"
      rounded={'$xl'}
      p={5}
      my={'$1'}
      bg="$backgroundDark100"
    >
      <Image
        resizeMode="contain"
        size="sm"
        source={{ uri: produto.image }}
        alt={produto.nome}
      />
      <VStack>
        <Heading size="sm">{produto.nome}</Heading>
        <Text>{format(produto.preco)}</Text>
        {produto?.descricao && (
          <Text maxWidth={220}>Detalhes: {produto.descricao.join(', ')}</Text>
        )}
      </VStack>
      <HStack
        flex={1}
        justifyContent="flex-end"
        alignItems="center"
        mr={'$2'}
        gap={'$2'}
      >
        <Pressable onPress={remove}>
          <Ionicons name="remove" size={24} color={'gray'} />
        </Pressable>
        <Text size="sm" lineHeight={'$2xl'} mx={'$1'} textAlign="center">
          {produto.quant}
        </Text>
        <Pressable onPress={add}>
          <Ionicons name="add" size={24} color={'#273386'} />
        </Pressable>
      </HStack>
    </HStack>
  )
}

export default ItemSacola
