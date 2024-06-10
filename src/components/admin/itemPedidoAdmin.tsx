import React, { useState, useRef } from 'react'
import {
  Box,
  HStack,
  Heading,
  Pressable,
  Text,
  VStack,
  Button,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ButtonText,
} from '@gluestack-ui/themed'
import { Ionicons } from '@expo/vector-icons'
import { PedidoComUsuario } from '@/@types/interfaces'
import { api } from '@/app/server/api'

interface ItemPedidoAdminProps {
  pedido: PedidoComUsuario & {
    produtos: {
      id: number
      quant: number
      descricao?: string
      produtos: {
        nome: string
      }
    }[]
  }
  onRefresh: () => void
}

const ItemPedidoAdmin = ({ pedido, onRefresh }: ItemPedidoAdminProps) => {
  const [showModal, setShowModal] = useState(false)
  const ref = useRef(null)

  const cancelarPedido = async (id: string) => {
    try {
      await api.patch(`/admin/statusPedido?id=${id}`, {
        status: 'CANCELADO',
      })
      onRefresh()
    } catch (error) {
      console.error('Erro ao cancelar o pedido', error)
    }
  }

  const aceitarPedido = async (id: string) => {
    try {
      await api.patch(`/admin/statusPedido?id=${id}`, {
        status: 'PREPARANDO',
      })
      onRefresh()
    } catch (error) {
      console.error('Erro ao aceitar o pedido', error)
    }
  }

  return (
    <Box
      p={'$3'}
      borderWidth={'$1'}
      borderColor="$blueGray200"
      m={'$2'}
      borderRadius="$2xl"
    >
      <VStack gap={'$1.5'}>
        <HStack justifyContent="space-between">
          <Text bold>Pedido feito por: </Text>
          <Text bold color="$black">
            {pedido.user.nome}
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text bold>Endereço: </Text>
          <Text>{pedido.user.endereco}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text bold>Método de Pagamento: </Text>
          <Text>{pedido.metodoPay}</Text>
        </HStack>
        <HStack mt={'$1'} justifyContent="space-between">
          <Text bold>Subtotal </Text>
          <Text>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(pedido.subtotal))}
          </Text>
        </HStack>
        <HStack mt={'$1'} justifyContent="space-between">
          <Text bold>Total </Text>
          <Text bold color="black">
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(pedido.total))}
          </Text>
        </HStack>
        <HStack mt={'$1'} justifyContent="space-between">
          <Text size="xs">ID do Pedido:</Text>
          <Text size="xs">{pedido.id}</Text>
        </HStack>
        <Text size="xs" textAlign="right">
          Pedido feito em:{' '}
          {new Date(
            new Date(pedido.createdAt).getTime() - 3 * 60 * 60 * 1000,
          ).toLocaleString('pt-BR')}
        </Text>
      </VStack>
      <HStack alignItems="center">
        <Pressable onPress={() => setShowModal(true)}>
          <Text mt={'$4'} color="#273386">
            Ver Detalhes
          </Text>
        </Pressable>
        <HStack
          flex={1}
          alignItems="center"
          justifyContent="flex-end"
          mt={'$4'}
          gap={'$2'}
        >
          <Heading size="md">Aceitar pedido?</Heading>
          <Pressable onPress={() => cancelarPedido(pedido.id)}>
            <Ionicons name="close-circle-sharp" size={40} color={'red'} />
          </Pressable>
          <Pressable onPress={() => aceitarPedido(pedido.id)}>
            <Ionicons
              name="checkmark-circle-sharp"
              size={40}
              color={'#39e75f'}
            />
          </Pressable>
        </HStack>
      </HStack>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        finalFocusRef={ref}
        size="lg"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Detalhes do Pedido</Heading>
            <ModalCloseButton>
              <Ionicons name="close-circle-outline" size={28} color="black" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            {pedido.produtos.map((pedido) => (
              <HStack key={pedido.id} alignItems="center" mt={'$2'}>
                <Text
                  w={'$6'}
                  h={'$6'}
                  rounded={'$full'}
                  bg="$blueGray400"
                  textAlign="center"
                  color="$white"
                  lineHeight={'$lg'}
                >
                  {pedido.quant}
                </Text>
                <VStack mx={'$1.5'}>
                  <Heading size="sm">{pedido.produtos.nome}</Heading>
                  {pedido.descricao && (
                    <Text mr={'$1.5'}>{pedido.descricao}</Text>
                  )}
                </VStack>
              </HStack>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="solid"
              size="md"
              action="negative"
              mr="$3"
              onPress={() => setShowModal(false)}
            >
              <ButtonText>Fechar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ItemPedidoAdmin
