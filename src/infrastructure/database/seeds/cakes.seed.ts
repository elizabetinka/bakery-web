import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Cake } from '../../../cakes/entities/cake.entity';

export default class CakeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Cake);
    await repository.query('TRUNCATE TABLE "cake" CASCADE;');
    await repository.insert([
      {
        name: '3 шоколада',
        description:
          '3 вида мусса: шоколадный, белый и молочный. Внутри - нежный мусс, а снаружи - хрустящая шоколадная оболочка.',
        price: 2500,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/ujMn0PDx25zRs4NZE0icycQG7pbtSaynz67SMg0mb.jpg',
      },
      {
        name: 'Черный лес',
        description: 'Нежный шоколадный бисквит с начинкой из вишни.',
        price: 2200,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/uJ7fVi9xymBZFtKg10VFI7gme2UBANcRjGr0ZN8nc.jpg',
      },
      {
        name: 'Киевский торт',
        description:
          'Хороший выбор для любителей похрустеть. Состоит из двух слоев бисквита с орехами и крема. Десерт содержит в себе много разнообразных текстур.',
        price: 2500,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/uK7Gaiex5Yl75y6qWaiqpDIAB3jo1K6EwUdvysA4y.jpg',
      },
      {
        name: 'Медовик',
        description:
          'Вечная класика. Торт из медовых коржей с нежным кремом. Подается с ягодами.',
        price: 2000,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/uuunpC4xeAJ2nzXgfSBj1rCmGz2KqkJRj6M2OnNph.jpg',
      },
      {
        name: 'Молочная девочка с фисташкой',
        description:
          'Торт из двух видов бисквита: фисташкового и ванильного. Между ними крем пломбир.',
        price: 2700,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/uE38Yeix6NZjtzXwGR3WtpzzU6AHdzJUR52X3n67Z.jpg',
      },
      {
        name: 'Наполеон',
        description:
          'Легендарный торт из слоеного теста с кремом. Подается с ягодами.',
        price: 2000,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/uV7zWd9xZ9KszSS6snHGUWK1tr7yGU5CfRlXN5E1A.jpg',
      },
      {
        name: 'Прага',
        description:
          'ООчень шоколадный торт. В процессе приготовления используется много шоколада.  Состоит из шоколадного бисквита и шоколадного крема. Изюменкой этого торта является конфи из абрикосов.',
        price: 3100,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/ube4sP5xuUGceNYvcchIjvJF7U2NF7z5TRpEbJhSV.jpg',
      },
      {
        name: 'Красный бархат',
        description:
          'Американский торт с ярким красным цветом. Состоит из бисквита с какао и крема на основе сыра Филадельфия.',
        price: 1700,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/u7nA69KxmqfrXrsllGzN7wSa4EWNXY9inzfyEUabd.jpg',
      },
      {
        name: 'Прага2',
        description:
          'ООчень шоколадный торт. В процессе приготовления используется много шоколада.  Состоит из шоколадного бисквита и шоколадного крема. Изюменкой этого торта является конфи из абрикосов.',
        price: 3100,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/ube4sP5xuUGceNYvcchIjvJF7U2NF7z5TRpEbJhSV.jpg',
      },
      {
        name: 'Красный бархат2',
        description:
          'Американский торт с ярким красным цветом. Состоит из бисквита с какао и крема на основе сыра Филадельфия.',
        price: 1700,
        isAvailable: true,
        image:
          'https://s6.iimage.su/s/20/u7nA69KxmqfrXrsllGzN7wSa4EWNXY9inzfyEUabd.jpg',
      },
    ]);
    }
}