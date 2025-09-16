import { Controller, Get, Param, Inject, Render } from '@nestjs/common';
import { PastriesService } from './pastries.service';

@Controller('pastries')
export class PastriesMvcController {
  constructor(
    @Inject(PastriesService) private readonly pastriesService: PastriesService,
  ) {}

  @Get(':id')
  @Render('pages/item_details')
  async findOne(@Param('id') id: string) {
    const cake = await this.pastriesService.findOne(+id);
    return {
      cake: cake,
      scripts: ['pastry_item_loader'],
    };
  }
}
