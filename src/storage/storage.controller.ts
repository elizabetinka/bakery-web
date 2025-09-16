// // storage/storage.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Inject, Get, Param,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'node:path';

@Controller('api/storage')
export class StorageController {
  constructor( @Inject(StorageService) private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.storageService.uploadFile(file.path, file.filename);
    return {
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      url: url,
    };
  }
}