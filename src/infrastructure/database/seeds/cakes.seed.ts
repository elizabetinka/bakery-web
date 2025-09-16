// import { Factory, Seeder } from 'typeorm-seeding';
// import { Connection } from 'typeorm';
//import { Cake } from '../../../cakes/entities/cake.entity';
//
// export default class CreateCakes implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<void> {
//     await connection
//       .createQueryBuilder()
//       .insert()
//       .into(Cake)
//       .values([
//         { name: 'Шоколадный торт', price: 1200 },
//         { name: 'Клубничный торт', price: 1500 },
//       ])
//       .execute();
//   }
// }

import { DataSource } from 'typeorm';
import { Cake } from '../../../cakes/entities/cake.entity';

export async function seedCakes(dataSource: DataSource): Promise<void> {
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
        'https://s.iimg.su/s/19/IuQJpcq23T1qRh5Bu41sNjRv00DTL2yo7fZnK4Oo.jpg',
    },
    {
      name: 'Черный лес',
      description: 'Нежный шоколадный бисквит с начинкой из вишни.',
      price: 2200,
      isAvailable: true,
      image:
        'https://s.iimg.su/s/19/bqBTQQAF3pppn4wX7z4yGRisPzp9b7tkSWW3TnLh.jpg',
    },
    {
      name: 'Киевский торт',
      description:
        'Хороший выбор для любителей похрустеть. Состоит из двух слоев бисквита с орехами и крема. Десерт содержит в себе много разнообразных текстур.',
      price: 2500,
      isAvailable: true,
      image:
        'https://s.iimg.su/s/19/w6RGRkV2Mxb6jpFgPg5CrQ6n4WnMX6JE5AbyH5Fq.jpg',
    },
    {
      name: 'Медовик',
      description:
        'Вечная класика. Торт из медовых коржей с нежным кремом. Подается с ягодами.',
      price: 2000,
      isAvailable: true,
      image:
        'https://s.iimg.su/s/19/7b2FdwRxSvnXGgzn2IG4XzU2gaSuUDCNQw4fBfIy.jpg',
    },
    {
      name: 'Молочная девочка с фисташкой',
      description:
        'Торт из двух видов бисквита: фисташкового и ванильного. Между ними крем пломбир.',
      price: 2700,
      isAvailable: true,
      image:
        'https://s.iimg.su/s/19/1DMSqrENgH4a7a9diUF2Et99CJFn7Elx4dUWwFQf.jpg',
    },
    {
      name: 'Наполеон',
      description:
        'Легендарный торт из слоеного теста с кремом. Подается с ягодами.',
      price: 2000,
      isAvailable: true,
      image:
        'https://s.iimg.su/s/19/vGC15mdQzvQ9Hy9forTH7HhjJelB1EDVTeMEXAcA.jpg',
    },
    {
      name: 'Прага',
      description:
        'ООчень шоколадный торт. В процессе приготовления используется много шоколада.  Состоит из шоколадного бисквита и шоколадного крема. Изюменкой этого торта является конфи из абрикосов.',
      price: 3100,
      isAvailable: true,
      image:
        'https://s.iimg.su/s/19/B7gn8m2RJM7khQIimTqZqpBy6gJ5zqDVKli1Kjv2.jpg',
    },
    {
      name: 'Красный бархат',
      description:
        'Американский торт с ярким красным цветом. Состоит из бисквита с какао и крема на основе сыра Филадельфия.',
      price: 1700,
      isAvailable: true,
      image:
        'https://s.iimg.su/s/19/p9mvAVFW1IXtjXLrQab2FCe72PzHiTba2kihok0f.jpg',
    },
    {
      name: 'Прага2',
      description:
        'ООчень шоколадный торт. В процессе приготовления используется много шоколада.  Состоит из шоколадного бисквита и шоколадного крема. Изюменкой этого торта является конфи из абрикосов.',
      price: 3100,
      isAvailable: true,
      image:
        'https://s.iimg.su/s/19/B7gn8m2RJM7khQIimTqZqpBy6gJ5zqDVKli1Kjv2.jpg',
    },
    {
      name: 'Красный бархат2',
      description:
        'Американский торт с ярким красным цветом. Состоит из бисквита с какао и крема на основе сыра Филадельфия.',
      price: 1700,
      isAvailable: true,
      image:
        'https://s.iimg.su/s/19/p9mvAVFW1IXtjXLrQab2FCe72PzHiTba2kihok0f.jpg',
    },
  ]);
}
