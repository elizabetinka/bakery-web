// storage/storage.service.ts
import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

import { readFileSync } from "node:fs"
import
{
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand, GetObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly client: S3Client;
  private readonly bucketName: string;
  private readonly endpoint: string;

  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
    const region = this.configService.get<string>('S3_REGION');
    const bucketName = this.configService.get<string>('S3_BUCKET_NAME');
    const endpoint = this.configService.get<string>('S3_ENDPOINT');

    if (!region || !bucketName || !endpoint) {
      this.logger.error('Missing S3 configuration in environment variables');
      throw new Error('S3 configuration is incomplete');
    }

    this.bucketName = bucketName;
    this.endpoint = endpoint;
    this.client = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESS_KEY')!,
        secretAccessKey: this.configService.get<string>('S3_SECRET_ACCESS_KEY')!,
      },
      forcePathStyle: true, // Требуется для Yandex Object Storage
    });
  }



  // async uploadFile(
  //   file: Express.Multer.File,
  //   isPublic: boolean = false,
  // ): Promise<{ key: string; url: string }> {
  //   try {
  //     const key = `${uuidv4()}-${file.originalname}`;
  //     const command = new PutObjectCommand({
  //       Bucket: this.bucketName,
  //       Key: key,
  //       Body: file.buffer,
  //       ContentType: file.mimetype,
  //       ACL: isPublic ? 'public-read' : undefined, // Публичный доступ, если isPublic
  //     });
  //
  //     await this.client.send(command);
  //     const url = isPublic
  //       ? `https://${this.bucketName}.storage.yandexcloud.net/${key}`
  //       : await this.getSignedUrl(key);
  //
  //     this.logger.log(`File uploaded successfully: ${key}`);
  //     return { key, url };
  //   } catch (error) {
  //     this.logger.error(`Failed to upload file: ${error.message}`);
  //     throw new InternalServerErrorException('Failed to upload file');
  //   }
  // }

  // async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
  //   try {
  //     const command = new GetObjectCommand({
  //       Bucket: this.bucketName,
  //       Key: key,
  //     });
  //     const url = await getSignedUrl(this.client, command, { expiresIn });
  //     return url;
  //   } catch (error) {
  //     this.logger.error(`Failed to generate signed URL: ${error.message}`);
  //     throw new InternalServerErrorException('Failed to generate signed URL');
  //   }
  // }


  // async downloadFile(key: string) {
  //   const { Body } = await this.client.send(
  //     new GetObjectCommand({
  //       Bucket: this.bucketName,
  //       Key: key,
  //     }),
  //   );
  //
  //
  //   https://storage.yandexcloud.net/bakery-backet/62485a98-c37f-4864-8294-7fcde8d8c5f9-2.py
  //   const filePath = './downloaded/downloaded-file.txt';
  //   const fileStream = fs.createWriteStream(filePath);
  //   (await Body.transformToByteArray()).pipe(fileStream);
  // }

  async uploadFile(path: string, key: string) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: readFileSync(path),
      }),
    );
    return `${this.endpoint}/${this.bucketName}/${key}`;
  }

}