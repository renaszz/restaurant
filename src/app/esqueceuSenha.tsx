import {
  Button,
  ButtonText,
  HStack,
  Heading,
  Image,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { Link } from 'expo-router'

export default function esqueceuSenha() {
  return (
    <VStack flex={1} bg="#f2f2f2">
      <VStack
        flex={1}
        elevation={10}
        justifyContent="flex-end"
        bg="#273386"
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}
      >
        <Image
          source={require('../assets/logo.png')}
          w={'$full'}
          h={'$full'}
          resizeMode="contain"
          position="absolute"
          alt="logo"
        />
        <HStack justifyContent="space-around" mb={'$2'}>
          <Link href="/" asChild>
            <Heading size="2xl" color="$white">
              Login
            </Heading>
          </Link>
          <Link href="/signUp" asChild>
            <Heading size="2xl" color="$white">
              Registrar-se
            </Heading>
          </Link>
        </HStack>
      </VStack>
      <VStack flex={1} mx={'$4'} my={'$8'}>
        <Heading>Esqueceu sua Senha?</Heading>
        <Text mt={'$4'} size="lg">
          Sem Problemas, digite o seu email e te enviaremos um link de
          redefinição de senha
        </Text>
        <Input variant="outline" size="lg" mt={'$6'}>
          <InputField type="text" placeholder="Insira seu email" />
        </Input>
        <Button mt={'$12'} bg="#273386">
          <ButtonText size="xl">ENVIAR</ButtonText>
        </Button>
      </VStack>
    </VStack>
  )
}
