import fs from "node:fs";
import path from "node:path";

export const documents = [
  { slug: "product-discovery", title: "Product Discovery", description: "Dokumen utama: masalah, pengguna, strategi, MVP, keamanan, dan validasi." },
  { slug: "research-plan", title: "Research Plan", description: "Rencana, scope, metode, standar bukti, dan kriteria keputusan." },
  { slug: "competitor-research", title: "Competitor Research", description: "Perbandingan platform voting dan ledger sumber resmi." },
  { slug: "security-privacy-research", title: "Security & Privacy", description: "Keamanan, privasi, auditability, dan accessibility." },
] as const;
export type DocumentSlug = (typeof documents)[number]["slug"];
export type Heading = { id: string; text: string; level: number };
const root = path.join(process.cwd(), "content");
export function isDocumentSlug(slug: string): slug is DocumentSlug { return documents.some(d => d.slug === slug); }
export function getDocumentMeta(slug: DocumentSlug) { return documents.find(d => d.slug === slug)!; }
export function getMarkdown(slug: DocumentSlug) { return fs.readFileSync(path.join(root, `${slug}.md`), "utf8"); }
export function slugify(value: string) { return value.toLowerCase().trim().replace(/[`*_~[\]()]/g, "").replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s+/g, "-").replace(/-+/g, "-"); }
export function extractHeadings(markdown: string): Heading[] { return markdown.split("\n").flatMap(line => { const m = /^(#{2,3})\s+(.+)$/.exec(line); return m ? [{ level: m[1].length, text: m[2].replace(/[*_`]/g, ""), id: slugify(m[2]) }] : []; }); }
const researchLabels = /\[(FAKTA|INSIGHT|ASUMSI|REKOMENDASI|PERLU VALIDASI)\]/g;
export function decorateResearchLabels(markdown: string) { return markdown.replace(researchLabels, "`[$1]`"); }
export function getSearchIndex() { return documents.map(d => ({ ...d, content: getMarkdown(d.slug).replace(/[#*`|>\[\]]/g, " ").replace(/\s+/g, " ") })); }
