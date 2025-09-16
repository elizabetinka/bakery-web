import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PaginationRequestDto } from '../pagination-request.dto';
import { PaginationResponceDtoCake } from '../pagination-responce.dto';
import { Cake } from './entities/cake.entity';
import { CakesService } from './cakes.service';
import { CreateCakeDto } from './dto/create-cake.dto';
import { UpdateCakeDto } from './dto/update-cake.dto';

@Resolver(() => Cake)
export class CakeResolver {
  constructor(
    @Inject(CakesService) private readonly cakesService: CakesService,
  ) {}

  @Mutation(() => Cake)
  async createCakes(
    @Args('createCakeDto', { type: () => CreateCakeDto })
    createCakeDto: CreateCakeDto,
  ) {
    return await this.cakesService.create(createCakeDto);
  }

  @Query(() => PaginationResponceDtoCake, { name: 'cake_find_all' })
  async findAll(
    @Args('paginationRequestDto', { type: () => PaginationRequestDto })
    paginationRequestDto: PaginationRequestDto,
  ) {
    const { data, links, totalPages } =
      await this.cakesService.findAll(paginationRequestDto);

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

  @Query(() => Cake, { name: 'cake_find_one' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.cakesService.findOne(id);
  }

  @Mutation(() => Cake)
  async updateCakes(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCakeDto', { type: () => UpdateCakeDto })
    updateCakeDto: UpdateCakeDto,
  ) {
    return await this.cakesService.update(id, updateCakeDto);
  }

  @Mutation(() => Boolean)
  async removeCakes(@Args('id', { type: () => Int }) id: number) {
    await this.cakesService.remove(id);
    return true;
  }
}
