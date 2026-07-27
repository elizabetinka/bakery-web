import { Controller, Get, Query, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheControl } from './decorator/cache-control.decorator';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ETagInterceptor } from './interceptors/etag.interceptor';
import { AuthStateService } from './auth/auth-state.service';



@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authStateService: AuthStateService,
  ) {}

  @CacheControl(5)
  @CacheKey('cakes')
  @CacheTTL(5)
  @UseInterceptors(ETagInterceptor)
  @Get()
  @Render('pages/index')
  getIndexPage(@Query('auth') auth: string) {
    this.authStateService.setAuth(auth);
    return {
      title: 'Каталог тортов',
      user: this.authStateService.getUser(),
      scripts: ['cakes_loader'],
    };
  }

  @Get('pastry')
  @Render('pages/cake')
  getCake() {
    return {
      title: 'Каталог пирожных',
      user: this.authStateService.getUser(),
      scripts: ['pasty_loader'],
    };
  }

  @Get('photo')
  @Render('pages/photo')
  getPhoto() {
    return {
      title: 'Фото работ',
      user: this.authStateService.getUser(),
      scripts: ['photo_loader'],
    };
  }

  @Get('pay')
  @Render('pages/pay')
  getPay() {
    return {
      title: 'Доставка и оплата',
      user: this.authStateService.getUser(),
    };
  }

  @Get('contacts')
  @Render('pages/contacts')
  getContacts() {
    return {
      title: 'Контактыт',
      user: this.authStateService.getUser(),
    };
  }

  @Get('order')
  @Render('pages/order')
  getOrder() {
    return {
      title:'Конструктор заказов',
      user: this.authStateService.getUser(),
      scripts: ['constructor_loader'],
    };
  }

}
