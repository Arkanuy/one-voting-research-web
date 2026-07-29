#!/usr/bin/env python3
import re,sys
from pathlib import Path
REQUIRED=["Tentang One Voting","Mengapa Produk Ini Dibutuhkan","Masalah yang Dipilih","Pengguna dan Pasar Awal","Solusi yang Diusulkan","Keputusan MVP","Risiko dan Langkah Berikutnya","Metode dan Batas Riset","Proses Voting Saat Ini","Problem Statement","Target User dan Stakeholder","Persona dan Jobs to Be Done","Pain Points dan Prioritas","Existing Solutions","Competitor Analysis","Market Gap dan Positioning","Solution Hypothesis","Assumption Mapping","Prinsip Produk","Alur Election End-to-End","Scope MVP V1","Post-MVP dan Future Scope","Feature Prioritization","User Stories dan Acceptance Criteria","Role dan Permission","Success Metrics","Model Kerahasiaan Suara","Risiko Keamanan dan Mitigasi","Privasi dan UU PDP","Arsitektur Teknis yang Direkomendasikan","Data Model Konseptual","Transaksi Vote dan Idempotency","Non-Functional Requirements","Validation Plan","Rencana Pilot","Roadmap Development","Go/No-Go Criteria","Open Questions","Rekomendasi Akhir","Referensi dan Lampiran"]
def slug(s): return re.sub(r'-+','-',re.sub(r'[^a-z0-9\s-]','',s.lower()).strip().replace(' ','-'))
def validate(text,root):
 errors=[]; headings=re.findall(r'^##\s+(?:\d+\.\s+)?(.+?)\s*$',text,re.M); normalized=[re.sub(r'[*_`]','',x).strip() for x in headings]
 missing=[x for x in REQUIRED if x not in normalized]
 if missing: errors.append('Bagian wajib hilang: '+', '.join(missing))
 if re.search(r'\b(TODO|TBD|PLACEHOLDER)\b',text,re.I): errors.append('Placeholder ditemukan')
 ids=[slug(x) for x in normalized]
 if len(ids)!=len(set(ids)): errors.append('Heading ID duplikat')
 words=len(re.findall(r'\b\w+\b',text))
 if words<6000: errors.append(f'Dokumen terlalu pendek: {words} kata')
 for label in ['[FAKTA]','[INSIGHT]','[ASUMSI]','[REKOMENDASI]','[PERLU VALIDASI]']:
  if label not in text: errors.append('Label hilang: '+label)
 for target in re.findall(r'\[[^]]+\]\((?!https?://|#)([^)]+)\)',text):
  if not (root/target).resolve().exists(): errors.append('Local link rusak: '+target)
 return errors
def main():
 p=Path(sys.argv[1] if len(sys.argv)>1 else 'content/product-discovery.md');errors=validate(p.read_text(),p.parent)
 if errors: print('\n'.join('ERROR: '+x for x in errors));return 1
 print(f'PDD valid: {p}');return 0
if __name__=='__main__':raise SystemExit(main())
