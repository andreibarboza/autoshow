import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class CarsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(data: any, files: Express.Multer.File[]) {
    try {
      const {
        marcaModelo, resumo, anoFabricacao, anoModelo, km, cambio,
        carroceria, combustivel, cor, preco, status, tipo, placa, descricao
      } = data;

      const car = await this.prisma.car.create({
        data: {
          marcaModelo, resumo, anoFabricacao: Number(anoFabricacao),
          anoModelo: Number(anoModelo), km: Number(km),
          cambio, carroceria, combustivel, cor,
          preco: preco ? Number(preco) : null,
          status: status || 'DISPONIVEL',
          tipo: tipo || 'CARRO',
          placa,
          descricao
        },
      });

      if (files && files.length > 0) {
       
        const s3Urls = await Promise.all(
          files.map(file => this.uploadService.uploadFile(file))
        );
        
        let targetIndex = 0;
        if (data.mainPhotoVal && data.mainPhotoVal.startsWith('new-')) {
           targetIndex = parseInt(data.mainPhotoVal.split('-')[1], 10);
        }

        const photosData = s3Urls.map((url, index) => ({
          url,
          isMain: index === targetIndex,
          carId: car.id,
        }));

        await this.prisma.photo.createMany({
          data: photosData,
        });
      }

      const createdCar = await this.prisma.car.findUnique({
        where: { id: car.id },
        include: { fotos: true },
      });

      return createdCar;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao criar o carro e processar imagens');
    }
  }

  async findAll(fetchAll: boolean = false) {
    return this.prisma.car.findMany({
      where: fetchAll ? undefined : { status: { not: 'OCULTO' } },
      include: {
        fotos: {
          where: { isMain: true },
        },
      },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });
  }

  async findOne(id: string) {
    const car = await this.prisma.car.findUnique({
      where: { id },
      include: { fotos: true },
    });

    if (!car) throw new NotFoundException('Carro não encontrado');
    return car;
  }

  async update(id: string, data: any, files?: Express.Multer.File[]) {
    try {
      const {
        marcaModelo, resumo, anoFabricacao, anoModelo, km, cambio,
        carroceria, combustivel, cor, preco, status, tipo, placa, descricao
      } = data;

      const updateData: any = {};
      if (marcaModelo) updateData.marcaModelo = marcaModelo;
      if (resumo) updateData.resumo = resumo;
      if (anoFabricacao) updateData.anoFabricacao = Number(anoFabricacao);
      if (anoModelo) updateData.anoModelo = Number(anoModelo);
      if (km) updateData.km = Number(km);
      if (cambio) updateData.cambio = cambio;
      if (carroceria) updateData.carroceria = carroceria;
      if (combustivel) updateData.combustivel = combustivel;
      if (cor) updateData.cor = cor;
      if (preco !== undefined) updateData.preco = preco ? Number(preco) : null;
      if (status) updateData.status = status;
      if (tipo) updateData.tipo = tipo;
      if (placa !== undefined) updateData.placa = placa;
      if (descricao !== undefined) updateData.descricao = descricao;

      const car = await this.prisma.car.update({
        where: { id },
        data: updateData,
      });

      if (data.deletedPhotos) {
        const ids = Array.isArray(data.deletedPhotos) ? data.deletedPhotos : [data.deletedPhotos];
        await this.prisma.photo.deleteMany({
          where: { id: { in: ids }, carId: car.id }
        });
      }

      if (data.mainPhotoVal !== undefined) {
        await this.prisma.photo.updateMany({
          where: { carId: car.id },
          data: { isMain: false }
        });

        if (data.mainPhotoVal && !data.mainPhotoVal.startsWith('new-')) {
            const existing = await this.prisma.photo.findUnique({ where: { id: data.mainPhotoVal } });
            if (existing) {
                await this.prisma.photo.update({
                  where: { id: data.mainPhotoVal },
                  data: { isMain: true }
                });
            }
        }
      }

      if (files && files.length > 0) {
        const s3Urls = await Promise.all(
          files.map(file => this.uploadService.uploadFile(file))
        );
        
        let targetIndex = -1;
        if (data.mainPhotoVal && data.mainPhotoVal.startsWith('new-')) {
           targetIndex = parseInt(data.mainPhotoVal.split('-')[1], 10);
        }

        const checkMain = await this.prisma.photo.findFirst({ where: { carId: car.id, isMain: true }});

        const photosData = s3Urls.map((url, index) => ({
          url,
          isMain: (index === targetIndex) || (!checkMain && targetIndex === -1 && index === 0),
          carId: car.id,
        }));

        await this.prisma.photo.createMany({
          data: photosData,
        });
      }

      const updatedCar = await this.prisma.car.findUnique({
        where: { id: car.id },
        include: { fotos: true },
      });
      
      return updatedCar;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao atualizar o carro');
    }
  }

  async remove(id: string) {
    try {

      await this.prisma.photo.deleteMany({ where: { carId: id } });
      await this.prisma.car.delete({ where: { id } });
      return { message: 'Veículo removido com sucesso' };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar o carro');
    }
  }

  async reorder(items: { id: string, displayOrder: number }[]) {
    try {
      const updates = items.map(item => 
        this.prisma.car.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder }
        })
      );
      await this.prisma.$transaction(updates);
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao reordenar veículos');
    }
  }

  async setMainPhoto(carId: string, photoId: string) {
    try {
      await this.prisma.photo.updateMany({
        where: { carId },
        data: { isMain: false }
      });

      await this.prisma.photo.update({
        where: { id: photoId, carId },
        data: { isMain: true }
      });

      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao definir foto principal');
    }
  }

  async deletePhoto(carId: string, photoId: string) {
    try {
      await this.prisma.photo.delete({
        where: { id: photoId, carId }
      });
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar foto');
    }
  }
}
