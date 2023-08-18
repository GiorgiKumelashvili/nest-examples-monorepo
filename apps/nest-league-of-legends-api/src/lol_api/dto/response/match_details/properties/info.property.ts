import { Exclude, Type } from 'class-transformer';
import { ParticipantProperty } from './participant.property';

export class InfoProperty {
    @Type(() => ParticipantProperty)
    participants: Array<ParticipantProperty>;

    queueId: number;

    gameCreation: number;
    gameDuration: number;
    gameEndTimestamp: number;
    gameId: number;
    gameStartTimestamp: number;
    mapId: number;
    gameMode: string;
    gameName: string;
    gameType: string;
    gameVersion: string;
    platformId: string;
    tournamentCode: string;

    @Exclude() teams: any[]; // removed not important right now
}
