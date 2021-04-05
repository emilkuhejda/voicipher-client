import { IdentityEffects } from './identity.effects';
import { ConfigEffects } from './config.effects';
import { AudioFileEffects } from './audio-file.effects';
import { RecycleBinEffects } from './recycle-bin.effects';
import { MessageEffects } from './message.effects';

export const effects = [
    AudioFileEffects,
    MessageEffects,
    RecycleBinEffects,
    IdentityEffects,
    ConfigEffects
];
