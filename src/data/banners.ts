import { Banner } from '@/components/BannerCarousel/BannerCarousel';

export const banners: Banner[] = [
  {
    id: '1',
    image: '/banners/banner1.jpg',
    title: 'Nova Coleção Primavera/Verão',
    description: 'Descubra os lançamentos e tendências da estação com até 30% OFF.',
    ctaText: 'Ver novidades',
    ctaLink: '/produtos?categoria=novidades',
  },
  {
    id: '2',
    image: '/banners/banner2.jpg',
    title: 'Tênis em Promoção',
    description: 'Tênis femininos e masculinos com descontos exclusivos.',
    ctaText: 'Comprar tênis',
    ctaLink: '/produtos?categoria=tenis',
  },
  {
    id: '3',
    image: '/banners/banner3.jpg',
    title: 'Acessórios para todos os estilos',
    description: 'Bolsas, óculos, cintos e muito mais para complementar seu look.',
    ctaText: 'Ver acessórios',
    ctaLink: '/produtos?categoria=acessorios',
  },
]; 