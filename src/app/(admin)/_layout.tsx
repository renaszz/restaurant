import { View } from '@gluestack-ui/themed'
import HeaderAdmin from '@/components/admin/headerAdmin'
import { Stack } from 'expo-router'

export default function TabLayoutaAdmin() {
  return (
    <View flex={1}>
      <HeaderAdmin />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </View>
  )
}
