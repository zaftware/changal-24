import 'dotenv/config';
import express from 'express';
import db from './lib/db.js';
const app = express();
const port = process.env.PORT || 8787;
app.use(express.static('public'));
app.get('/api/news', (_req,res)=>{
  const rows = db.prepare(`SELECT id,title,url,tldr_uz,source,published_at,score FROM posts ORDER BY id DESC LIMIT 100`).all();
  res.json(rows);
});
app.get('/health', (_req,res)=>res.send('ok'));
app.listen(port, ()=>console.log('up', port));
