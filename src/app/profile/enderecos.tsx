import Header from '@/components/header'
import { useAuth } from '@/context/auth'
import {
  Heading,
  Input,
  InputField,
  VStack,
  Text,
  Button,
  ButtonText,
} from '@gluestack-ui/themed'
import { useState } from 'react'
import { api } from '../server/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthData {
  id: string
  nome?: string
  email: string
  endereco?: string
}

export default function Enderecos() {
  const { user, setUser } = useAuth()
  const [newEndereco, setNewEndereco] = useState('')

  const atualizarEndereco = async () => {
    try {
      await api.patch(`/endereco?id=${user?.id}`, { endereco: newEndereco })
      if (user) {
        const updatedUser: AuthData = {
          ...user,
          endereco: newEndereco,
        }
        setUser(updatedUser)
        await AsyncStorage.setItem('@AuthData', JSON.stringify(updatedUser))
      }
    } catch (error) {
      console.error('Erro ao atualizar o endereço', error)
    }
  }

  return (
    <VStack flex={1}>
      <Header />
      <VStack flex={1} justifyContent="center" mx={'$4'}>
        <Heading textAlign="center" mb={'$4'} size="xl">
          Meu Endereço
        </Heading>
        <Text color="$coolGray400">Insira o seu novo endereço</Text>
        <Input variant="outline">
          <InputField
            onChangeText={setNewEndereco}
            placeholder={user?.endereco || 'Rua Exemplo, 693 - Bairro'}
          />
        </Input>
        <Text size="2xs" color="$coolGray600" mx={'$1'} textAlign="right">
          Insira o endereço como o exemplo
        </Text>
        <Button mt={'$24'} onPress={atualizarEndereco}>
          <ButtonText>Atualizar endereço</ButtonText>
        </Button>
      </VStack>
    </VStack>
  )
}
