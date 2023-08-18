import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../models/entities/cache-user.model';
import { GameMode } from '../../models/enums/game-mode.enum';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RouletteRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public initializeSession(balance: number, userId: number, gameMode: GameMode) {
    const userGameEntity = new User({
      balance,
      userId,
      gameMode,
    });

    console.log('=========');
    console.log(userId);
    console.log(JSON.stringify(userGameEntity));

    return this.cacheManager.set(userId.toString(), userGameEntity);
  }

  public getGameSession(userId: number): Promise<User> {
    return this.cacheManager.get<User>(userId.toString());
  }

  public updateBalance(gameSession: User): Promise<void> {
    return this.cacheManager.set(gameSession.userId.toString(), gameSession);
  }

  public endSessions(userId: number): Promise<any> {
    return this.cacheManager.del(userId.toString());
  }
}
