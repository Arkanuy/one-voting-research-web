# Riset keamanan, privasi, auditabilitas, dan usability — One Voting

**Tanggal akses:** 28 Juli 2026  
**Ruang lingkup:** pemungutan suara kampus, sekolah, komunitas, dan organisasi internal; bukan rekomendasi atau sertifikasi untuk pemilu nasional.

## Ringkasan keputusan

MVP sebaiknya diposisikan sebagai aplikasi pemungutan suara internal yang **meminimalkan data**, bukan sebagai sistem internet voting berjaminan kriptografis penuh. Pisahkan layanan/penyimpanan **identitas dan kelayakan** dari **kotak suara**, tegakkan satu hak suara dengan token sekali pakai dan transaksi atomik, sediakan log administratif tahan manipulasi namun jangan pernah mencatat pilihan pemilih, serta uji aksesibilitas terhadap WCAG 2.2 AA. Jangan mengklaim “anonim mutlak”, “anti-kecurangan”, atau “end-to-end verifiable” tanpa protokol, implementasi, dan evaluasi independen yang benar-benar mendukung klaim itu.

## Temuan dan implikasi MVP

### 1. Kerahasiaan suara dan pemisahan identitas–suara

**Temuan.** Prinsip kerahasiaan tidak cukup dipenuhi dengan menyembunyikan nama di UI. Tautan dapat muncul kembali melalui foreign key, timestamp presisi, IP/user-agent, urutan event, backup, telemetry, atau log. Literatur end-to-end verifiable (E2E-V) menunjukkan bahwa verifikasi hasil dan kerahasiaan dapat digabung, tetapi protokol tersebut kompleks dan rentan terhadap kesalahan implementasi serta masalah usability. Helios (Adida, 2008) adalah contoh *open-audit voting* untuk pemilihan berisiko relatif rendah; modelnya bukan bukti bahwa remote voting aman dari coercion.

**Implikasi MVP.**
- Pisahkan dua domain data: (a) `eligibility/identity` dan status hak suara; (b) ballot terenkripsi/pseudonim. Hindari ID pengguna di tabel ballot.
- Setelah autentikasi dan pemeriksaan eligibility, terbitkan token acak berentropi tinggi, sekali pakai, berumur pendek. Kotak suara memvalidasi token tanpa menerima identitas.
- Gunakan waktu yang dibulatkan/batch pada artefak publik; batasi log jaringan yang dapat menghubungkan sesi ke ballot. Pisahkan kunci, peran, retensi, dan akses operator.
- Jangan memberi “receipt” yang membuktikan isi pilihan kepada pihak ketiga; itu memperbesar risiko jual-beli suara/coercion. Receipt MVP hanya menyatakan ballot diterima, dengan kode acak yang tidak mengungkap pilihan.
- Threat model harus menyatakan secara eksplisit bahwa perangkat pemilih yang terinfeksi, coercion di luar sistem, dan kolusi admin adalah risiko residual remote voting.

### 2. Satu orang–satu suara, idempotency, dan integritas transaksi

**Temuan.** Authentication membuktikan kontrol atas akun, bukan otomatis identitas dunia nyata atau eligibility. NIST SP 800-63B memberi pedoman autentikasi (termasuk MFA, rate limiting, dan lifecycle authenticator), sedangkan OWASP ASVS/Authentication Cheat Sheet menerjemahkannya ke kontrol aplikasi web. Duplicate submission juga bisa terjadi secara benign karena retry jaringan/double-click, bukan hanya serangan.

**Implikasi MVP.**
- Impor roster resmi dari organisasi; eligibility dibekukan/versioned per election. Pisahkan role voter, organizer, auditor, dan support.
- Gunakan unique constraint pada `(election_id, eligibility_subject)` di domain eligibility dan token unik/sekali pakai di ballot box.
- Endpoint `cast` menerima `Idempotency-Key`; pemrosesan dalam satu transaksi atomik: validasi election + konsumsi token + simpan ballot + catat event. Retry dengan key dan payload sama mengembalikan hasil sama; key sama dengan payload berbeda ditolak.
- Jangan mengandalkan tombol disabled atau cek aplikasi saja; gunakan constraint database, locking/serializable semantics yang teruji, CSRF protection, rate limit, dan replay protection.
- Untuk pemilihan yang mengizinkan revote, spesifikasikan aturan secara eksplisit (mis. ballot terakhir berlaku) dan analisis dampaknya pada coercion serta audit.

### 3. Auditability tanpa merusak privasi

**Temuan.** NISTIR 8310 memetakan Cybersecurity Framework ke infrastruktur pemilihan dan menekankan identifikasi aset/risiko, proteksi, deteksi, respons, serta pemulihan. NIST SP 800-92 dan OWASP Logging Cheat Sheet menekankan logging terpusat, perlindungan integritas, sinkronisasi waktu, monitoring, dan larangan mencatat secret/sensitive data. Audit trail aplikasi bukan dengan sendirinya bukti bahwa hasil benar; operator dengan akses DB dapat mengubah data dan log jika tidak ada kontrol terpisah.

**Implikasi MVP.**
- Catat event administratif dan lifecycle: election dibuat/diubah/dibuka/ditutup, roster diimpor, token diterbitkan/dikonsumsi (tanpa pemetaan pilihan), cast diterima, tally dimulai/selesai, ekspor, login gagal, perubahan role.
- Setiap event: UTC, actor pseudonymous/admin ID, action, object/election, outcome, correlation ID, version/config hash. **Jangan log pilihan, token mentah, password, session ID, atau data pribadi yang tidak perlu.**
- Buat log append-only dengan hash chaining/HMAC dan kirim ke penyimpanan terpisah/WORM bila tersedia. Integritas log harus diverifikasi otomatis; akses baca auditor terpisah dari admin operasional.
- Bekukan konfigurasi setelah voting dibuka atau wajibkan four-eyes approval dan catatan perubahan. Publikasikan jumlah eligible, token issued/used, ballot accepted, invalid/rejected, dan hasil rekonsiliasi—hanya jika ukuran kelompok cukup untuk tidak membuka pilihan individu.
- Backup terenkripsi, restore drill, incident playbook, dan prosedur manual pembatalan/rerun diperlukan; “blockchain” bukan pengganti kontrol ini.

### 4. Keamanan aplikasi web

**Temuan.** CISA Election Security Toolkit mengarahkan organisasi pada risk management, account security, phishing, vulnerability management, backups, incident response, dan supply-chain practices. OWASP ASVS adalah baseline kontrol yang dapat diuji; Authentication dan Logging Cheat Sheets memberi implementasi lebih rinci.

**Implikasi MVP.**
- Targetkan OWASP ASVS Level 2 untuk internet-facing app: TLS; secure cookies; CSRF; output encoding; parameterized queries; authorization per object; secret manager; dependency/SBOM scanning; patching; CSP; upload restrictions; error handling aman.
- MFA wajib untuk organizer/admin; phishing-resistant authenticator lebih baik bila tersedia. Voter SSO organisasi lebih baik daripada membuat password baru.
- Threat model minimum: credential stuffing/phishing, account takeover, broken access control, injection/XSS/CSRF, replay/double cast, insider/admin abuse, DB/log tampering, DDoS, dependency compromise, roster poisoning, ballot secrecy linkage, perangkat pemilih terinfeksi, coercion, dan kegagalan availability.
- Security test sebelum rilis: authorization matrix, concurrency/idempotency test, abuse/rate-limit test, restore test, log-integrity test, dependency scan, dan pentest independen untuk pemilihan berdampak tinggi.

### 5. UU Pelindungan Data Pribadi Indonesia

**Temuan.** UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi menetapkan dasar pemrosesan, tujuan dan transparansi, relevansi/minimalisasi, akurasi, keamanan, retensi/penghapusan, hak subjek, kewajiban pengendali/prosesor, pencatatan pemrosesan, serta pemberitahuan kegagalan pelindungan data pribadi. Pilihan politik termasuk data pribadi spesifik; pada konteks organisasi, isi ballot yang mengungkap pandangan/pilihan politik patut diperlakukan sangat sensitif meski kontes bukan pemilu nasional. Dasar hukum yang tepat tidak selalu “persetujuan”; ketergantungan/ketimpangan relasi kampus-sekolah dapat membuat persetujuan tidak bebas.

**Implikasi MVP.**
- Dokumentasikan pengendali, prosesor/vendor, tujuan, kategori data, dasar pemrosesan, penerima, lokasi/transfer, retensi, dan kanal hak subjek sebelum election.
- Lakukan penilaian dampak pelindungan data untuk pemrosesan berisiko tinggi/profiling/skala besar atau penggunaan teknologi baru; minimal lakukan privacy threat assessment untuk setiap deployment.
- Privacy notice harus menjelaskan pemisahan identitas–suara dan batasnya secara jujur. Minimalkan roster fields; tetapkan jadwal hapus token/session/IP/raw logs. Penghapusan identitas tidak boleh merusak bukti agregat yang sah.
- Buat kontrak pemrosesan vendor, kontrol akses, enkripsi, register aktivitas pemrosesan, prosedur permintaan hak, dan incident/breach workflow. UU mensyaratkan pemberitahuan tertulis kegagalan pelindungan PDP paling lambat **3 × 24 jam** kepada subjek dan lembaga sesuai ketentuan UU.
- Validasi interpretasi dengan penasihat hukum Indonesia; ini riset produk, bukan opini hukum.

### 6. Usability dan aksesibilitas

**Temuan.** WCAG 2.2 adalah standar umum aksesibilitas web, bukan standar voting khusus. Literatur usability e-voting memperingatkan bahwa mekanisme verifikasi yang secara kriptografis benar dapat gagal secara praktis bila pengguna tidak memahami atau tidak menjalankannya. Keberhasilan task dan pemahaman lebih penting daripada sekadar kepuasan subjektif.

**Implikasi MVP.**
- Target WCAG 2.2 AA: keyboard penuh, focus visible/not obscured, semantic labels, error identification, contrast, zoom/reflow, target size, timeout warning/extension, status messages untuk assistive technology.
- Alur ringkas: autentikasi → petunjuk → ballot → review → cast → konfirmasi non-revealing. Jangan gunakan warna saja; jangan auto-submit; sediakan koreksi sebelum cast.
- Uji dengan screen reader, keyboard-only, low vision/zoom, mobile, koneksi lambat, dan pengguna dengan literasi digital rendah. Ukur completion, error/undervote tak disengaja, waktu, kebutuhan bantuan, pemahaman finality, dan kemampuan memverifikasi penerimaan.
- Sediakan kanal bantuan yang tidak dapat melihat atau mengubah pilihan, serta prosedur alternatif yang setara bila akses digital gagal.

## Acceptance criteria MVP yang disarankan

1. Tidak ada query/API/log yang dapat langsung mengembalikan `user_id → choice`; uji korelasi timestamp dilakukan.
2. 100+ concurrent retries atas cast yang sama menghasilkan tepat satu ballot dan respons idempoten.
3. Organizer tidak dapat membaca pilihan individual; perubahan role/config menghasilkan event audit dan, setelah open, perlu dual approval.
4. Rekonsiliasi `eligible / issued / consumed / accepted / tallied` deterministik dan discrepancy menghentikan publikasi hasil.
5. Audit log tampering terdeteksi; restore backup dan incident drill berhasil.
6. ASVS L2 checklist ditautkan ke test/evidence; temuan high/critical ditutup sebelum pemungutan suara.
7. Privacy notice, retention schedule, processing register, vendor terms, dan breach runbook tersedia.
8. Critical voting journey lulus keyboard + screen reader; tidak ada blocker WCAG 2.2 A/AA; usability test mencakup pengguna sasaran.

## Batasan bukti

- Pedoman NIST/CISA/VVSG lahir terutama untuk infrastruktur pemilu AS; prinsipnya berguna tetapi bukan sertifikasi atau kewajiban langsung bagi voting internal Indonesia.
- OWASP ASVS/cheat sheets adalah baseline keamanan aplikasi, bukan bukti secrecy, correctness tally, coercion resistance, atau E2E verifiability.
- WCAG menilai aksesibilitas antarmuka, bukan apakah pemilih memahami konsekuensi atau apakah hasil pemilihan benar.
- Helios dan studi E2E-V menunjukkan kemungkinan/desain serta kelemahan tertentu; hasilnya tidak otomatis berpindah ke arsitektur One Voting. E2E-V harus dinilai pada protokol dan implementasi konkret.
- Remote voting tidak dapat sepenuhnya mengendalikan malware pada perangkat pemilih, coercion, vote buying, atau observasi di lingkungan pengguna.
- Sumber UU resmi/otoritatif menjelaskan teks hukum, tetapi penerapan kasus spesifik, peraturan pelaksana, dan praktik regulator dapat berubah; perlu review hukum terkini.
- Beberapa URL lama NIST/CISA/USENIX yang ditemukan telah 404; URL itu dicatat sebagai jejak riset dan tidak dipakai sebagai bukti substantif.

## Ledger sumber yang diakses

| Status | Sumber | URL langsung | Topik/pengaruh |
|---|---|---|---|
| 200 | NIST, Voting program | https://www.nist.gov/itl/voting | Portal program dan materi standards/research voting; konteks auditability, security, accessibility. |
| 200 | NISTIR 8310, *Cybersecurity Framework Election Infrastructure Profile* | https://csrc.nist.gov/pubs/ir/8310/final | Kerangka risk lifecycle untuk election infrastructure; dasar threat/risk governance. |
| 200 | NIST SP 800-63B, *Digital Identity Guidelines: Authentication and Lifecycle Management* | https://pages.nist.gov/800-63-3/sp800-63b.html | Autentikasi, MFA, throttling, authenticator lifecycle. Catatan: edisi/seri NIST dapat diperbarui; implementasi harus mengecek versi current. |
| 200 | NIST SP 800-92, *Guide to Computer Security Log Management* | https://csrc.nist.gov/pubs/sp/800/92/final | Tata kelola, proteksi, monitoring, retensi log. |
| 200 | CISA, *Cybersecurity Toolkit to Protect Elections* | https://www.cisa.gov/resources-tools/resources/cybersecurity-toolkit-protect-elections | Praktik operasional keamanan dan ketahanan; relevansi dianalogikan, bukan sertifikasi voting internal. |
| 200 | OWASP ASVS | https://owasp.org/www-project-application-security-verification-standard/ | Baseline kontrol aplikasi yang dapat diuji; target MVP L2. |
| 200 | OWASP Logging Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html | Event selection, data yang dilarang di log, proteksi dan monitoring. |
| 200 | OWASP Authentication Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html | Authentication/MFA/session defenses; tidak menggantikan eligibility. |
| 200 | BPK RI, UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi | https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022 | Teks/metadata regulasi Indonesia; dasar privacy controls dan 3×24 jam breach notification. |
| 200 | W3C Recommendation, WCAG 2.2 | https://www.w3.org/TR/WCAG22/ | Acceptance criteria aksesibilitas antarmuka. |
| 200 | Adida (2008), *Helios: Web-based Open-Audit Voting* | https://www.usenix.org/legacy/events/sec08/tech/full_papers/adida/adida.pdf | Contoh E2E/open-audit untuk low-coercion settings; mendukung batasan klaim MVP. |
| 200 | Juels, Catalano & Jakobsson, *Coercion-Resistant Electronic Elections* | https://www.usenix.org/legacy/events/wpesp05/tech/full_papers/juels/juels.pdf | Model coercion/receipt-freeness; menunjukkan kesulitan remote voting. |
| 200 | Karayumak et al. (2011), *Towards Secure and Usable Voting* | https://doi.org/10.1145/1978942.1979270 | Usability/security verification; kebutuhan user testing dan comprehension. |
| 200 | National Academies (2018), *Securing the Vote* | https://doi.org/10.17226/25120 | Konsensus tentang risiko internet voting dan pentingnya evidence/audit; konteks AS, bukan aturan Indonesia. |
| 404, tidak dijadikan bukti | NIST publication URL lama | https://www.nist.gov/publications/cybersecurity-framework-profile-election-infrastructure | Jejak discovery; diganti halaman CSRC NISTIR 8310. |
| 404, tidak dijadikan bukti | CISA election security URL lama | https://www.cisa.gov/topics/cyber-threats-and-advisories/election-security | Jejak discovery; diganti CISA toolkit aktif. |
| 404, tidak dijadikan bukti | CISA best-practices URL lama | https://www.cisa.gov/resources-tools/resources/best-practices-securing-election-systems | Jejak discovery; tidak dipakai untuk klaim. |
| 404, tidak dijadikan bukti | USENIX EVT URL lama | https://www.usenix.org/conference/evt-06/end-end-verifiability | Jejak discovery; tidak dipakai untuk klaim. |

**Catatan status:** status HTTP diuji pada 2026-07-28 untuk URL yang ditandai 200/404 pada sesi riset. DOI digunakan sebagai tautan persisten; akses full text dapat bergantung pada penerbit/institusi.

## Prioritas implementasi

- **P0:** data separation; transaction/idempotency; authorization; no-choice logging; privacy notice/retention; backup/restore; WCAG critical path.
- **P1:** append-only external audit log; dual control; reconciliation report; MFA admin; independent security/usability test.
- **P2:** cryptographic public verifiability hanya setelah threat model, protokol terpublikasi, expert review, dan user study—bukan fitur kosmetik “blockchain”.

Dokumen ini adalah sintesis engineering/product, bukan sertifikasi keamanan, audit formal, atau nasihat hukum.