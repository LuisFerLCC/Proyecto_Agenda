export interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: Categoria;
  fecha: Date;
  direccion: string;
  fotoUrl: string;
  esFavorito: boolean;
}

export const CATEGORIAS = [
  'Concierto',
  'Fiesta',
  'Cine',
  'Teatro',
  'Deportes',
  'Cultura',
  'Gastronomía',
  'Familia',
  'Amigos',
  'Trabajo',
  'Estudios',
  'Salud',
  'Viajes',
  'Otros',
] as const;

export type Categoria = (typeof CATEGORIAS)[number];
