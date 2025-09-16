import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class UpdatePhotoDto {
  @Field(() => String)
  @ApiProperty({
    type: () => String,
    example: 'Черный лес',
    description: 'Название',
  })
  @IsString()
  name: string = '';

  @Field(() => String)
  @ApiProperty({
    type: () => String,
    example:
      'https://s.iimg.su/s/19/7b2FdwRxSvnXGgzn2IG4XzU2gaSuUDCNQw4fBfIy.jpg',
    description: 'Ссылка на картинку',
  })
  @IsString()
  image: string;
}
