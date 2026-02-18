import * as migration_20260218_163530_init from './20260218_163530_init';

export const migrations = [
  {
    up: migration_20260218_163530_init.up,
    down: migration_20260218_163530_init.down,
    name: '20260218_163530_init'
  },
];
