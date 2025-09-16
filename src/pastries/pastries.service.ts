import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePastryDto } from './dto/create-pastry.dto';
import { UpdatePastryDto } from './dto/update-pastry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Pastry } from './entities/pastry.entity';
import { PaginationRequestDto } from '../pagination-request.dto';

@Injectable()
export class PastriesService {
  constructor(
    @InjectRepository(Pastry)
    private pastryRepository: Repository<Pastry>,
  ) {}

  async create(createPastryDto: CreatePastryDto) {
    const cake = this.pastryRepository.create(createPastryDto);
    return await this.pastryRepository.save(cake);
  }

  async findOne(id: number) {
    return await this.pastryRepository.findOneBy({ id });
  }

  async findByIds(ids: number[]) {
    return await this.pastryRepository.find({
      where: {
        id: In(ids),
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async update(id: number, updatePastryDto: UpdatePastryDto) {
    const cake = await this.pastryRepository.findOne({ where: { id } });
    if (!cake) {
      throw new NotFoundException(`Cake with ID ${id} not found`);
    }
    Object.assign(cake, updatePastryDto);
    return await this.pastryRepository.save(cake);
  }

  async remove(id: number) {
    await this.pastryRepository.delete(id);
  }

  async findAllIncludeString(pattern: string) {
    if (!pattern || pattern.trim() === '') {
      return this.pastryRepository.find();
    }

    return this.pastryRepository
      .createQueryBuilder('pastry')
      .where('LOWER(pastry.name) LIKE LOWER(:pattern)', { pattern: `%${pattern}%` })
      .getMany();
  }

  async findAll(paginationDto: PaginationRequestDto) {
    const { page = 1, limit = 8 } = paginationDto;
    const [data, total] = await this.pastryRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);
    const links = this.generateLinks(page, limit, totalPages);

    return { data, links, totalPages };
  }

  private generateLinks(page: number, limit: number, totalPages: number): string[] {
    const links: string[] = [];
    const baseUrl = `/api/pastries?limit=${limit}`;

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
