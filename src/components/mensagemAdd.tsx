import { Toast, VStack, useToast, ToastTitle } from '@gluestack-ui/themed'

const MenssagemAdd = () => {
  const toast = useToast()

  const showToast = () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: ({ id }) => {
        const toastId = 'toast-' + id
        return (
          <Toast nativeID={toastId} bg="#39e75f" mt={'$8'} mb={'-$6'}>
            <VStack>
              <ToastTitle bold color="$white">
                O item foi adicionado à sua sacola
              </ToastTitle>
            </VStack>
          </Toast>
        )
      },
    })
  }

  return showToast
}

export default MenssagemAdd
