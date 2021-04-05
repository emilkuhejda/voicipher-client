import { IdentityEffects } from './identity.effects';
import { ConfigEffects } from './config.effects';
import { AudioFileEffects } from './audio-file.effects';
import { RecycleBinEffects } from './recycle-bin.effects';

export const effects = [
    AudioFileEffects,
    RecycleBinEffects,
    IdentityEffects,
    ConfigEffects
];
