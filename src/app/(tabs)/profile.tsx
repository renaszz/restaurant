import Help from '@/components/help'
import Logout from '@/components/logout'
import { useAuth } from '@/context/auth'
import { Entypo, Ionicons, Octicons } from '@expo/vector-icons'
import {
  Avatar,
  VStack,
  Heading,
  HStack,
  View,
  Pressable,
  ScrollView,
} from '@gluestack-ui/themed'
import { Link } from 'expo-router'

export default function Profile() {
  const { user } = useAuth()
  return (
    <ScrollView flex={1} bg="$white">
      <HStack flex={1} gap={'$4'} bg="#f2f2f2" h={'$40'} alignItems="center">
        <Avatar size="lg" bgColor="$indigo600" ml={'$4'}>
          <Ionicons name="person" size={36} color={'#f2f2f2'} />
        </Avatar>
        <Heading size="xl">{user?.nome}</Heading>
        <View flex={1} alignItems="flex-end" mx={'$4'}>
          <Logout />
        </View>
      </HStack>
      <VStack>
        <Link href={'https://contate.me/restaurante-central-unai'} asChild>
          <Pressable>
            <HStack
              h={'$20'}
              borderBottomWidth={0.5}
              borderColor="$coolGray300"
              alignItems="center"
            >
              <View mx={'$6'} w={'$10'}>
                <Ionicons name="logo-whatsapp" size={42} color="#273386" />
              </View>
              <Heading>Nos envie uma mensagem</Heading>
              <View flex={1} alignItems="flex-end" mx={'$2'}>
                <Ionicons name="chevron-forward" size={24} color="#273386" />
              </View>
            </HStack>
          </Pressable>
        </Link>
        <Link href={'/profile/editarPerfil'} asChild>
          <Pressable>
            <HStack
              h={'$20'}
              borderBottomWidth={0.5}
              borderColor="$coolGray300"
              alignItems="center"
            >
              <View mx={'$6'} w={'$10'}>
                <Entypo name="text-document" size={32} color="#273386" />
              </View>
              <Heading>Minhas informações da conta</Heading>
              <View flex={1} alignItems="flex-end" mx={'$2'}>
                <Ionicons name="chevron-forward" size={24} color="#273386" />
              </View>
            </HStack>
          </Pressable>
        </Link>
        <Link href={'/profile/pagamentos'} asChild>
          <Pressable>
            <HStack
              h={'$20'}
              borderBottomWidth={0.5}
              borderColor="$coolGray300"
              alignItems="center"
            >
              <View mx={'$6'} w={'$10'}>
                <Octicons name="credit-card" size={32} color="#273386" />
              </View>
              <Heading>Meus Pagamentos</Heading>
              <View flex={1} alignItems="flex-end" mx={'$2'}>
                <Ionicons name="chevron-forward" size={24} color="#273386" />
              </View>
            </HStack>
          </Pressable>
        </Link>
        <Link href={'/profile/enderecos'} asChild>
          <Pressable>
            <HStack
              h={'$20'}
              borderBottomWidth={0.5}
              borderColor="$coolGray300"
              alignItems="center"
            >
              <View mx={'$6'} w={'$10'}>
                <Entypo name="location-pin" size={32} color="#273386" />
              </View>
              <Heading>Meus Endereços</Heading>
              <View flex={1} alignItems="flex-end" mx={'$2'}>
                <Ionicons name="chevron-forward" size={24} color="#273386" />
              </View>
            </HStack>
          </Pressable>
        </Link>
        <VStack mt={'$12'}>
          <HStack gap={'$4'} mx={'$6'} mb={'$4'}>
            <Ionicons name="help-circle-outline" size={28} color="#273386" />
            <Heading size="md">Ajuda</Heading>
          </HStack>
          <Help />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
