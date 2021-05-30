import { Expose } from 'class-transformer';
import { BaseSerializer } from './base.serializer';

export class ArtistBandSerializer extends BaseSerializer {
    artist;
    band;

    @Expose()
    // @ts-ignore
    get artistOrBand(): any {
        return this.artist || this.band;
    }
}
