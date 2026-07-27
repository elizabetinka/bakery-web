import {
  Controller,
  Get,
  Param,
  Inject,
  Render,
} from '@nestjs/common';

import { CakesService } from './cakes.service';
import { CacheControl } from '../decorator/cache-control.decorator';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ApiExcludeController } from '@nestjs/swagger';
import { AuthStateService } from '../auth/auth-state.service';

@CacheControl(5)
@ApiExcludeController()
@Controller('cakes')
export class CakesMvcController {
  constructor(
    @Inject(CakesService) private readonly cakesService: CakesService,
    private readonly authStateService: AuthStateService,
  ) {}

  @CacheKey('cake_add')
  @CacheTTL(5)
  @Get('add')
  @Render('pages/cakes_adding')
  add() {
    return {
      user: this.authStateService.getUser(),
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
      cake,
      user: this.authStateService.getUser(),
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
        cake,
        user: this.authStateService.getUser(),
        scripts: ['cake_item_loader'],
      };
    }
  }
}
