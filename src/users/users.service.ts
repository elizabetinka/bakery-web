import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PaginationRequestDto } from '../pagination-request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByOrderId(orderId: number) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.orders', 'order')
      .where('order.id = :orderId', { orderId })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with order ID ${orderId} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }

  async findAll(paginationDto: PaginationRequestDto) {
    const { page = 1, limit = 8 } = paginationDto;
    const [data, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);
    const links = this.generateLinks(page, limit, totalPages);

    return { data, links, totalPages };
  }

  private generateLinks(page: number, limit: number, totalPages: number): string[] {
    const links: string[] = [];
    const baseUrl = `/api/users?limit=${limit}`;

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
