import { timingSafeEqual } from 'node:crypto';
import { db,processSubmission } from '../lib/automatic-verification.js';
export const config={maxDuration:60};
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  const expected=`Bearer ${process.env.CRON_SECRET||''}`,actual=req.headers.authorization||'';
  if(!process.env.CRON_SECRET||actual.length!==expected.length||!timingSafeEqual(Buffer.from(actual),Buffer.from(expected)))return res.status(401).json({error:'Unauthorized'});
  if(!['GET','POST'].includes(req.method))return res.status(405).end();
  try{
    const jobs=await db('rpc/happyhr_claim_automatic_submissions',{method:'POST',body:JSON.stringify({p_limit:8})});
    const outcomes=await Promise.all(jobs.map(processSubmission));
    return res.status(200).json({processed:jobs.length,published:outcomes.filter(x=>x==='published').length,retry:outcomes.filter(x=>x==='retry').length});
  }catch(e){return res.status(500).json({error:e.message});}
}
