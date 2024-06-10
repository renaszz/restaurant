import { useBag } from '@/context/bag'
import { Heading, Image, Pressable } from '@gluestack-ui/themed'
import { useRouter } from 'expo-router'

const Banner = () => {
  const router = useRouter()
  const { addProduto } = useBag()
  const quant = 1
  const addBag = () => {
    addProduto({
      id: '7e9ab359-3a71-454b-97f9-d7ec55ec6947',
      nome: 'Moda da Casa',
      preco: 16,
      image:
        'https://utfs.io/f/a787670b-95ac-4858-a79d-aa7ec55d58b6-447mnh.png',
      quant,
    })
    router.replace('/profile/sacola')
  }
  return (
    <Pressable onPress={addBag}>
      <Heading>OFERTA IMPERDÍVEL!!</Heading>
      <Image
        mt={'-$4'}
        w={'100%'}
        h={'100%'}
        resizeMode="contain"
        source={require('../assets/promo-banner.png')}
        alt="promo-banner"
      />
    </Pressable>
  )
}

export default Banner
