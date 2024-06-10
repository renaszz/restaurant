import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '@/context/auth'
import {
  VStack,
  HStack,
  Image,
  Heading,
  Button,
  ButtonText,
  Alert,
  Text,
} from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import Input from '@/components/InputLogin'
import { Ionicons } from '@expo/vector-icons'

const signUpSchema = yup.object({
  nome: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup
    .string()
    .required('Informe a senha')
    .min(8, 'A senha deve ter pelo menos 8 dígitos'),
  confirmPassword: yup
    .string()
    .required('Informe a confirmação de senha')
    .oneOf([yup.ref('password'), ''], 'As senhas não coincidem'),
})

type FormSignUp = {
  nome: string
  email: string
  password: string
  confirmPassword: string
}

export default function SignUp() {
  const { signUp, errorMessage } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignUp>({
    resolver: yupResolver(signUpSchema),
  })

  async function handleSignUp(data: FormSignUp) {
    await signUp(data.nome, data.email, data.password)
  }

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
          resizeMode="cover"
          position="absolute"
          alt="logo"
        />
        <HStack justifyContent="space-around" mb={'$2'}>
          <Link href="/" asChild>
            <Heading size="2xl" color="$white">
              Login
            </Heading>
          </Link>
          <Heading
            size="2xl"
            color="$white"
            style={{ borderBottomWidth: 2, borderColor: 'white' }}
          >
            Registrar-se
          </Heading>
        </HStack>
      </VStack>
      <VStack flex={1} mx={'$4'} my={'$8'}>
        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Seu Nome"
              onChangeText={onChange}
              errorMessage={errors.nome?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Endereço de e-mail"
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Confirme a Senha"
              secureTextEntry
              onChangeText={onChange}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />
        {errorMessage && (
          <Alert mt="$2" action="error" bg="$red100" variant="outline">
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="black"
            />
            <Text>{errorMessage}</Text>
          </Alert>
        )}
        <Button my={'$8'} bg="#273386" onPress={handleSubmit(handleSignUp)}>
          <ButtonText size="xl">REGISTRAR-SE</ButtonText>
        </Button>
      </VStack>
    </VStack>
  )
}
