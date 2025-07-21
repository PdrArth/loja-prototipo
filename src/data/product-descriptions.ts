/**
 * Descrições detalhadas dos produtos organizadas por tipo
 */
export const ProductDescriptions = {
  calcados: {
    scarpin: 'Scarpin elegante em couro legítimo, perfeito para ocasiões especiais e uso profissional. Salto médio de 7cm proporciona conforto e sofisticação.',
    tenis: 'Tênis confortável para o dia a dia, com design moderno e materiais de qualidade. Ideal para caminhadas e atividades casuais.',
    sandalia: 'Sandália sofisticada com salto alto de 10cm, perfeita para festas e eventos especiais. Disponível em várias cores.',
    bota: 'Bota elegante de cano alto em couro sintético, perfeita para o inverno. Zíper lateral para facilitar o calce.',
    sapatilha: 'Sapatilha ultra confortável para uso diário, com palmilha acolchoada e design atemporal. Disponível em várias cores.',
    oxford: 'Sapato oxford feminino em couro sintético, com design casual-chic. Combina com looks despojados e elegantes.',
    chinelo: 'Chinelo slide com palmilha anatômica, ideal para relaxar em casa ou usar na praia. Material antiderrapante.',
    rasteirinha: 'Rasteirinha delicada para o verão, com detalhes em strass e design minimalista. Confortável para uso prolongado.'
  },
  bolsas: {
    bolsa_couro: 'Bolsa espaçosa em couro legítimo, com compartimentos internos organizadores. Ideal para trabalho e uso diário.',
    mochila: 'Mochila moderna com design urbano, múltiplos bolsos e compartimento para notebook. Perfeita para trabalho e estudos.',
    carteira: 'Carteira compacta em couro sintético com múltiplos compartimentos para cartões e documentos. Design moderno e funcional.'
  },
  acessorios: {
    cinto: 'Cinto em couro legítimo com fivela dourada, acessório essencial para compor looks elegantes e casuais.',
    carteira_pequena: 'Carteira compacta em couro sintético com múltiplos compartimentos para cartões e documentos. Design moderno e funcional.'
  }
} as const;

/**
 * Função para obter descrição do produto
 */
export function getProductDescription(category: string, type: string): string {
  const categoryDescriptions = ProductDescriptions[category as keyof typeof ProductDescriptions];
  if (categoryDescriptions) {
    return categoryDescriptions[type as keyof typeof categoryDescriptions] || 'Produto de alta qualidade da Valentina Shoes.';
  }
  return 'Produto de alta qualidade da Valentina Shoes.';
}