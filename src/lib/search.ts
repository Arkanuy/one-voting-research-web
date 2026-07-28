export type SearchDocument={slug:string;title:string;description:string;content:string};
export type SearchHit={key:string;slug:string;title:string;section:string;anchor:string;snippet:string};
const slugify=(value:string)=>value.toLowerCase().trim().replace(/[`*_~[\]()]/g,"").replace(/[^\p{L}\p{N}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-");
export function searchDocuments(items:SearchDocument[],query:string,limit=12):SearchHit[]{
 const q=query.trim().toLowerCase();if(q.length<2)return[];const hits:SearchHit[]=[];
 for(const doc of items){const sections=doc.content.split(/(?=^#{1,3}\s+)/gm);for(const section of sections){const heading=/^#{1,3}\s+(.+)$/m.exec(section)?.[1]?.replace(/[*_`]/g,"")||doc.title;const body=section.replace(/^#{1,3}\s+.+$/m,"").replace(/[#*`|>\[\]]/g," ").replace(/\s+/g," ").trim();const hay=(heading+" "+body).toLowerCase();const at=hay.indexOf(q);if(at<0)continue;const bodyAt=body.toLowerCase().indexOf(q);const start=Math.max(0,(bodyAt<0?0:bodyAt)-70);hits.push({key:`${doc.slug}-${slugify(heading)}`,slug:doc.slug,title:doc.title,section:heading,anchor:slugify(heading),snippet:body.slice(start,start+220)});if(hits.length>=limit)return hits}}
 return hits;
}
