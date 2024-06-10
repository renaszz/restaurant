// import Input from '@/components/search'
import { HStack, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Carrossel } from '@/components/carrossel'
import ListaCategorias from '@/components/listaCategoria'
import Header from '@/components/header'
import Banner from '@/components/banner'

export default function Home() {
  return (
    <VStack flex={1} mx={5} gap={'$4'}>
      <Header />
      <VStack flex={1}>
        <Banner />
      </VStack>
      <VStack flex={1}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          px={'$2'}
          pb={'$2'}
        >
          <Heading>Cardápio de Hoje!</Heading>
          <Link href="/cardapio" asChild>
            <Pressable>
              <HStack>
                <Text color="$blue700" size="md" lineHeight={'$md'}>
                  Ver tudo
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={'#1d4ed8'}
                />
              </HStack>
            </Pressable>
          </Link>
        </HStack>
        <Carrossel />
      </VStack>
      <VStack flex={1}>
        <Heading pt={'$8'} pb={'$3'} px={'$2'}>
          Todas as categorias
        </Heading>
        <ListaCategorias />
      </VStack>
    </VStack>
  )
}
