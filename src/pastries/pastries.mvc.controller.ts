import { Controller, Get, Param, Inject, Render } from '@nestjs/common';
import { PastriesService } from './pastries.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { AuthStateService } from '../auth/auth-state.service';

@Controller('pastries')
@ApiExcludeController()
export class PastriesMvcController {
  constructor(
    @Inject(PastriesService) private readonly pastriesService: PastriesService,
    private readonly authStateService: AuthStateService,
  ) {}

  @Get(':id')
  @Render('pages/item_details')
  async findOne(@Param('id') id: string) {
    const cake = await this.pastriesService.findOne(+id);
    return {
      cake: cake,
      user: this.authStateService.getUser(),
      scripts: ['pastry_item_loader'],
    };
  }
}
