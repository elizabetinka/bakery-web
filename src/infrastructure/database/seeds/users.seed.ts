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
import { User, Role } from '../../../users/entities/user.entity';

export async function seedUsers(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(User);
  await repository.query('TRUNCATE TABLE "user" CASCADE;');
  await repository.insert([
    {
      name: 'Лиза',
      email: 'eegfregjkg.geknge@.ceo',
      password: '123456789',
      role: Role.ADMIN,
      orders: [],
    },
  ]);
}
