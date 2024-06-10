import { Ionicons } from '@expo/vector-icons'
import {
  Image,
  HStack,
  Modal,
  ModalBackdrop,
  ModalCloseButton,
} from '@gluestack-ui/themed'
import { useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

export function Carrossel() {
  const width = Dimensions.get('window').width
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  const images = [
    'https://utfs.io/f/15c6f4c5-b8cc-42be-a633-35509df1f85e-40v178.jpg',
    'https://utfs.io/f/bf44ac2f-61b4-4ee6-b9c3-206d5a6b66f2-40v177.jpg',
    'https://utfs.io/f/b7c4b38a-2967-40a9-af35-95e74d2116c1-40v176.jpg',
    'https://utfs.io/f/c8d10aac-9508-4f6f-989d-6d1b7672c15d-40v174.jpg',
    'https://utfs.io/f/1562224f-43eb-45cf-8532-09a109773346-40v173.jpg',
  ]
  const handleImagePress = (image: string) => {
    setSelectedImage(image)
    setShowModal(true)
  }

  return (
    <HStack flex={1}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={2000}
        renderItem={({ item }) => (
          <HStack
            flex={1}
            justifyContent="center"
            borderRadius={20}
            overflow="hidden"
            mr={'$3'}
          >
            <TouchableOpacity
              activeOpacity={1}
              className="flex-1"
              onPress={() => handleImagePress(item)}
            >
              <Image
                w={'$full'}
                h={'$full'}
                resizeMode="cover"
                source={{ uri: item }}
                alt="cardapio de hoje"
              />
            </TouchableOpacity>
            <Modal
              flex={1}
              alignItems="flex-end"
              py={50}
              isOpen={showModal}
              onClose={() => {
                setShowModal(false)
              }}
            >
              <ModalBackdrop />
              <ModalCloseButton>
                <Ionicons name="close-outline" size={38} color="white" />
              </ModalCloseButton>
              <Image
                w={'100%'}
                h={'100%'}
                resizeMode="contain"
                source={{ uri: selectedImage }}
                alt="Imagem ampliada"
              />
            </Modal>
          </HStack>
        )}
      />
    </HStack>
  )
}

export default Carrossel
