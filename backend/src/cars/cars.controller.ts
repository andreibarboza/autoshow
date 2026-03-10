import { Controller, Get, Post, Patch, Delete, Body, Param, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { CarsService } from './cars.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FilesInterceptor('fotos', 10))
  create(@Body() body: any, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.carsService.create(body, files);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('reorder')
  reorder(@Body() body: { items: { id: string, displayOrder: number }[] }) {
    return this.carsService.reorder(body.items);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/photos/:photoId/main')
  setMainPhoto(@Param('id') carId: string, @Param('photoId') photoId: string) {
    return this.carsService.setMainPhoto(carId, photoId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/photos/:photoId')
  deletePhoto(@Param('id') carId: string, @Param('photoId') photoId: string) {
    return this.carsService.deletePhoto(carId, photoId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('fotos', 10))
  update(@Param('id') id: string, @Body() body: any, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.carsService.update(id, body, files);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
