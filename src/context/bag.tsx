import React, { ReactNode, createContext, useState, useContext } from 'react'

export interface Produto {
  id: string
  nome: string
  preco: number
  quant: number
  image: string
  descricao?: string[]
}

interface Sacola {
  produtos: Produto[]
  subtotal: number
  total: number
  totalQuant: number
  addProduto: (produto: Produto) => void
  decreaseBagQuant: (idProduto: string) => void
  increaseBagQuant: (idProduto: string) => void
  removeProduto: (idProduto: string) => void
  esvaziar: () => void
}

const BagContext = createContext<Sacola>({
  produtos: [],
  subtotal: 0,
  total: 0,
  totalQuant: 0,
  addProduto: () => {},
  decreaseBagQuant: () => {},
  increaseBagQuant: () => {},
  removeProduto: () => {},
  esvaziar: () => {},
})

export const useBag = () => useContext(BagContext)

export const BagProvider = ({ children }: { children: ReactNode }) => {
  const [produtos, setProdutos] = useState<Produto[]>([])

  const taxaEntrega = 8

  const subtotal = produtos.reduce(
    (acc, produto) => acc + produto.preco * produto.quant,
    0,
  )

  const total = subtotal + taxaEntrega

  const totalQuant = produtos.reduce((acc, produto) => acc + produto.quant, 0)

  const esvaziar = () => setProdutos([])

  const decreaseBagQuant = (idProduto: string) => {
    setProdutos((current) =>
      current.map((produto) => {
        if (produto.id === idProduto && produto.quant > 1) {
          return {
            ...produto,
            quant: produto.quant - 1,
          }
        }
        return produto
      }),
    )
  }

  const increaseBagQuant = (idProduto: string) => {
    setProdutos((current) =>
      current.map((produto) => {
        if (produto.id === idProduto) {
          return {
            ...produto,
            quant: produto.quant + 1,
          }
        }
        return produto
      }),
    )
  }

  const removeProduto = (idProduto: string) => {
    setProdutos((current) =>
      current.filter((produto) => produto.id !== idProduto),
    )
  }

  const addProduto = (produto: Produto) => {
    const produtoExisteSacola = produtos.some((p) => p.id === produto.id)

    if (produtoExisteSacola) {
      setProdutos((current) =>
        current.map((produtos) => {
          if (produtos.id === produto.id) {
            return {
              ...produtos,
              quant: produtos.quant + produto.quant,
            }
          }
          return produtos
        }),
      )
    } else {
      setProdutos((current) => [...current, produto])
    }
  }

  return (
    <BagContext.Provider
      value={{
        produtos,
        subtotal,
        total,
        totalQuant,
        esvaziar,
        addProduto,
        decreaseBagQuant,
        increaseBagQuant,
        removeProduto,
      }}
    >
      {children}
    </BagContext.Provider>
  )
}
