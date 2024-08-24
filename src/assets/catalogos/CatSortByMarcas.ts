import { CatalogGeneric } from '@core/interfaces/catalogo-generico.interface';

export const SortByMarcasEs: CatalogGeneric[] = [
  {
    title: 'Nombre Asc',
    key: 'nombreMarca',
    orderBy: 'asc',
    value: 1,
  },
  {
    title: 'Nombre Des',
    key: 'nombreMarca',
    orderBy: 'des',
    value: 2,
  },
  {
    title: 'Descripción Asc',
    key: 'descripción',
    orderBy: 'asc',
    value: 3,
  },
  {
    title: 'Descripción Des',
    key: 'descripción',
    orderBy: 'des',
    value: 4,
  },
];

export const SortByMarcasEn: CatalogGeneric[] = [
  {
    title: 'Name Asc',
    key: 'nombreMarca',
    orderBy: 'asc',
    value: 1,
  },
  {
    title: 'Name Desc',
    key: 'nombreMarca',
    orderBy: 'des',
    value: 2,
  },
  {
    title: 'Description Asc',
    key: 'descripción',
    orderBy: 'asc',
    value: 3,
  },
  {
    title: 'Description Desc',
    key: 'descripción',
    orderBy: 'des',
    value: 4,
  },
];
