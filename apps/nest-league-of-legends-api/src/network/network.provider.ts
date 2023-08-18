import { Injectable } from '@nestjs/common';
import { Axiosfit } from '@yggdrasilts/axiosfit';
import { LolRemoteService } from './services/lol_remote.service';

@Injectable()
export class NetworkProvider {
  public lolRemoteService = new Axiosfit<LolRemoteService>().create(LolRemoteService);
}
