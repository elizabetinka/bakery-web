import { Controller, Get, Query, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheControl } from './decorator/cache-control.decorator';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ETagInterceptor } from './interceptors/etag.interceptor';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  isLoggedIn = false;

  @CacheControl(5)
  @CacheKey('cakes')
  @CacheTTL(5)
  @UseInterceptors(ETagInterceptor)
  @Get()
  @Render('pages/index')
  getIndexPage(@Query('auth') auth: string) {
    this.isLoggedIn = this.isLoggedIn || auth === 'true';
    return {
      title: 'Каталог тортов',
      user: this.isLoggedIn ? 'Лиза' : null,
      scripts: ['cakes_loader'],
    };
  }

  @Get('pastry')
  @Render('pages/cake')
  getCake() {
    console.log("Getting index page 2");
    return {
      title: 'Каталог пирожных',
      user: this.isLoggedIn ? 'Лиза' : null,
      scripts: ['pasty_loader'],
    };
  }

  @Get('photo')
  @Render('pages/photo')
  getPhoto() {
    console.log("Getting index page 3");
    return {
      title: 'Фото работ',
      user: this.isLoggedIn ? 'Лиза' : null,
      scripts: ['photo_loader'],
    };
  }

  @Get('pay')
  @Render('pages/pay')
  getPay() {
    console.log("Getting index page 4");
    return {
      title: 'Доставка и оплата',
      user: this.isLoggedIn ? 'Лиза' : null,
    };
  }

  @Get('contacts')
  @Render('pages/contacts')
  getContacts() {
    console.log("Getting index page 5");
    return {
      title: 'Контактыт',
      user: this.isLoggedIn ? 'Лиза' : null,
    };
  }

  @Get('order')
  @Render('pages/order')
  getOrder() {
    console.log("Getting index page 6");
    return {
      title:'Конструктор заказов',
      user: this.isLoggedIn ? 'Лиза' : null,
    };
  }

}
