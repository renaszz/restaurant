import { Toast, VStack, useToast, ToastTitle } from '@gluestack-ui/themed'

const MenssagemAdmin = () => {
  const toast = useToast()

  const showToast = () => {
    toast.show({
      placement: 'bottom',
      duration: 2500,
      render: ({ id }) => {
        const toastId = 'toast-' + id
        return (
          <Toast nativeID={toastId} bg="#5cb85c">
            <VStack>
              <ToastTitle bold color="$white">
                Item atualizado com sucesso
              </ToastTitle>
            </VStack>
          </Toast>
        )
      },
    })
  }

  return showToast
}

export default MenssagemAdmin
