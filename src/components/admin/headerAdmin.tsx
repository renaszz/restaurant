import { HStack, Image, Pressable, View } from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import LogoutAdmin from './logoutAdmin'

const HeaderAdmin = () => {
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
      <Link href={'(admin)'} asChild>
        <Pressable>
          <Image source={require('../../assets/logo.png')} alt="logo" />
        </Pressable>
      </Link>
      <View mr={'$4'}>
        <LogoutAdmin />
      </View>
    </HStack>
  )
}

export default HeaderAdmin
