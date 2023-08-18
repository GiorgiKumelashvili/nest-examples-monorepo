import { Exclude, Type } from 'class-transformer';
import { InfoProperty } from './properties/info.property';
import { MetaDataProperty } from './properties/metadata.property';

export class MatchDetailsResponse {
    @Exclude()
    @Type(() => MetaDataProperty)
    metadata: MetaDataProperty;

    @Type(() => InfoProperty)
    info: InfoProperty;
}
