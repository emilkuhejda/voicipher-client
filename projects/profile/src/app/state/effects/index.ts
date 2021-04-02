import { IdentityEffects } from './identity.effects';
import { ConfigEffects } from './config.effects';
import { AudioFileEffects } from './audio-file.effects';

export const effects = [
    AudioFileEffects,
    IdentityEffects,
    ConfigEffects
];
