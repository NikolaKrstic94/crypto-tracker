import { InjectionToken } from '@angular/core';

export const BASE_PATH = new InjectionToken<string>('https://api.coincap.io');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}
