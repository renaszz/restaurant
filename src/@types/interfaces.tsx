import { Acompanhamentos, Carnes, Legumes, Saladas } from '@prisma/client'

export interface ItemTradicionalProps {
  secao: Acompanhamentos | Carnes | Saladas | Legumes
  onSelection: (nome: string) => void
  onDeselection: (nome: string) => void
  maxAtingido: boolean
}

export interface ListaTradicionalProps {
  secao: string
  maxOpcoes: number
}

export interface ListaPersonalizavelProps {
  secao: string
}

export interface ItemPersonalizavelProps {
  secao: Acompanhamentos | Carnes | Saladas | Legumes
}

export interface PedidoComUsuario {
  id: string
  userId: string
  subtotal: number
  total: number
  createdAt: Date
  status: string
  metodoPay: string
  user: {
    nome: string
    endereco: string | null
  }
  produtos: {
    id: number
    quant: number
    descricao?: string
    produtos: {
      nome: string
    }
  }[]
}
