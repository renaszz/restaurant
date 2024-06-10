import { Link, Tabs } from 'expo-router'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { Fab, View } from '@gluestack-ui/themed'
import { useBag } from '@/context/bag'

export default function TabLayout() {
  const { totalQuant } = useBag()

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { color: '#273386' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({ size, color, focused }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={focused ? '#273386' : color}
              />
            ),
            tabBarLabelStyle: {
              color: '#273386',
            },
          }}
        />
        <Tabs.Screen
          name="cardapio"
          options={{
            tabBarLabel: 'Cardápio',
            tabBarIcon: ({ size, color, focused }) => (
              <Ionicons
                name={focused ? 'restaurant' : 'restaurant-outline'}
                size={size}
                color={focused ? '#273386' : color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="pedidos"
          options={{
            tabBarLabel: 'Meus Pedidos',
            tabBarIcon: ({ size, color, focused }) => (
              <Ionicons
                name={focused ? 'receipt' : 'receipt-outline'}
                size={size}
                color={focused ? '#273386' : color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ size, color, focused }) => (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={focused ? '#273386' : color}
              />
            ),
          }}
        />
      </Tabs>
      {totalQuant > 0 && (
        <Link href={'profile/sacola'} asChild>
          <Fab
            placement="bottom right"
            bg="#273386"
            size="lg"
            right="$4"
            bottom={'$16'}
          >
            <AntDesign name="shoppingcart" size={24} color="white" />
          </Fab>
        </Link>
      )}
    </View>
  )
}
