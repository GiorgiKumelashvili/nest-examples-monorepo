import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GameMode } from '../../enums/game-mode.enum';

export class DeleteRequest {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(GameMode)
  gameMode: GameMode;
}
