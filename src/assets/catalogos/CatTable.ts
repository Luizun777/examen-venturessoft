import { TableCard } from '@core/interfaces/table-card.interface';

export const CatTablaHeader: string[] = [
  'description',
  'noCardLinking',
  'linkCard',
];

export const CatTablaEs: TableCard[] = [
  { description: 'Cupones instantáneos', noCardLinking: true, linkCard: true },
  {
    description: 'Acceso completo a los beneficios de Visa Savings Edge',
    noCardLinking: false,
    linkCard: true,
  },
  {
    description: 'Seguimiento de reembolsos',
    noCardLinking: false,
    linkCard: true,
  },
  {
    description: 'Búsqueda de ubicación de comerciantes',
    noCardLinking: false,
    linkCard: true,
  },
  { description: 'Ofertas de reembolso', noCardLinking: false, linkCard: true },
];

export const CatTablaEn: TableCard[] = [
  { description: 'Instant Coupons', noCardLinking: true, linkCard: true },
  {
    description: 'Full access to Visa Savings Edge benefits',
    noCardLinking: false,
    linkCard: true,
  },
  { description: 'Cashback tracking', noCardLinking: false, linkCard: true },
  {
    description: 'Merchant location search',
    noCardLinking: false,
    linkCard: true,
  },
  { description: 'Cashback offers', noCardLinking: false, linkCard: true },
];
