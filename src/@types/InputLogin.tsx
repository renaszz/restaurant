export interface InputProps {
  placeholder: string
  errorMessage?: string | null
  secureTextEntry?: boolean
  variant?: 'outline' | 'rounded' | 'underlined'
  onChangeText?: (text: string) => void
}
