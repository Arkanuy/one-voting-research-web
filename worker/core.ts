export const allowed=(login:string,list:string)=>list.split(',').map(x=>x.trim().toLowerCase()).includes(login.toLowerCase());
export const hash=async(v:string)=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v)))].map(x=>x.toString(16).padStart(2,'0')).join('');
export const token=(n=32)=>{const b=new Uint8Array(n);crypto.getRandomValues(b);return btoa(String.fromCharCode(...b)).replace(/[+/=]/g,'')};
export const valid=(slug:string,md:string)=>/^[a-z0-9-]+$/.test(slug)&&md.length>0&&md.length<=1_000_000;
export const cookies=(r:Request)=>Object.fromEntries((r.headers.get('cookie')||'').split(';').map(x=>x.trim().split('=')).filter(x=>x.length===2));
export const json=(x:unknown,s=200,h:HeadersInit={})=>new Response(JSON.stringify(x),{status:s,headers:{'content-type':'application/json',...h}});
export const sessionCookie=(v:string,age=604800)=>`ov_session=${v}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`;
