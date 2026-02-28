import crypto from 'crypto';
export const hashOf = (s) => crypto.createHash('sha256').update(s).digest('hex');
export const strip = (s='') => s.replace(/\s+/g,' ').trim();
