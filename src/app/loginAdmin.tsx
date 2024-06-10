import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '@/context/auth'
import {
  VStack,
  Image,
  Button,
  ButtonText,
  Alert,
  Text,
  Pressable,
} from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import Input from '@/components/InputLogin'
import { Ionicons } from '@expo/vector-icons'
import { FormSignIn } from '@/@types/FormLogin'

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail'),
  password: yup.string().required('Informe a senha'),
})

export default function SignInAdmin() {
  const { signInAdmin, errorMessage } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignIn>({
    resolver: yupResolver(signInSchema),
  })

  async function handleSignIn(data: FormSignIn) {
    await signInAdmin(data.email, data.password)
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
        <Link href={'/'} asChild>
          <Pressable>
            <Image
              source={require('../assets/logo.png')}
              w={'$full'}
              h={'$full'}
              resizeMode="cover"
              alt="logo"
            />
          </Pressable>
        </Link>
      </VStack>
      <VStack flex={1} mx={'$4'} my={'$8'}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <Input
              variant="underlined"
              placeholder="E-mail"
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
              variant="underlined"
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              errorMessage={errors.password?.message}
            />
          )}
        />
        {errorMessage && (
          <Alert
            mt="$4"
            mb={'-$10'}
            action="error"
            bg="$red100"
            variant="outline"
          >
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="black"
            />
            <Text>{errorMessage}</Text>
          </Alert>
        )}
        <Button mt={'$20'} bg="#273386" onPress={handleSubmit(handleSignIn)}>
          <ButtonText size="xl">ENTRAR</ButtonText>
        </Button>
      </VStack>
    </VStack>
  )
}
