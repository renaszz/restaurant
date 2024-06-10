import { useBag } from '@/context/bag'
import { useState } from 'react'
import Header from '@/components/header'
import {
  VStack,
  Text,
  Box,
  Pressable,
  HStack,
  Heading,
  Image,
  Button,
  ButtonText,
  Alert,
} from '@gluestack-ui/themed'
import { Link, useRouter } from 'expo-router'
import ItemSacola from '@/components/itemSacola'
import { FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function Sacola() {
  const { produtos, subtotal, total, totalQuant, esvaziar } = useBag()
  const router = useRouter()
  const [message, setMessage] = useState<string | null>(null)

  const format = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const esvaziou = () => {
    esvaziar()
    router.replace('(tabs)')
  }

  const finalizarPedido = () => {
    if (subtotal < 16) {
      setMessage('O Pedido mínimo é R$16,00, sem contar a taxa de entrega')
    } else {
      router.navigate('profile/finalizar')
    }
  }

  return (
    <VStack flex={1} mx={5}>
      <Header />
      {totalQuant > 0 ? (
        <>
          <HStack justifyContent="space-between" alignItems="center" my={'$2'}>
            <Heading ml={'$2'}>Itens adicionados</Heading>
            <Pressable
              onPress={esvaziou}
              mt={'$2'}
              mr={'$2'}
              alignItems="flex-end"
            >
              <HStack>
                <Text underline color="red" lineHeight={'$xl'}>
                  Esvaziar Sacola{' '}
                </Text>
                <Ionicons name="trash-outline" size={28} color={'red'} />
              </HStack>
            </Pressable>
          </HStack>
          <FlatList
            data={produtos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ItemSacola produto={item} format={format} />
            )}
          />
          {message && (
            <Alert action="error" bg="$red100" mb={'$4'} variant="outline">
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="black"
              />
              <Text>{message}</Text>
            </Alert>
          )}
          <Box gap={'$2'} justifyContent="flex-end" p={'$2'}>
            <HStack justifyContent="space-between">
              <Text>Subtotal </Text>
              <Text color="black">{format(subtotal)}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Taxa de entrega</Text>
              <Text color="black">R$8,00</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text bold>Total</Text>
              <Text bold color="black">
                {format(total)}
              </Text>
            </HStack>
            <Button mt={'$2'} bg="#273386" h={'$12'} onPress={finalizarPedido}>
              <ButtonText>Finalizar Pedido</ButtonText>
            </Button>
          </Box>
        </>
      ) : (
        <VStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          gap={'$2'}
          mb={'$32'}
        >
          <Image
            source={require('../../assets/vazio.png')}
            resizeMode="stretch"
            w={'$48'}
            h={'$48'}
            alt="vazio"
          />
          <Heading size="xl">Poxa, não há itens na sacola.</Heading>
          <Link href={'(tabs)'} asChild>
            <Button bg="#273386" mt={'$2'}>
              <ButtonText>Voltar para a Home</ButtonText>
            </Button>
          </Link>
        </VStack>
      )}
    </VStack>
  )
}
