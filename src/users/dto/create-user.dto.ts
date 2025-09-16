import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { Role } from '../entities/user.entity';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @ApiProperty({
    example: 'Черный лес',
    description: 'Название торта',
    required: true,
    type: () => String,
  })
  @Column('varchar', { length: 255 })
  name: string;

  @Field(() => String)
  @ApiProperty({
    example: 'ejkhbjknkn@mail.ru',
    description: 'Почта',
    required: true,
    type: () => String,
  })
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Field(() => String)
  @ApiProperty({
    example: 'ejkhbjknkn@mail.ru',
    description: 'Пароль',
    required: true,
    type: () => String,
  })
  @Column({
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @Field(() => Role)
  @ApiProperty({
    description: 'Роль пользователя',
    enum: Role,
    default: Role.CUSTOMER,
  })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  role: Role = Role.CUSTOMER;
}
