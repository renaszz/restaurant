import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  Heading,
  Text,
  ButtonText,
  ButtonGroup,
  Pressable,
  View,
} from '@gluestack-ui/themed'
import { useAuth } from '@/context/auth'

const Logout = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const { signOut } = useAuth()

  return (
    <View>
      <Pressable onPress={() => setShowAlertDialog(true)}>
        <Ionicons name="log-out-outline" size={32} color={'red'} />
      </Pressable>

      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Deseja sair da conta?</Heading>
            <AlertDialogCloseButton>
              <Ionicons name="close" size={24} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">Tem certeza que deseja sair da sua conta?</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => setShowAlertDialog(false)}
              >
                <ButtonText>Cancelar</ButtonText>
              </Button>
              <Button bg="$error600" action="negative" onPress={signOut}>
                <ButtonText>Sair</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  )
}

export default Logout
