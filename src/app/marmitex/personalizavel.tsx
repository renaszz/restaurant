import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { api } from '../server/api'
import { Produtos } from '@prisma/client'
import {
  HStack,
  Heading,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed'
import { Ionicons } from '@expo/vector-icons'
import ListaPersonalizavel from '@/components/personalizavel/listaPersonalizavel'
import { useBag } from '@/context/bag'

export default function Personalizavel() {
  const [marmitex, setMarmitex] = useState<Produtos[]>([])
  const [loading, setLoading] = useState(true)
  const { addProduto } = useBag()

  useEffect(() => {
    const getMarmitex = async () => {
      try {
        const response = await api.get<Produtos[]>('/marmitex')
        setMarmitex(response.data)
      } catch (error) {
        console.error('Erro ao buscar as marmitex:', error)
      } finally {
        setLoading(false)
      }
    }

    getMarmitex()
  }, [])

  // function submitPersonalizavel(){
  //   result = count / 1000 * 49.9
  //   if(count) < 300{
  //     setMessage('A marmitex Personalizável precisa ter ao menos 300 gramas')
  //   }
  // }
  const addBag = () => {
    if (produto) {
      addProduto({
        id: produto.id,
        nome: produto.nome,
        preco: Number(34.93),
        image: produto.imagemUrl,
        quant: 1,
      })
      router.replace('profile/sacola')
    }
  }

  const produto = marmitex.find((item) => item.nome === 'Personalizável')

  return (
    <>
      {loading ? (
        <VStack flex={1} alignItems="center" justifyContent="center">
          <Spinner size={'large'} />
        </VStack>
      ) : (
        <View flex={1}>
          <ScrollView flex={1} bg="white">
            <HStack mx={'$4'} mt={'$10'} gap={15} alignItems="center">
              <Link href={'/cardapio'} asChild>
                <Ionicons name="chevron-back" size={32} color={'#273386'} />
              </Link>
              <Heading size="xl" textTransform="uppercase">
                {produto?.nome}
              </Heading>
            </HStack>
            <VStack
              flex={1}
              borderBottomWidth={0.5}
              pb={'$4'}
              borderColor="$coolGray300"
              mx={'$2'}
              mt={'$4'}
            >
              <Text>{produto?.descricao}</Text>
            </VStack>
            <HStack
              flex={1}
              bg="#f2f2f2"
              h={'$20'}
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading mx={'$4'} size="xl">
                ACOMPANHAMENTOS
              </Heading>
            </HStack>
            <ListaPersonalizavel secao="acompanhamentos" />
            <HStack
              flex={1}
              bg="#f2f2f2"
              h={'$20'}
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading mx={'$4'} size="xl">
                CARNES
              </Heading>
            </HStack>
            <ListaPersonalizavel secao="carnes" />
            <HStack
              flex={1}
              bg="#f2f2f2"
              h={'$20'}
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading mx={'$4'} size="xl">
                SALADAS
              </Heading>
            </HStack>
            <ListaPersonalizavel secao="saladas" />
            <HStack
              flex={1}
              bg="#f2f2f2"
              h={'$20'}
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading mx={'$4'} size="xl">
                LEGUMES
              </Heading>
            </HStack>
            <ListaPersonalizavel secao="legumes" />
            <View
              px={'$2'}
              py={'$2'}
              mt={'$2'}
              borderTopWidth={0.5}
              borderColor="$coolGray800"
            >
              <VStack>
                <HStack justifyContent="space-between" mb={'$2'} mx={'$1'}>
                  <Text bold color="$black">
                    Quantidade:
                  </Text>
                  <Text>700 g</Text>
                </HStack>
                <HStack justifyContent="space-between" mb={'$2'} mx={'$1'}>
                  <Text bold color="$black">
                    Total:
                  </Text>
                  <Text>R$34,93</Text>
                </HStack>
              </VStack>
              <Pressable
                rounded={'$lg'}
                w={'$full'}
                bg="#0077e6"
                h={'$16'}
                alignItems="center"
                justifyContent="center"
                onPress={addBag}
              >
                <Text size="lg" color="$white">
                  Adicionar a sacola
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  )
}
