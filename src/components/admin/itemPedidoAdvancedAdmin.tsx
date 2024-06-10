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
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
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

const ItemPedidoAdvancedAdmin = ({
  pedido,
  onRefresh,
}: ItemPedidoAdminProps) => {
  const [showModal, setShowModal] = useState(false)
  const ref = useRef(null)

  const handleStatusChange = async (newStatus: string) => {
    try {
      await api.patch(`/admin/statusPedido?id=${pedido.id}`, {
        status: newStatus,
      })
      onRefresh()
    } catch (error) {
      console.error('Erro ao atualizar o status do pedido', error)
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
          <Text bold>Método de pagamento: </Text>
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
      <HStack justifyContent="space-between">
        <Pressable onPress={() => setShowModal(true)}>
          <Text mt={'$4'} color="#273386">
            Ver Detalhes
          </Text>
        </Pressable>
        <Select
          initialLabel={pedido.status}
          onValueChange={handleStatusChange}
          w={'$48'}
          mt={'$2'}
        >
          <SelectTrigger variant="outline" size="md">
            <SelectInput />
            <Ionicons
              name="chevron-down"
              size={18}
              color={'black'}
              style={{ marginRight: 10 }}
            />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Preparando" value="PREPARANDO" />
              <SelectItem label="Em transporte" value="TRANSPORTE" />
              <SelectItem label="Pedido Concluído" value="CONCLUIDO" />
              <SelectItem label="Cancelar Pedido" value="CANCELADO" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </HStack>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        finalFocusRef={ref}
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
            {pedido.produtos.map((produto) => (
              <VStack key={produto.id}>
                <HStack alignItems="center" mt={'$2'}>
                  <Text
                    w={'$6'}
                    h={'$6'}
                    rounded={'$full'}
                    bg="$blueGray400"
                    textAlign="center"
                    color="$white"
                    lineHeight={'$lg'}
                  >
                    {produto.quant}
                  </Text>
                  <Heading mx={'$1.5'} size="sm">
                    {produto.produtos.nome}
                  </Heading>
                </HStack>
                {produto?.descricao && <Text>{produto.descricao}</Text>}
              </VStack>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="solid"
              size="sm"
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

export default ItemPedidoAdvancedAdmin
