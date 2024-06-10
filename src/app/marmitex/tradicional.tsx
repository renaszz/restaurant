import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { api } from '../server/api'
import { Produtos } from '@prisma/client'
import {
  HStack,
  Heading,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
  Spinner,
} from '@gluestack-ui/themed'
import { Ionicons } from '@expo/vector-icons'
import ListaTradicional from '@/components/tradicional/listaTradicional'
import { useBag } from '@/context/bag'

export default function Tradicional() {
  const [marmitex, setMarmitex] = useState<Produtos[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
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

  const produto = marmitex.find((item) => item.nome === 'Tradicional')

  const addBag = () => {
    if (produto) {
      addProduto({
        id: produto.id,
        nome: produto.nome,
        preco: Number(produto.preco),
        image: produto.imagemUrl,
        quant: 1,
        descricao: selectedItems,
      })
      router.replace('profile/sacola')
    }
  }

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
              <Text mx={'$4'} size="sm" maxWidth={90}>
                Selecione até 4 opções
              </Text>
            </HStack>
            <ListaTradicional
              secao="acompanhamentos"
              maxOpcoes={4}
              setSelectedItems={setSelectedItems}
            />
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
              <Text mx={'$4'} size="sm">
                Selecione até 2 opções
              </Text>
            </HStack>
            <ListaTradicional
              secao="carnes"
              maxOpcoes={2}
              setSelectedItems={setSelectedItems}
            />
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
              <Text mx={'$4'} size="sm">
                Selecione uma opção
              </Text>
            </HStack>
            <ListaTradicional
              secao="saladas"
              maxOpcoes={1}
              setSelectedItems={setSelectedItems}
            />
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
            <ListaTradicional
              secao="legumes"
              maxOpcoes={1}
              setSelectedItems={setSelectedItems}
            />
            <View px={'$2'} py={'$2'}>
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
