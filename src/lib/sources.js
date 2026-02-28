import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { strip } from './util.js';

export async function fetchTelegramS(url){
  const html = await (await fetch(url)).text();
  const $ = cheerio.load(html);
  const out = [];
  $('.tgme_widget_message').each((_,el)=>{
    const title = strip($(el).find('.tgme_widget_message_text').text()).slice(0,220);
    const link = $(el).find('.tgme_widget_message_date').attr('href') || url;
    const body = strip($(el).find('.tgme_widget_message_text').text());
    const publishedAt = $(el).find('time').attr('datetime') || null;
    if (title && link) out.push({source:'telegram_s', title, url:link, body, publishedAt});
  });
  return out;
}
