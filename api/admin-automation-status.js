import { isAdmin } from '../lib/admin-auth.js';
import { db } from '../lib/automatic-verification.js';
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(!isAdmin(req))return res.status(401).json({error:'Unauthorized'});
  try{return res.json(await db('rpc/happyhr_automatic_submission_summary',{method:'POST',body:'{}'}));}
  catch(e){return res.status(500).json({error:e.message});}
}
