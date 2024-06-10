import {
  Image,
  HStack,
  Heading,
  Text,
  VStack,
  Checkbox,
  CheckboxIndicator,
} from '@gluestack-ui/themed'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { ItemTradicionalProps } from '@/@types/interfaces'

const ItemTradicional = ({
  secao,
  onSelection,
  onDeselection,
  maxAtingido,
}: ItemTradicionalProps) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleChange = (checked: boolean) => {
    if (checked && !maxAtingido) {
      return
    }
    setIsSelected(checked)
    if (checked) {
      onSelection(secao.nome)
    } else {
      onDeselection(secao.nome)
    }
  }

  return (
    <Checkbox
      value="default"
      size="md"
      isChecked={isSelected}
      onChange={handleChange}
      aria-label="options"
    >
      <HStack
        flex={1}
        borderTopWidth={0.5}
        borderColor="$coolGray300"
        h={100}
        mx={2}
      >
        <Image
          resizeMode="cover"
          w={90}
          h={90}
          alignSelf="center"
          rounded={'$2xl'}
          source={{
            uri: secao.imagemURL,
          }}
          alt={secao.nome}
        />
        <VStack flex={1} mr={40}>
          <Heading pl={'$2'} mt={'$2'}>
            {secao.nome}
          </Heading>
          <Text pl={'$2'} size="xs">
            {secao.descricao}
          </Text>
        </VStack>
        <VStack justifyContent="center">
          <CheckboxIndicator mr="$6">
            <Ionicons name="checkmark-sharp" size={14} color="white" />
          </CheckboxIndicator>
        </VStack>
      </HStack>
    </Checkbox>
  )
}
export default ItemTradicional
