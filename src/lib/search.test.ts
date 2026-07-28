import{describe,it,expect}from'vitest';import{searchDocuments}from'./search';
const docs=[{slug:'pdd',title:'PDD',description:'',content:'# Intro\nhello\n## Pain Points\nduplicate voting problem\n## Security\nduplicate voting mitigation'}];
describe('searchDocuments',()=>{it('returns section-level deep links',()=>{const hits=searchDocuments(docs,'duplicate voting');expect(hits).toHaveLength(2);expect(hits[0]).toMatchObject({section:'Pain Points',anchor:'pain-points'});expect(hits[1].anchor).toBe('security')});it('requires two characters',()=>expect(searchDocuments(docs,'d')).toEqual([]))});
