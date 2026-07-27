import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User, Role } from '../../../users/entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
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
}

