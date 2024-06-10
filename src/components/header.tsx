import { HStack, Image, Pressable } from '@gluestack-ui/themed'
import { Link } from 'expo-router'

const Header = () => {
  return (
    <HStack
      h={85}
      pt={25}
      mx={-5}
      bg="$white"
      elevation={'$4'}
      alignItems="center"
      justifyContent="space-between"
    >
      <Link href={'(tabs)'} asChild>
        <Pressable>
          <Image source={require('../assets/logo.png')} alt="logo" />
        </Pressable>
      </Link>
    </HStack>
  )
}

export default Header
