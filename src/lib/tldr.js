import OpenAI from 'openai';

export async function makeUzTldr(text){
  const key = process.env.OPENAI_API_KEY;
  if(!key) return 'Qisqa: manba yangiligini tekshirib ko‘ring.';
  const client = new OpenAI({apiKey:key});
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const prompt = `Matnni uzbek lotinida 2-3 jumla qilib qisqa TL;DR qil. Faktlarni buzma. Matn:\n${text.slice(0,4000)}`;
  const r = await client.responses.create({model, input:prompt});
  return (r.output_text || '').trim();
}
