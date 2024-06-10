import { useAuth } from '@/context/auth'
import { api } from '../server/api'
import { useBag } from '@/context/bag'
import { router, Link } from 'expo-router'
import {
  Button,
  VStack,
  ButtonText,
  Card,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioIcon,
  CircleIcon,
  Text,
  Input,
  InputField,
  Icon,
  EditIcon,
  Pressable,
} from '@gluestack-ui/themed'
import Header from '@/components/header'
import { FontAwesome6, Ionicons, Octicons } from '@expo/vector-icons'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Pagamento() {
  const { produtos, subtotal, total, esvaziar } = useBag()
  const { user, setUser } = useAuth()
  const [selectedMetodoPay, setSelectedMetodoPay] = useState('')
  const [newEndereco, setNewEndereco] = useState(user?.endereco || '')

  const finalizarPagamento = async () => {
    await api.post('/pedidos', {
      userId: user?.id,
      produtos: produtos.map((produto) => ({
        id: produto.id,
        quant: produto.quant,
        descricao: produto.descricao ? produto.descricao.join(', ') : null,
      })),
      taxaEntrega: 8.0,
      tempoEstimado: 30,
      subtotal,
      total,
      metodoPay: selectedMetodoPay,
    })
    router.navigate('(tabs)/pedidos')
    esvaziar()
  }

  const atualizarEndereco = async () => {
    try {
      await api.patch(`/endereco?id=${user?.id}`, { endereco: newEndereco })

      if (user) {
        const updatedUser = {
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
      {!user?.endereco ? (
        <>
          <Heading textAlign="center" mt={'$48'} mb={'$4'} size="xl">
            Confirmar Endereço
          </Heading>
          <Text color="$coolGray400" mx={'$4'}>
            Insira o seu endereço
          </Text>
          <Input variant="outline" mx={'$4'}>
            <InputField
              onChangeText={setNewEndereco}
              placeholder={user?.endereco || 'Rua Exemplo, 693 - Bairro'}
            />
          </Input>
          <Text size="2xs" color="$coolGray600" textAlign="right" mx={'$5'}>
            Insira o endereço como o exemplo
          </Text>
          <Button bg="#273386" mt={'$16'} onPress={atualizarEndereco} mx={'$4'}>
            <ButtonText>Confirmar endereço</ButtonText>
          </Button>
        </>
      ) : (
        <>
          <Link href={'profile/enderecos'} asChild>
            <Pressable>
              <HStack mt={'$2'}>
                <Text ml={'$4'} color="$coolGray500" size="xs">
                  Endereço de entrega: {user.endereco}
                </Text>
                <Icon as={EditIcon} ml={'$1'} mt={'$0.5'} w="$4" h="$4" />
              </HStack>
            </Pressable>
          </Link>
          <Heading textAlign="center" mb={'$2'} size="xl">
            Qual será a forma de pagamento?
          </Heading>
          <VStack flex={1} m={'$4'} mt={'$6'}>
            <RadioGroup
              value={selectedMetodoPay}
              onChange={setSelectedMetodoPay}
            >
              <Radio value="DINHEIRO">
                <Card
                  w={'$full'}
                  h={'$40'}
                  bg="$blueGray200"
                  justifyContent="center"
                  mb={'$6'}
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <HStack gap={'$4'}>
                      <Ionicons name="cash-outline" size={48} color="#273386" />
                      <Heading lineHeight={'$3xl'}>Dinheiro</Heading>
                    </HStack>
                    <RadioIndicator>
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                  </HStack>
                </Card>
              </Radio>
              <Radio value="CARTAO">
                <Card
                  w={'$full'}
                  h={'$40'}
                  bg="$blueGray200"
                  justifyContent="center"
                  mb={'$6'}
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <HStack gap={'$4'}>
                      <Octicons name="credit-card" size={48} color="#273386" />
                      <Heading lineHeight={'$4xl'}>
                        Cartão de Crédito/Débito
                      </Heading>
                    </HStack>
                    <RadioIndicator>
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                  </HStack>
                </Card>
              </Radio>
              <Radio value="PIX">
                <Card
                  w={'$full'}
                  h={'$40'}
                  bg="$blueGray200"
                  justifyContent="center"
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <HStack gap={'$4'}>
                      <FontAwesome6 name="pix" size={48} color="#273386" />
                      <Heading lineHeight={'$4xl'}>Pix</Heading>
                    </HStack>
                    <RadioIndicator>
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                  </HStack>
                </Card>
              </Radio>
            </RadioGroup>
          </VStack>
          <VStack justifyContent="flex-end" m={'$2'}>
            <Button bg="#273386" h={'$12'} onPress={finalizarPagamento}>
              <ButtonText>Finalizar Pedido</ButtonText>
            </Button>
          </VStack>
        </>
      )}
    </VStack>
  )
}
