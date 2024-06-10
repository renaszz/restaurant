import { Text, Pressable } from '@gluestack-ui/themed'
import { Categorias } from '@prisma/client'
import { Link } from 'expo-router'
import { Image } from 'react-native'

interface ItemCategoriaProps {
  categorias: Categorias
}

const ItemCategoria = ({ categorias }: ItemCategoriaProps) => {
  return (
    <Link href={'/cardapio'} asChild>
      <Pressable
        flex={1}
        bg="$white"
        softShadow="1"
        shadowColor="#273387"
        p={10}
        mx={3.5}
        rounded="$3xl"
        alignItems="center"
      >
        <Image
          source={{ uri: categorias.imagemURL }}
          alt={categorias.nome}
          style={{ width: 90, height: 70 }}
        />
        <Text size="md" color="$black" bold marginTop={3}>
          {categorias.nome}
        </Text>
      </Pressable>
    </Link>
  )
}

export default ItemCategoria
