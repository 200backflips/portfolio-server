import { readdirSync, unlinkSync } from 'fs';

export const assets = readdirSync('public', { encoding: 'utf8' });

export const deleteAsset = path => unlinkSync(`public/${path}`);
