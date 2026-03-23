import * as z from 'zod';

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
  carId: string;
}

export interface Car {
  id: string;
  marcaModelo: string;
  resumo: string;
  anoFabricacao: number;
  anoModelo: number;
  km: number;
  cambio: string;
  carroceria: string;
  combustivel: string;
  cor: string;
  preco: number;
  status: string;
  tipo: string;
  placa: string | null;
  descricao?: string;
  displayOrder?: number;
  createdAt: string;
  updatedAt: string;
  fotos?: Photo[];
}

export const carSchema = z.object({
  marcaModelo: z.string().min(2, 'Marca/Modelo é obrigatório'),
  resumo: z.string().min(5, 'Resumo curto obrigatório'),
  anoFabricacao: z.number().min(1900, 'Ano inválido'),
  anoModelo: z.number().min(1900, 'Ano inválido'),
  km: z.number().min(0, 'Km inválida'),
  cambio: z.string().min(2, 'Câmbio obrigatório'),
  carroceria: z.string().min(2, 'Carroceria obrigatória'),
  combustivel: z.string().min(2, 'Combustível obrigatório'),
  cor: z.string().min(2, 'Cor obrigatória'),
  preco: z.number().min(1, 'Preço deve ser maior que 0'),
  status: z.enum(['DISPONIVEL', 'VENDIDO', 'RESERVADO', 'OCULTO']),
  tipo: z.enum(['CARRO', 'MOTO', 'OUTROS']),
  placa: z.string().nullable().optional(),
  descricao: z.string().optional(),
});

export type CarFormData = z.infer<typeof carSchema>;

export interface NewFile {
  id: string;
  file: File;
  previewUrl: string;
}

export interface FilterState {
  search: string;
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  color: string;
  tipo: string;
  status: string;
  hasFilters: boolean;
}
