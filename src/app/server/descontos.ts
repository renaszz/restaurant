import { Produtos } from '@prisma/client'

interface ProdutoProps {
  produtos: Produtos
}
export const calculoDesconto = ({ produtos }: ProdutoProps): number => {
  if (produtos.porcentagemDesconto === 0) {
    return Number(produtos.preco)
  }
  const desconto = Number(produtos.preco) * (produtos.porcentagemDesconto / 100)

  return Number(produtos.preco) - desconto
}
