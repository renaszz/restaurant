import { AuthProvider } from '@/context/auth'
import { BagProvider } from '@/context/bag'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider, StatusBar } from '@gluestack-ui/themed'
import { Slot } from 'expo-router'

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <BagProvider>
        <StatusBar barStyle={'dark-content'} />
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </BagProvider>
    </GluestackUIProvider>
  )
}
