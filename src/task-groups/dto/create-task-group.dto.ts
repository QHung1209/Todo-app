import { IsNotEmpty } from 'class-validator';

export class CreateTaskGroupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  icon_url: string;
}
