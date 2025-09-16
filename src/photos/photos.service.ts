import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { PaginationRequestDto } from '../pagination-request.dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
  ) {}

  async create(createPhotoDto: CreatePhotoDto) {
    const cake = this.photosRepository.create(createPhotoDto);
    return await this.photosRepository.save(cake);
  }

  async findOne(id: number) {
    return await this.photosRepository.findOneBy({ id });
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    const cake = await this.photosRepository.findOne({ where: { id } });
    if (!cake) {
      throw new NotFoundException(`Photo with ID ${id} not found`);
    }
    Object.assign(cake, updatePhotoDto);
    return await this.photosRepository.save(cake);
  }

  async remove(id: number) {
    await this.photosRepository.delete(id);
  }

  async findAll(paginationDto: PaginationRequestDto) {
    const { page = 1, limit = 8 } = paginationDto;
    const [data, total] = await this.photosRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);
    const links = this.generateLinks(page, limit, totalPages);

    return { data, links, totalPages };
  }

  private generateLinks(page: number, limit: number, totalPages: number): string[] {
    const links: string[] = [];
    const baseUrl = `/api/photos?limit=${limit}`;

    if (page > 1) {
      links.push(`<${baseUrl}&page=${page - 1}>; rel="prev"`);
    }

    if (page < totalPages) {
      links.push(`<${baseUrl}&page=${page + 1}>; rel="next"`);
    }

    links.push(`<${baseUrl}&page=1>; rel="first"`);
    links.push(`<${baseUrl}&page=${totalPages}>; rel="last"`);

    return links;
  }
}
