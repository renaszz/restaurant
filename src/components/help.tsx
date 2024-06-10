import { Ionicons } from '@expo/vector-icons'
import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from '@gluestack-ui/themed'
import React from 'react'

const Help = () => {
  return (
    <Accordion
      width="100%"
      size="lg"
      variant="unfilled"
      type="single"
      isCollapsible={true}
    >
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText>
                    Excluir dados do cartão de crédito
                  </AccordionTitleText>
                  {isExpanded ? (
                    <Ionicons name="chevron-up" size={24} color="black" />
                  ) : (
                    <Ionicons name="chevron-down" size={24} color="black" />
                  )}
                </>
              )
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <AccordionContentText>
            É importante que você saiba que seus cartões ficam salvos apenas no
            seu dispositivo usado para cadastrá-los
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText>
                    Como alterar dados da conta
                  </AccordionTitleText>
                  {isExpanded ? (
                    <Ionicons name="chevron-up" size={24} color="black" />
                  ) : (
                    <Ionicons name="chevron-down" size={24} color="black" />
                  )}
                </>
              )
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <AccordionContentText>
            Para alterar os dados da sua conta, vá em Perfil e depois em Minhas
            informações da conta
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText>
                    Diferenças nos tipos de Marmitex
                  </AccordionTitleText>
                  {isExpanded ? (
                    <Ionicons name="chevron-up" size={24} color="black" />
                  ) : (
                    <Ionicons name="chevron-down" size={24} color="black" />
                  )}
                </>
              )
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <AccordionContentText>
            Temos 3 tipos de Marmitex com distintas propostas:
          </AccordionContentText>
          <AccordionContentText color="black" mt={'$1.5'}>
            O cálculo da Marmitex Personalizada é feito referente a quantidade
            de quilogramas que você seleciona.
          </AccordionContentText>
          <AccordionContentText color="black" mt={'$1.5'}>
            A Moda da Casa, é uma solução pratica baseada no cardápio padrão do
            Restaurante.
          </AccordionContentText>
          <AccordionContentText color="black" mt={'$1.5'}>
            Na opção Tradicional, você pode escolher entre uma variedade de
            alimentos em uma marmitex com 2 tipos de carnes.
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Help
