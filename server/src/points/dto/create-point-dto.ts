import { IsNumber, IsString } from 'class-validator';

export class AddPointDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly address: string;
  @IsString({ message: 'Должно быть строкой' })
  readonly coords: string;
  @IsString({ message: 'Должно быть строкой' })
  readonly city: string;
  readonly date: Date;
}
