import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PaginationRequestDto } from '../pagination-request.dto';
import { Pastry } from './entities/pastry.entity';
import { PastriesService } from './pastries.service';
import { CreatePastryDto } from './dto/create-pastry.dto';
import { UpdatePastryDto } from './dto/update-pastry.dto';
import { PaginationResponceDtoPastry } from '../pagination-responce.dto';

@Resolver(() => Pastry)
export class PastriesResolver {
  constructor(
    @Inject(PastriesService) private readonly pastryService: PastriesService,
  ) {}

  @Mutation(() => Pastry)
  async createPastry(
    @Args('createPastryDto', { type: () => CreatePastryDto })
    createPastryDto: CreatePastryDto,
  ) {
    return await this.pastryService.create(createPastryDto);
  }

  @Query(() => PaginationResponceDtoPastry, { name: 'pastry_find_all' })
  async findAll(
    @Args('paginationRequestDto', { type: () => PaginationRequestDto })
    paginationRequestDto: PaginationRequestDto,
  ) {
    const { data, links, totalPages } =
      await this.pastryService.findAll(paginationRequestDto);

    return {
      data: data,
      meta: {
        totalItems: data.length,
        currentPage: paginationRequestDto.page,
        itemsPerPage: paginationRequestDto.limit,
      },
      total: totalPages,
      links: links.join(', '),
    };
  }

  @Query(() => Pastry, { name: 'pastry_find_one' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.pastryService.findOne(id);
  }

  @Mutation(() => Pastry)
  async updatePastry(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePastryDto', { type: () => UpdatePastryDto })
    updatePastryDto: UpdatePastryDto,
  ) {
    return await this.pastryService.update(id, updatePastryDto);
  }

  @Mutation(() => Boolean)
  async removePastry(@Args('id', { type: () => Int }) id: number) {
    await this.pastryService.remove(id);
    return true;
  }
}
