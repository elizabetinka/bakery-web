import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Pastry } from '../../../pastries/entities/pastry.entity';

export default class PastrySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Pastry);
    await repository.query('TRUNCATE TABLE "pastry" CASCADE;');
    await repository.insert([
      {
        name: 'Тирамису',
        description:
          'Нежный кофейный десерт, состоящий из печенья савоярди, крема на основе маскарпоне и итальянского кофе.',
        price: 225,
        isAvailable: false,
        image:
          'https://s6.iimage.su/s/20/uCOFsc6xiQNj2ZkGZw7aiLgpHNE0KaNjjtczWXEy5.jpg',
      },
      {
        name: 'Брауни',
        description:
          'Шоколадный бисквит с орехами и шоколадной начинкой. Подается с мороженым.',
        price: 270,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/uRdLVTYxacIZpn3QeIvn2ff2N3hXCWC5r5izzLJuh.jpg',
      },
      {
        name: 'Дубайский шоколад',
        description:
          'Бельгийский шоколадный десерт с фисташкой и тестом катаифи.',
        price: 5000,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/ujFdfGTxKoR4jgzALSmb6QknVnHbAfj6AWZmQ28Fr.jpg',
      },
      {
        name: 'Пасхальный кулич',
        description:
          'Кулич с изюмом и цукатами, украшенный глазурью и посыпкой. Традиционный пасхальный десерт.',
        price: 270,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/uAXgeegxOFoYXmmYMohCtVt25Woqz27L3RhzRlnC2.jpg',
      },
    ]);
  }
}
