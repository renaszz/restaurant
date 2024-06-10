import { InputProps } from '@/@types/InputLogin'
import {
  FormControl,
  FormControlErrorText,
  Input as InputLogin,
  InputField,
} from '@gluestack-ui/themed'

const Input = ({
  placeholder,
  errorMessage = null,
  secureTextEntry,
  variant = 'outline',
  onChangeText,
}: InputProps) => {
  const isInvalid = !!errorMessage

  return (
    <FormControl isInvalid={isInvalid}>
      <InputLogin variant={variant} size="lg" mt={'$4'} isInvalid={isInvalid}>
        <InputField
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          onChangeText={onChangeText}
        />
      </InputLogin>
      {isInvalid && <FormControlErrorText>{errorMessage}</FormControlErrorText>}
    </FormControl>
  )
}

export default Input
