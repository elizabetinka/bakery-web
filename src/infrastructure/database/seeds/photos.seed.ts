import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Photo } from '../../../photos/entities/photo.entity';

export default class PhotoSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Photo);
    await repository.query('TRUNCATE TABLE "photo" CASCADE;');
    await repository.insert([
      {
        name: 'Тирамису',
        image:
          'https://s6.iimage.su/s/20/uCOFsc6xiQNj2ZkGZw7aiLgpHNE0KaNjjtczWXEy5.jpg',
      },
      {
        name: 'Брауни',
        image:
          'https://s6.iimage.su/s/20/uRdLVTYxacIZpn3QeIvn2ff2N3hXCWC5r5izzLJuh.jpg',
      },
      {
        name: '3 шоколада',
        image:
          'https://s6.iimage.su/s/20/ujMn0PDx25zRs4NZE0icycQG7pbtSaynz67SMg0mb.jpg',
      },
      {
        name: 'Черный лес',
        image:
          'https://s6.iimage.su/s/20/uJ7fVi9xymBZFtKg10VFI7gme2UBANcRjGr0ZN8nc.jpg',
      },
      {
        name: 'Киевский торт',
        image:
          'https://s6.iimage.su/s/20/uK7Gaiex5Yl75y6qWaiqpDIAB3jo1K6EwUdvysA4y.jpg',
      },
      {
        name: 'Медовик',
        image:
          'https://s6.iimage.su/s/20/uuunpC4xeAJ2nzXgfSBj1rCmGz2KqkJRj6M2OnNph.jpg',
      },
      {
        name: 'Молочная девочка с фисташкой',
        image:
          'https://s6.iimage.su/s/20/uE38Yeix6NZjtzXwGR3WtpzzU6AHdzJUR52X3n67Z.jpg',
      },
      {
        name: 'Наполеон',
        image:
          'https://s6.iimage.su/s/20/uV7zWd9xZ9KszSS6snHGUWK1tr7yGU5CfRlXN5E1A.jpg',
      },
      {
        name: 'Прага',
        image:
          'https://s6.iimage.su/s/20/ube4sP5xuUGceNYvcchIjvJF7U2NF7z5TRpEbJhSV.jpg',
      },
      {
        name: 'Красный бархат',
        image:
          'https://s6.iimage.su/s/20/u7nA69KxmqfrXrsllGzN7wSa4EWNXY9inzfyEUabd.jpg',
      },
      {
        name: 'Дубайский шоколад',
        image:
          'https://s6.iimage.su/s/20/ujFdfGTxKoR4jgzALSmb6QknVnHbAfj6AWZmQ28Fr.jpg',
      },
      {
        name: 'Пасхальный кулич',
        image:
          'https://s6.iimage.su/s/20/uAXgeegxOFoYXmmYMohCtVt25Woqz27L3RhzRlnC2.jpg',
      },
    ]);
  }

}

