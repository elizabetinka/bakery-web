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
import { Photo } from '../../../photos/entities/photo.entity';

export async function seedPhotos(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(Photo);
  await repository.query('TRUNCATE TABLE "photo" CASCADE;');
  await repository.insert([
    {
      name: 'Тирамису',
      image:
        'https://s.iimg.su/s/19/omkbJ9QZv5zoALMXzSlakd4rMaJj7rQr7IgxdUOX.jpg',
    },
    {
      name: 'Брауни',
      image:
        'https://s.iimg.su/s/19/Ccblhr6MzNCxSCtKNMEECK4g5ywvAwkWKpmzgO4t.jpg',
    },
    {
      name: '3 шоколада',
      image:
        'https://s.iimg.su/s/19/IuQJpcq23T1qRh5Bu41sNjRv00DTL2yo7fZnK4Oo.jpg',
    },
    {
      name: 'Черный лес',
      image:
        'https://s.iimg.su/s/19/bqBTQQAF3pppn4wX7z4yGRisPzp9b7tkSWW3TnLh.jpg',
    },
    {
      name: 'Киевский торт',
      image:
        'https://s.iimg.su/s/19/w6RGRkV2Mxb6jpFgPg5CrQ6n4WnMX6JE5AbyH5Fq.jpg',
    },
    {
      name: 'Медовик',
      image:
        'https://s.iimg.su/s/19/7b2FdwRxSvnXGgzn2IG4XzU2gaSuUDCNQw4fBfIy.jpg"',
    },
    {
      name: 'Молочная девочка с фисташкой',
      image:
        'https://s.iimg.su/s/19/1DMSqrENgH4a7a9diUF2Et99CJFn7Elx4dUWwFQf.jpg',
    },
    {
      name: 'Наполеон',
      image:
        'https://s.iimg.su/s/19/vGC15mdQzvQ9Hy9forTH7HhjJelB1EDVTeMEXAcA.jpg',
    },
    {
      name: 'Прага',
      image:
        'https://s.iimg.su/s/19/B7gn8m2RJM7khQIimTqZqpBy6gJ5zqDVKli1Kjv2.jpg',
    },
    {
      name: 'Красный бархат',
      image:
        'https://s.iimg.su/s/19/p9mvAVFW1IXtjXLrQab2FCe72PzHiTba2kihok0f.jpg',
    },
  ]);
}
