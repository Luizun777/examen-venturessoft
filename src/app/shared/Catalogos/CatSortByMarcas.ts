import { CatalogGeneric } from '@core/interfaces/catalogo-generico.interface';

export const SortByMarcasEs: CatalogGeneric[] = [
  {
    title: 'Nombre Asc',
    key: 'nombreMarca',
    orderBy: 'asc',
    value: 1
  },
  {
    title: 'Nombre Des',
    key: 'nombreMarca',
    orderBy: 'des',
    value: 2
  },
  {
    title: 'Descripción Asc',
    key: 'descripcion',
    orderBy: 'asc',
    value: 3
  },
  {
    title: 'Descripción Des',
    key: 'descripcion',
    orderBy: 'des',
    value: 4
  },
];
