import 'dotenv/config';
import db from '../lib/db.js';
import { makeUzTldr } from '../lib/tldr.js';
import { execFileSync } from 'node:child_process';

const target = process.env.TELEGRAM_TARGET;
if(!target) throw new Error('TELEGRAM_TARGET missing');

const row = db.prepare(`SELECT * FROM posts WHERE tldr_uz IS NULL ORDER BY score DESC, id DESC LIMIT 1`).get();
if(!row){ console.log('nothing_to_publish'); process.exit(0); }

const tldr = await makeUzTldr(`${row.title}\n${row.body}`);
db.prepare(`UPDATE posts SET tldr_uz=? WHERE id=?`).run(tldr,row.id);

const text = `🦞 ${process.env.BRAND || 'Changal Xabar'}\n\n${row.title}\n\n${tldr}\n\n🔗 ${row.url}`;
execFileSync('openclaw', ['message','send','--channel','telegram','--target',target,'--message',text], {stdio:'inherit'});
console.log('published', row.id);
