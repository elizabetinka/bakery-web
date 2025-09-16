import {
  Controller,
  Get,
  Param,
  Inject,
  Render, Res,
} from '@nestjs/common';

import { CakesService } from './cakes.service';
import { CacheControl } from '../decorator/cache-control.decorator';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@CacheControl(5)
@Controller('cakes')
export class CakesMvcController {
  constructor(
    @Inject(CakesService) private readonly cakesService: CakesService
  ) {}

  @CacheKey('cake_add')
  @CacheTTL(5)
  @Get('add')
  @Render('pages/cakes_adding')
  add() {
    console.log("here")
    return {
      scripts: ['add_handler'],
    };
  }

  @CacheKey('cake_edit')
  @CacheTTL(5)
  @Get('edit/:id')
  @Render('pages/cakes_editing')
  async edit(@Param('id') id: number) {
    const cake = await this.cakesService.findOne(+id);
    return {
      cake: cake,
      scripts: ['edit_handler'],
    };
  }

  @CacheKey('cake_details')
  @CacheTTL(5)
  @Get('by/:id')
  @Render('pages/item_details')
  async findOne(@Param('id') id: number) {
    if (id) {
      const cake = await this.cakesService.findOne(+id);
      return {
        cake: cake,
        scripts: ['cake_item_loader'],
      };
    }
  }
}
