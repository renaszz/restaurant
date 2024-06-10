import ListaMarmitex from '@/components/listaMarmitex'
import { Heading, Image, VStack } from '@gluestack-ui/themed'
import ParallaxScrollView from '../../../components/ParallaxScrollView'
import ListaBebidas from '@/components/listaBebidas'
import Restaurante from '@/components/restaurante'

export default function Cardapio() {
  return (
    <ParallaxScrollView
      headerImage={
        <Image
          w={'$full'}
          h={250}
          resizeMode="cover"
          source={require('../../assets/banner.png')}
          alt="Restaurante Central"
        />
      }
    >
      <VStack
        mt={-30}
        bg="#f2f2f2"
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
      >
        <Restaurante />
        <Heading p={'$3'} size="xl">
          Marmitex
        </Heading>
        <ListaMarmitex />
        <Heading p={'$3'} size="xl">
          Bebidas
        </Heading>
        <ListaBebidas />
      </VStack>
    </ParallaxScrollView>
  )
}
