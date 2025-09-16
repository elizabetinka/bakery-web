import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { PhotosService } from './photos.service';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Inject } from '@nestjs/common';
import { PaginationRequestDto } from '../pagination-request.dto';
import { PaginationResponceDtoPhoto } from '../pagination-responce.dto';

@Resolver(() => Photo)
export class PhotoResolver {
  constructor(
    @Inject(PhotosService) private readonly photosService: PhotosService,
  ) {}

  @Mutation(() => Photo)
  async createPhotos(
    @Args('createPhotoDto', { type: () => CreatePhotoDto })
    createPhotoDto: CreatePhotoDto,
  ) {
    return await this.photosService.create(createPhotoDto);
  }

  @Query(() => PaginationResponceDtoPhoto, { name: 'photo_find_all' })
  async findAll(
    @Args('paginationRequestDto', { type: () => PaginationRequestDto })
    paginationRequestDto: PaginationRequestDto,
  ) {
    const { data, links, totalPages } =
      await this.photosService.findAll(paginationRequestDto);

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

  @Query(() => Photo, { name: 'photo_find_one' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.photosService.findOne(id);
  }

  @Mutation(() => Photo)
  async updatePhotos(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePhotoDto', { type: () => UpdatePhotoDto })
    updatePhotoDto: UpdatePhotoDto,
  ) {
    return await this.photosService.update(id, updatePhotoDto);
  }

  @Mutation(() => Boolean)
  async removePhotos(@Args('id', { type: () => Int }) id: number) {
    await this.photosService.remove(id);
    return true;
  }
}
