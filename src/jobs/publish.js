import 'dotenv/config';
import db from '../lib/db.js';
import fetch from 'node-fetch';
import { makeUzTldr } from '../lib/tldr.js';

const token = process.env.TELEGRAM_BOT_TOKEN;
const target = process.env.TELEGRAM_TARGET;
if(!token || !target) throw new Error('TELEGRAM_BOT_TOKEN/TELEGRAM_TARGET missing');

const row = db.prepare(`SELECT * FROM posts WHERE tldr_uz IS NULL ORDER BY score DESC, id DESC LIMIT 1`).get();
if(!row){ console.log('nothing_to_publish'); process.exit(0); }

const tldr = await makeUzTldr(`${row.title}\n${row.body}`);
db.prepare(`UPDATE posts SET tldr_uz=? WHERE id=?`).run(tldr,row.id);

const text = `🦞 ${process.env.BRAND || 'Changal Xabar'}\n\n<b>${row.title}</b>\n\n${tldr}\n\n🔗 ${row.url}`;
const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{
  method:'POST', headers:{'content-type':'application/json'},
  body: JSON.stringify({chat_id: target, text, parse_mode:'HTML', disable_web_page_preview:false})
});
const data = await res.json();
if(!data.ok) throw new Error(JSON.stringify(data));
console.log('published', row.id);
