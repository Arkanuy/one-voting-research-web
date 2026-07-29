# Source Ledger — Product Discovery One Voting v2

**Tanggal akses:** 29 Juli 2026  
**Tujuan:** mencatat sumber yang mengubah keputusan Product Discovery v2.  
**Batas:** sumber vendor membuktikan klaim yang mereka publikasikan, bukan efektivitas kontrol atau sertifikasi independen.

## Cara membaca

- **Bukti produk:** dokumentasi fitur, harga, atau cara kerja yang diterbitkan vendor.
- **Bukti teknis:** standar/panduan yang dipakai untuk acceptance checklist.
- **Bukti hukum:** naskah atau metadata regulasi resmi; penerapan faktual tetap memerlukan review hukum.
- **Bukti akademik:** publikasi yang menjelaskan pola atau risiko, bukan sertifikasi One Voting.

## Kompetitor dan alternatif

| ID | Sumber | URL | Status | Informasi yang dipakai | Pengaruh pada keputusan |
|---|---|---|---:|---|---|
| EB-1 | ElectionBuddy — Features | https://electionbuddy.com/features/ | 200 | voter list, personal key, notices, anonymous option, result controls `[KLAIM VENDOR]` | kategori memerlukan voter management dan lifecycle; jangan mengejar seluruh metode ballot |
| EB-2 | ElectionBuddy — Pricing | https://electionbuddy.com/pricing/ | 200 | halaman aktif; angka tier berbayar tidak stabil pada ekstraksi | harga harus diperiksa ulang saat keputusan komersial |
| SV-1 | Simply Voting — Pricing | https://www.simplyvoting.com/pricing/ | 200 | gratis sampai 10 elector, setelah itu berdasarkan ukuran/quote | model per eligible voter merupakan benchmark, bukan keputusan final |
| SV-2 | Simply Voting — Internet Voting | https://www.simplyvoting.com/ | 200 | eligible voter upload, authentication gate, receipt/result `[KLAIM VENDOR]` | receipt dan enkripsi vendor tidak boleh disebut E2E verification tanpa bukti |
| OV-1 | OpaVote — Pricing | https://opavote.com/pricing | 200 | gratis ≤25 voter/10 kandidat; pay-as-you-go $10 per 125 voter atau 20 kandidat | harga publik menunjukkan pay-per-election layak diuji |
| OV-2 | OpaVote — Online Elections | https://opavote.com/help/online-elections | 200 | lifecycle, email/code, one-vote, anonymous mode, monitoring, result | pisahkan audit operasional dari verifikasi kriptografis |
| ER-1 | Election Runner — Pricing | https://electionrunner.com/pricing | 200 | $0 ≤20; $19 ≤100; $36 ≤300; $49 ≤500; $75 ≤750; $90 ≤1.000 | benchmark harga untuk organisasi kecil; bukan willingness-to-pay Indonesia |
| ER-2 | Election Runner — Product | https://electionrunner.com/ | 200 | Voter ID/Key, import, schedule, candidate profile, mobile/app `[KLAIM VENDOR]` | workflow mudah dan mobile adalah table stakes |
| GF-1 | Google — Publish & share forms | https://support.google.com/docs/answer/2839588?hl=en | 200 | audience, sign-in, limit one response, link/email/embed | form umum berguna tetapi tidak membuktikan roster-bound election |
| GF-2 | Google — Manage responses | https://support.google.com/docs/answer/139706?hl=en | 200 | pemilik melihat/mengelola respons dan menghentikan penerimaan | secret-ballot separation tidak ditemukan pada docs yang diperiksa |
| MF-1 | Microsoft — Form settings | https://support.microsoft.com/en-us/office/adjust-your-form-or-quiz-settings-in-microsoft-forms-f255a4ba-e03c-4e12-b880-f7e8b62e0665 | 200 | audience, record name, one response, deadline, receipt | pembatasan bergantung tenant/akun; bukan election lifecycle lengkap |
| MF-2 | Microsoft — Send and collect | https://support.microsoft.com/en-us/office/send-a-form-and-collect-responses-2eaf3294-0cff-492d-884d-a1dee909e845 | 200 | link, Outlook/Teams, QR, embed, mobile site | distribusi mudah menjadi benchmark UX |

## Keamanan, identitas, privasi, dan aksesibilitas

| ID | Sumber | URL | Status | Informasi yang dipakai | Pengaruh pada keputusan |
|---|---|---|---:|---|---|
| SEC-1 | OWASP ASVS 5.0.0 | https://owasp.org/www-project-application-security-verification-standard/ | 200 | baseline kontrol aplikasi yang dapat diuji | gunakan acceptance checklist berversi; jangan klaim sertifikasi |
| SEC-2 | OWASP Authentication Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html | 200 | reauthentication, generic errors, rate limiting, MFA berbasis risiko | MFA admin menjadi gate pilot, bukan fitur kosmetik |
| SEC-3 | OWASP Session Management | https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html | 200 | random session ID, TLS, cookie flags, rotation, timeout, revocation | session hardening wajib MVP |
| ID-1 | NIST SP 800-63B-4 | https://pages.nist.gov/800-63-4/sp800-63b.html | 200 | AAL, password, throttling, recovery, reauthentication | gunakan risk assessment; jangan klaim NIST certification |
| PRIV-1 | NIST Privacy Framework | https://www.nist.gov/privacy-framework | 200 | privacy risk management dan data-flow inventory | pelengkap governance, bukan pengganti UU PDP |
| A11Y-1 | WCAG 2.2 | https://www.w3.org/TR/WCAG22/ | 200 | kriteria dapat diuji untuk proses lengkap | target internal AA; automated scan saja tidak cukup |
| LAW-1 | UU No. 27 Tahun 2022 PDP | https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022 | 200 | hak subjek, dasar pemrosesan, kewajiban pengendali/prosesor, insiden | data minimization, retention, DPA, rights flow, dan incident playbook sejak MVP |
| EVT-1 | National Academies — Securing the Vote | https://doi.org/10.17226/25120 | 200 | risiko internet voting dan kebutuhan bukti independen dalam konteks pemilu publik | mempertegas bahwa One Voting bukan pemilu nasional dan audit internal memiliki batas |
| EVT-2 | Adida — Helios: Web-based Open-Audit Voting | https://www.usenix.org/legacy/event/sec08/tech/full_papers/adida/adida.pdf | 200 | contoh end-to-end verifiable/open-audit voting | confirmation MVP tidak boleh disebut cryptographic receipt |
| EVT-3 | EAC VVSG 2.0 | https://www.eac.gov/sites/default/files/TestingCertification/Voluntary_Voting_System_Guidelines_Version_2_0.pdf | 200 | secrecy, auditability, accessibility, controls, testing | negative-space checklist saja; tidak ada klaim kepatuhan |

## Batas bukti

1. Tidak ada trial/teardown produk kompetitor pada riset ini.
2. Tidak ada penetration test atau audit source code vendor.
3. “Tidak ditemukan” berarti tidak ditemukan pada URL yang diperiksa, bukan bukti fitur pasti tidak ada.
4. Harga adalah snapshot dan dapat berubah.
5. Belum ada wawancara, usability test, pilot, atau data penggunaan One Voting.
6. Sumber AS/standar internasional dipakai sebagai pola teknis, bukan hukum Indonesia.
7. Interpretasi UU PDP harus diperiksa penasihat hukum/DPO berdasarkan arsitektur, kontrak, skala, dan kategori data faktual.

## Dokumen rinci

- [Ledger kompetitor v2](./competitor-v2.md)
- [Ledger keamanan, privasi, aksesibilitas, dan e-voting v2](./security-v2.md)
- [Gap analysis PDD v1 → v2](./pdd-v2-gap-analysis.md)
- [Competitor research awal](../competitor-research.md)
- [Security & privacy research awal](../security-privacy-research.md)

## Keputusan yang berubah atau diperjelas pada v2

- Klaim vendor selalu diberi batas bukti.
- Harga publik OpaVote dan Election Runner dipakai sebagai benchmark; harga lokal tetap hipotesis.
- ASVS yang dirujuk adalah 5.0.0.
- NIST identity guidance yang dirujuk adalah SP 800-63B-4.
- MFA untuk organizer/admin menjadi security gate pilot sesuai risiko, meskipun pengalaman login lengkap dapat diiterasi.
- Confirmation/receipt MVP bukan bukti kriptografis atau end-to-end verifiability.
- WCAG 2.2 AA adalah target internal yang memerlukan uji manual.
- UU PDP diperlakukan sebagai workstream produk dan operasi, bukan checkbox di akhir development.
- Model kerahasiaan mengakui metadata correlation dan insider/infrastructure residual risk.