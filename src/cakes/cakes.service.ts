import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateCakeDto } from './dto/create-cake.dto';
import { UpdateCakeDto } from './dto/update-cake.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cake } from './entities/cake.entity';
import { PaginationRequestDto } from '../pagination-request.dto';

@Injectable()
export class CakesService {
  constructor(
    @InjectRepository(Cake)
    private cakesRepository: Repository<Cake>,
  ) {}

  async create(createCakeDto: CreateCakeDto) {
    const cake = this.cakesRepository.create(createCakeDto);
    await this.cakesRepository.save(cake);
  }

  async findOne(id: number) {
    if (id) {
      return await this.cakesRepository.findOneBy({ id });
    }
  }

  async update(id: number, updateCakeDto: UpdateCakeDto) {
    const cake = await this.cakesRepository.findOne({ where: { id } });
    if (!cake) {
      throw new NotFoundException(`Cake with ID ${id} not found`);
    }
    Object.assign(cake, updateCakeDto);
    return await this.cakesRepository.save(cake);
  }

  async remove(id: number) {
    await this.cakesRepository.delete(id);
  }

  async findAllIncludeString(pattern: string) {
    if (!pattern || pattern.trim() === '') {
      return this.cakesRepository.find();
    }

    return this.cakesRepository
      .createQueryBuilder('cake')
      .where('LOWER(cake.name) LIKE LOWER(:pattern)', { pattern: `%${pattern}%` })
      .getMany();
  }

  async findAll(paginationDto: PaginationRequestDto) {
    const { page = 1, limit = 8 } = paginationDto;
    const [data, total] = await this.cakesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);
    const links = this.generateLinks(page, limit, totalPages);

    return { data, links, totalPages };
  }

  private generateLinks(
    page: number,
    limit: number,
    totalPages: number,
  ): string[] {

    const links: string[] = [];
    const baseUrl = `/api/cakes?limit=${limit}`;

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
