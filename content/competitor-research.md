# Riset Kompetitor One Voting

**Konteks:** e-voting web skala kecil–menengah untuk organisasi mahasiswa Indonesia  
**Tanggal pemeriksaan sumber:** 2026-07-28  
**Aturan bukti:** hanya klaim yang tampak pada halaman resmi yang dicatat sebagai fakta. “Tidak ditemukan” berarti tidak ditemukan pada sumber resmi yang diperiksa, **bukan** berarti platform pasti tidak memilikinya. Harga dalam USD dan dapat berubah.

## Ringkasan eksekutif

- **Election Runner** paling langsung cocok untuk pemilu mahasiswa sederhana: gratis ≤20 pemilih, USD19 ≤100, USD36 ≤300; ID+key unik, mobile/web/app, dan klaim target WCAG 2.0 AA/Section 508. Kekurangan bukti publik: artefak audit/recount tidak dijelaskan jelas pada halaman yang diperiksa.
- **OpaVote** paling transparan dan murah untuk 25–1.000 pemilih serta unggul pada ranked-choice: gratis ≤25; USD10 per 125 pemilih atau 20 kandidat. Kode/email unik membatasi satu suara; aktivitas dan hasil bisa diunduh. Klaim aksesibilitas formal (WCAG) tidak ditemukan.
- **ElectionBuddy** mempunyai cakupan fitur paling luas: banyak metode suara, password kedua/konfirmasi telepon, audit, recount/review independen, SSO, dan lintas perangkat. Harga nominal plan tidak terbaca pada halaman publik yang diperiksa; hanya “gratis di bawah 20 pemilih” muncul dalam metadata resmi halaman.
- **Simply Voting** kuat untuk organisasi yang memerlukan proses formal: autentikasi dipilih saat setup, ballot disebut tamper-proof, suara terenkripsi, receipt, serta hasil yang dapat diverifikasi. Gratis ≤10; estimasi nominal selebihnya bergantung kalkulator/quote. Bukti formal mobile/accessibility perlu diminta saat procurement.

## Matriks bukti kompetitor utama

| Platform | Fitur pemilu | Autentikasi / eligibility | Auditability / integritas | Pricing publik | Mobile / accessibility | Catatan untuk One Voting |
|---|---|---|---|---|---|---|
| **ElectionBuddy** | FPTP, cumulative, preferential, STV, Borda, scored, rating, approval; ballot dapat dikustomisasi; subgroup, weighted vote, write-in, reminder, multi-bahasa. | Personal voting key sekali pakai; enkripsi 256-bit; opsi password kedua atau konfirmasi telepon; SSO disebut sebagai fitur. | Pilihan anonim tidak dapat dihubungkan ke pemilih; *Independent Verification* memungkinkan review/recount; *Election Audit*, report/graph disebut resmi. Jangan menyamakan ini dengan end-to-end cryptographic verifiability—halaman tidak mengklaim itu. | Metadata resmi halaman menyebut gratis untuk <20 pemilih; bayar saat siap mulai, berdasar jumlah eligible voters. Nominal tier lain tidak tampak pada render yang diperiksa. | Voting via ponsel, komputer, tablet, atau surat. Klaim standar WCAG/Section 508 tidak ditemukan pada halaman fitur yang diperiksa. | Benchmark terlengkap untuk workflow admin dan assurance, tetapi transparansi harga publik lebih rendah. |
| **Simply Voting** | Setup tanggal/waktu/pertanyaan; branded voting site; online, telephone, paper, nominations; self-administered atau managed. | Admin memilih metode autentikasi dan mengunggah daftar eligible voters; pemilih login dan hanya mendapat ballot bila belum memilih. | Ballot disebut *tamper-proof*; setiap suara dienkripsi untuk anonimitas; receipt diterbitkan; halaman resmi menjelaskan hasil dapat diverifikasi (klaim vendor, bukan sertifikasi independen). | Gratis untuk ≤10 electors. Biaya berdasar eligible voters; nominal dihitung kalkulator; premium/managed dan beberapa fitur (telephone, nominations, weighted vote, segmentation) ekstra/quote. | Produk web dan screenshot “Mobile Login” tersedia, tetapi pernyataan resmi eksplisit responsive/mobile serta WCAG pada halaman yang diperiksa tidak ditemukan. | Cocok bila layanan managed penting; procurement harus meminta harga final, metode auth tepat, accessibility conformance report, dan format audit export. |
| **OpaVote** | Checkbox, ranked-choice, STV, Condorcet, Borda; reminder; multi-bahasa; maksimal 23 contest; hasil downloadable; API. | Election memakai daftar email atau daftar kode; link/kode diberikan ke voter tertentu dan memastikan hanya orang tertentu yang memilih serta hanya sekali. | Opsi anonymous: vendor menyatakan tidak seorang pun, termasuk mereka, dapat menentukan pilihan voter; manager dapat mempublikasikan hasil. Monitor email open, ballot open, submission; hasil dapat diunduh berbagai format. Ini audit operasional, bukan bukti E2E cryptographic audit. | Gratis: ≤25 voter dan 10 kandidat, sampai 3 election simultan. Pay-as-you-go: USD10 per 125 voter **atau** 20 kandidat; contoh USD20/250, USD40/500, USD80/1.000. Retensi 3 bulan gratis; USD40/tahun sesudahnya. | Resmi menyatakan cepat dan “works great on mobile devices”; phone/tablet/laptop/desktop didukung. Klaim WCAG/Section 508 tidak ditemukan. | Value kuat dan methods lengkap; model harga kandidat perlu diperhatikan bila ballot besar. |
| **Election Runner** | Ballot/pertanyaan/kandidat, foto/bio/write-in; import CSV/Excel; schedule; email; custom logo/warna; realtime results dan publish/share. | Setiap voter memiliki **Voter ID + Voter Key** unik dan hanya dapat memilih sekali; admin mengontrol eligibility. | SSL/HTTPS 256-bit; hasil otomatis. Halaman publik yang diperiksa tidak menjelaskan anonymous unlinkability, audit log yang dapat diekspor, receipt, recount, atau verifikasi independen—jangan diasumsikan. | Gratis ≤20 voter; USD19 ≤100; USD36 ≤300; USD49 ≤500; USD75 ≤750; USD90 ≤1.000; >1.000 sekitar USD0,09/voter (tier volume turun). Pay-per-election; diskon/subscription pendidikan via kontak. | Dioptimalkan desktop/mobile; browser dan app iOS/Android. Voting app **menargetkan** Section 508 dan WCAG 2.0 AA (bahasa vendor adalah “targets”, bukan sertifikasi compliance). | Kandidat UX/harga paling relevan untuk kampus; gap auditability harus diuji/demo dan dicantumkan dalam RFP. |

## Tiga solusi alternatif

1. **Helios Voting (open source, self-hosted/hosted)** — alternatif bila verifiability dan transparansi algoritme lebih penting daripada UX komersial. Situs resmi menyebut *verifiable online elections*: ballot terenkripsi, setiap voter memperoleh tracker, dan hasil disertai proof. Kelemahan untuk kampus: operasi, hardening, deliverability, support, accessibility, dan kepatuhan menjadi tanggung jawab implementor; harga hosted tidak ditemukan pada halaman proyek yang dicatat.
2. **POLYAS Online Voting** — alternatif enterprise untuk proses formal. Situs resmi menawarkan online voting dan menyatakan voting melalui perangkat berinternet; pricing berbasis quote/configuration. Cocok sebagai benchmark keamanan/compliance, tetapi kemungkinan overkill untuk organisasi mahasiswa dan harga kecil-menengah tidak transparan.
3. **CIVS (Condorcet Internet Voting Service)** — layanan gratis dari Cornell untuk polling/decision sederhana berbasis Condorcet. Berguna untuk pemilihan preferensial low-stakes; bukan pengganti otomatis pemilu organisasi yang menuntut identity assurance, SLA, branding, audit formal, atau dukungan lokal. Verifikasi batasan melalui dokumentasi resmi sebelum produksi.

## Implikasi produk untuk One Voting

**Baseline kompetitif yang layak dibangun:**
- import daftar pemilih CSV; credential unik sekali pakai; status “sudah/belum memilih” tanpa menghubungkan identitas ke isi ballot;
- reminder, jadwal buka/tutup, preview, test election, publish results, dan ekspor CSV/PDF;
- mobile-first PWA/browser (tanpa wajib app), Bahasa Indonesia, zona waktu WIB/WITA/WIT;
- FPTP + approval + ranked-choice, maksimum pilihan, abstain, write-in;
- audit log admin append-only (siapa mengubah konfigurasi dan kapan), ballot sealing, snapshot konfigurasi/hash sebelum buka, tally reproducible, dan paket audit unduhan;
- target **WCAG 2.2 AA**, keyboard-only, label screen reader, kontras, dan low-bandwidth mode;
- harga rupiah transparan per eligible voter/election dan tier gratis demo.

**Diferensiasi yang belum konsisten di empat kompetitor:** bukti audit yang mudah dipahami panitia kampus, aksesibilitas formal, harga lokal transparan, WhatsApp/email credential delivery, serta workflow sengketa/recount. Jangan mengklaim “aman”, “anonim”, atau “auditable” tanpa threat model dan artefak verifikasi yang konkret.

# Source ledger

Semua sumber di bawah adalah **resmi/primer**, diakses **2026-07-28**. Tidak ada review pihak ketiga yang dipakai sebagai bukti.

| ID | Platform/topik | Judul halaman | URL langsung | Bukti yang dipakai | Status akses |
|---|---|---|---|---|---|
| S1 | ElectionBuddy fitur/auth/audit/mobile | **Features - ElectionBuddy** | https://electionbuddy.com/features/ | metode voting; perangkat; personal key, 256-bit, password kedua/phone confirmation; anonymous voting; independent verification/recount; audit; SSO | HTTP 200 |
| S2 | ElectionBuddy harga | **Pricing - ElectionBuddy** | https://electionbuddy.com/pricing/ | pay-per-use, pembayaran saat launch, basis eligible voters; metadata halaman menyebut gratis <20 | HTTP 200 |
| S3 | ElectionBuddy keamanan | **Security - ElectionBuddy** | https://electionbuddy.com/security/ | praktik/security culture vendor; digunakan sebagai konteks, bukan sertifikasi | HTTP 200 |
| S4 | Simply Voting alur/auth/integritas | **Online Voting System You Can Trust  Simply Voting** | https://www.simplyvoting.com/ | upload eligible voters, auth method, one-vote gate, tamper-proof ballot, encryption, receipt, results | HTTP 200 |
| S5 | Simply Voting harga | **Pricing - Simply Voting** | https://www.simplyvoting.com/pricing/ | gratis ≤10, kalkulator berdasar eligible voters, self-administered vs managed, fitur tambahan | HTTP 200 |
| S6 | OpaVote profil/security/mobile | **About OpaVote Online Voting** | https://opavote.com/about | mobile, encrypted voting pages, Google servers, privacy email | HTTP 200 |
| S7 | OpaVote harga/fitur/perangkat | **Pricing for OpaVote Online Voting** | https://opavote.com/pricing | tier gratis dan USD10/125 voters atau 20 candidates; metode, perangkat, monitoring, download/API | HTTP 200 |
| S8 | OpaVote auth/anonimitas/workflow | **Elections with OpaVote Online Voting** | https://opavote.com/help/online-elections | email/kode, hanya voter tertentu dan sekali, anonymous setting, reminder, publish results, contest limit | HTTP 200 |
| S9 | Election Runner fitur/auth/mobile/a11y | **Build a Secure Online Election for Free  Election Runner** | https://electionrunner.com/ | Voter ID/Key sekali, SSL 256-bit, mobile/apps, import, result; target Section 508/WCAG 2.0 AA | HTTP 200 |
| S10 | Election Runner harga | **Online Election Pricing  Election Runner** | https://electionrunner.com/pricing | seluruh tier harga, pay-per-election, educational pricing via contact | HTTP 200 |
| S11 | Helios alternatif | **Helios Voting** | https://vote.heliosvoting.org/ | verifiable elections, encrypted ballot/tracker/proof (deskripsi proyek resmi) | Halaman resmi; periksa ulang sebelum procurement |
| S12 | Helios dokumentasi | **Helios Voting Documentation** | https://documentation.heliosvoting.org/ | arsitektur/use dan verifiability | Halaman resmi; periksa ulang sebelum procurement |
| S13 | POLYAS alternatif | **Online Voting** | https://www.polyas.com/online-voting | penawaran online voting resmi | Halaman resmi; periksa ulang detail quote/compliance |
| S14 | POLYAS harga | **Pricing** | https://www.polyas.com/pricing | model harga/permintaan konfigurasi | Halaman resmi; periksa ulang quote terkini |
| S15 | CIVS alternatif | **Condorcet Internet Voting Service** | https://civs1.civs.us/ | layanan voting Condorcet Cornell dan karakter layanan | Halaman resmi; periksa ulang availability/terms |

## Batasan verifikasi

- Halaman ElectionBuddy memuat harga secara dinamis; nominal tier selain klaim gratis <20 tidak dicatat karena tidak terlihat sebagai bukti stabil.
- Kalkulator Simply Voting tidak menampilkan nominal tanpa interaksi/input pada ekstraksi ini; karena itu tidak ada angka yang direka.
- Untuk alternatif, ledger mencatat entry point resmi; sebelum keputusan pembelian wajib recheck status layanan, harga, SLA, data residency, accessibility conformance report, dan terms.
- Klaim enkripsi/secure/tamper-proof di atas adalah klaim vendor. Tanpa audit report/certificate yang ditautkan, klaim tersebut tidak diperlakukan sebagai validasi independen.
- Kurs USD–IDR, pajak, biaya SMS/email/WhatsApp, dan payment processing tidak dihitung.
