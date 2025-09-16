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
import { Pastry } from '../../../pastries/entities/pastry.entity';

export async function seedPastry(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(Pastry);
  await repository.query('TRUNCATE TABLE "pastry" CASCADE;');
  await repository.insert([
    {
      name: 'Тирамису',
      description:
        'Нежный кофейный десерт, состоящий из печенья савоярди, крема на основе маскарпоне и итальянского кофе.',
      price: 225,
      isAvailable: true,
      image:
        'https://s.iimg.su/s/19/omkbJ9QZv5zoALMXzSlakd4rMaJj7rQr7IgxdUOX.jpg',
    },
    {
      name: 'Брауни',
      description:
        'Шоколадный бисквит с орехами и шоколадной начинкой. Подается с мороженым.',
      price: 270,
      isAvailable: true,
      image:
        'https://s.iimg.su/s/19/Ccblhr6MzNCxSCtKNMEECK4g5ywvAwkWKpmzgO4t.jpg',
    },
  ]);
}
