import { ArtistBandSerializer } from './artist-band.serializer';

export class SongSerializer extends ArtistBandSerializer {
    name;
    releasedAt;
    genres;
    album;
    albumOrder;
}
