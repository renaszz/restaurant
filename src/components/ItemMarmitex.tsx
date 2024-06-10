import { calculoDesconto } from '@/app/server/descontos'
import { useBag } from '@/context/bag'
import {
  Card,
  Heading,
  Image,
  Pressable,
  Text,
  View,
} from '@gluestack-ui/themed'
import { Produtos } from '@prisma/client'
import { router } from 'expo-router'
import MenssagemAdd from './mensagemAdd'

interface ItemProdutoProps {
  produtos: Produtos
}

const ItemMarmitex = ({ produtos }: ItemProdutoProps) => {
  const { addProduto } = useBag()
  const toast = MenssagemAdd()
  const quant = 1

  const addBag = () => {
    addProduto({
      id: produtos.id,
      nome: produtos.nome,
      preco: calculoDesconto({ produtos }),
      image: produtos.imagemUrl,
      quant,
    })
    toast()
  }
  const handlePress = () => {
    if (produtos.nome === 'Moda da Casa') {
      addBag()
    } else if (produtos.nome === 'Personalizável') {
      router.navigate('/marmitex/personalizavel')
    } else if (produtos.nome === 'Tradicional') {
      router.navigate('/marmitex/tradicional')
    }
  }
  return (
    <View flex={1} mx="$1">
      <Pressable onPress={handlePress}>
        <Card p="$1" borderRadius="$lg" h={150}>
          <Image
            resizeMode="cover"
            w={90}
            h={90}
            mt={-10}
            rounded="$md"
            alignSelf="center"
            source={{
              uri: produtos.imagemUrl,
            }}
            alt={produtos.nome}
          />
          <Text size="md" isTruncated>
            {produtos.nome}
          </Text>
          <Heading size="xl" lineHeight={'$lg'} mt={'$2'}>
            R$
            {Intl.NumberFormat('pt-br', {
              currency: 'BRL',
              minimumFractionDigits: 2,
            }).format(calculoDesconto({ produtos }))}
          </Heading>
          {produtos.nome === 'Personalizável' && (
            <Text
              lineHeight={'$xs'}
              size="sm"
              color="black"
              mt={'-$2'}
              textAlign="right"
            >
              o kg
            </Text>
          )}
          {produtos.porcentagemDesconto > 0 && (
            <Text
              size="xs"
              strikeThrough
              color="#7E8392"
              mt={'-$2'}
              textAlign="right"
            >
              R$
              {Intl.NumberFormat('pt-br', {
                currency: 'BRL',
                minimumFractionDigits: 2,
              }).format(Number(produtos.preco))}
            </Text>
          )}
        </Card>
      </Pressable>
    </View>
  )
}

export default ItemMarmitex
