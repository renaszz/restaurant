import { ItemPersonalizavelProps } from '@/@types/interfaces'
import { Ionicons } from '@expo/vector-icons'
import {
  Image,
  HStack,
  Heading,
  Text,
  VStack,
  Pressable,
} from '@gluestack-ui/themed'
import { useState } from 'react'

const ItemPersonalizavel = ({ secao }: ItemPersonalizavelProps) => {
  const [count, setCount] = useState(0)

  const addCount = () => {
    setCount((current) => {
      return current + 100
    })
  }

  const removeCount = () => {
    setCount((current) => {
      return current - 100
    })
  }
  return (
    <HStack
      flex={1}
      borderTopWidth={0.5}
      borderColor="$coolGray300"
      h={100}
      mx={2}
    >
      <Image
        resizeMode="cover"
        w={90}
        h={90}
        alignSelf="center"
        rounded={'$2xl'}
        source={{
          uri: secao.imagemURL,
        }}
        alt={secao.nome}
      />
      <VStack flex={1} mr={40}>
        <Heading pl={'$2'} mt={'$1'} maxWidth={190}>
          {secao.nome}
        </Heading>
        <Text pl={'$2'} size="xs" isTruncated>
          {secao.descricao}
        </Text>
      </VStack>
      <HStack alignItems="center" mr={'$4'}>
        {count > 0 && (
          <Pressable onPress={removeCount}>
            <Ionicons name="remove" size={28} color={'gray'} />
          </Pressable>
        )}
        {count > 0 && (
          <Text size="lg" lineHeight={'$2xl'} mx={'$1'} textAlign="center">
            {count}
            {' g'}
          </Text>
        )}
        <Pressable onPress={addCount}>
          <Ionicons name="add" size={28} color={'#273386'} />
        </Pressable>
      </HStack>
    </HStack>
  )
}
export default ItemPersonalizavel
