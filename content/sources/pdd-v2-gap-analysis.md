# Gap Analysis Penulisan Ulang Product Discovery v2 — One Voting

**Tanggal audit:** 29 Juli 2026  
**Dokumen yang diaudit:** `content/archive/product-discovery-v1-2026-07-28.md`  
**Acuan v2:** `docs/superpowers/specs/2026-07-29-product-discovery-v2-design.md`  
**Tujuan:** menjadi panduan editorial dan substansi untuk menulis PDD v2 yang dapat dipahami stakeholder nonteknis sekaligus cukup tegas untuk product, UI/UX, dan developer.  
**Batas audit:** dokumen ini bukan PDD utama, bukan validasi atas klaim eksternal, dan tidak mengubah keputusan produk yang masih sementara.

---

## 1. Ringkasan Audit

PDD v1 memiliki fondasi discovery yang kuat: masalah inti jelas, cakupan MVP relatif disiplin, risiko keamanan tidak disembunyikan, dan hubungan antara masalah, fitur, serta metrik sudah mulai dibangun. Kekurangan utamanya bukan ketiadaan materi, melainkan arsitektur informasi. Dokumen disusun seperti kumpulan deliverable dan checklist sehingga keputusan penting berulang, detail teknis muncul terlalu dini, dan pembaca harus menggabungkan sendiri keputusan yang tersebar.

Penulisan ulang v2 sebaiknya **menyintesis**, bukan menyalin atau sekadar memendekkan v1. Bagian I harus dapat berdiri sendiri untuk pengambil keputusan. Bagian II–V kemudian memberi bukti, definisi produk, batas teknis, dan rencana validasi secara bertahap. Detail inventaris, pertanyaan wawancara, tabel bukti lengkap, dan kontrol teknis granular sebaiknya dipindahkan ke lampiran atau dokumen sumber.

### Penilaian kesiapan materi v1 terhadap v2

| Area | Status | Temuan utama | Tindakan v2 |
|---|---|---|---|
| Konteks, masalah, beachhead | Kuat | Sudah konsisten dan dapat dipakai | Ringkas menjadi narasi keputusan |
| Pengguna dan stakeholder | Kuat tetapi repetitif | Target user, stakeholder, persona, dan JTBD saling mengulang | Gabungkan tujuan, kebutuhan, dan peran tanpa menghapus perspektif utama |
| Bukti pasar/kompetitor | Cukup, perlu verifikasi ulang | Banyak bergantung pada klaim vendor dan snapshot harga | Perbarui sumber; tampilkan hanya bukti yang mengubah keputusan |
| Keputusan MVP | Kuat tetapi tersebar | Muncul di ringkasan, prioritas, definisi MVP, rekomendasi, dan keputusan akhir | Tetapkan satu sumber kebenaran scope |
| Alur dan acceptance criteria | Cukup kuat | Alur normal jelas; recovery dan edge case belum lengkap | Tambahkan alur alternatif, kegagalan, authority, dan hasil akhir |
| Keamanan dan privasi | Kuat tetapi terlalu teknis untuk alur utama | Threat list dan prinsip arsitektur bercampur | Pisahkan model sederhana, risiko, privasi, arsitektur, transaksi, dan NFR |
| Data model konseptual | Kurang | Hanya tersirat dalam identity store, ballot store, snapshot, event | Tambahkan entitas, relasi yang dilarang, ownership, retention, dan authority |
| Pilot dan roadmap | Parsial | Validation plan ada; rencana pilot dan roadmap belum operasional | Definisikan prasyarat, peran, fallback, urutan dependency, dan gate |
| Konsistensi keputusan | Perlu resolusi | Ada konflik MFA, waktu penguncian, abstain, dan scope komunikasi | Buat decision ledger sebelum menulis narasi final |
| Keterbacaan | Lemah | Campuran Indonesia–Inggris dan jargon tinggi | Gunakan istilah Indonesia, definisi pertama, glosarium singkat |

---

## 2. Repetisi yang Harus Dihilangkan atau Digabung

### 2.1 Lima masalah inti diulang sedikitnya lima kali

Materi yang sama muncul pada Executive Summary, Pain Point Prioritization, Solution Hypothesis, Recommendations, Traceability, dan Keputusan Akhir Sementara:

1. kelayakan pemilih dan suara ganda;
2. integritas konfigurasi/hasil;
3. kerahasiaan identitas–pilihan;
4. audit dan rekonsiliasi;
5. roster, mobile, dan submit yang andal.

**Perbaikan:** tetapkan daftar kanonis sekali di Bagian I §3. Di §13 tampilkan bukti dan prioritasnya. Di §23–26 gunakan ID masalah, misalnya `P-01`, tanpa menjelaskan ulang seluruh narasi. Di §39 cukup nyatakan keputusan akhir dan perubahan dari hipotesis awal.

### 2.2 Lima kontrol/fitur MVP diulang dengan nama berbeda

Roster+token, vote atomik/idempoten, pemisahan identitas–suara, lifecycle+lock, serta hasil+audit berulang pada Executive Summary, MVP Definition, Feature Prioritization, Recommendations, Traceability, dan keputusan akhir.

**Perbaikan:** buat satu tabel scope kanonis pada §21 dengan ID fitur (`M-01` dan seterusnya), alasan, outcome, dependency, dan batas. Bagian lain merujuk ID tersebut. Jangan memiliki dua daftar “fitur MVP terpenting” yang dapat menyimpang.

### 2.3 Batas non-MVP diulang

Blockchain, biometrik, native app, SSO, advanced fraud AI, ranked/weighted/proxy vote, dan white-label berulang pada ringkasan, problem statement, market gap, MVP future, feature prioritization, research plan, serta keputusan akhir.

**Perbaikan:** tampilkan daftar pendek keputusan non-MVP di Bagian I, lalu daftar scope lengkap hanya di §22. Hindari mengulang daftar pada setiap bagian risiko atau rekomendasi.

### 2.4 Proses kertas, form umum, dan platform khusus dijelaskan tiga kali

Penjelasan muncul panjang di Background Project, tabel Current Voting Process, dan Existing Solutions; Google Forms juga kembali dibahas pada competitor matrix.

**Perbaikan:** gunakan §9 untuk proses saat ini dan titik kegagalan; §14 untuk evaluasi alternatif; §15 untuk vendor langsung. Narasi latar belakang cukup satu halaman dan tidak perlu mengulang seluruh perbandingan.

### 2.5 Target pengguna berulang pada empat representasi

Target User, Stakeholder Analysis, Persona, dan JTBD menyampaikan kebutuhan serupa. Empat persona juga memiliki struktur rinci yang tidak semuanya memengaruhi keputusan.

**Perbaikan:** §11 memetakan peran, pengaruh, akses, dan keputusan; §12 memilih dua persona utama (Organizer dan Voter) sebagai narasi, sementara Admin dan Supervisor menjadi proto-persona ringkas atau lampiran. JTBD digabung ke masing-masing persona, bukan tabel terpisah yang mengulang tujuan.

### 2.6 Risiko keamanan berulang pada pain points, assumptions, threat table, risks, dan recommendations

Token sharing, insider access, submit interruption, privacy leakage, dan peak load muncul berkali-kali tanpa hierarchy yang konsisten.

**Perbaikan:** §28 menjadi risk register kanonis dengan ID, owner, residual risk, mitigasi, evidence, dan gate. §13 hanya menjelaskan pain pengguna; §18 hanya asumsi yang belum dibuktikan; §39 hanya menyebut tiga risiko keputusan tertinggi dengan referensi ID.

### 2.7 Metrik dan threshold diulang

Target setup ≥80%, completion ≥95%, waktu vote ≤2 menit, trust ≥80%, dan mismatch=0 muncul di Solution Hypothesis, Success Metrics, Validation Plan, dan keputusan akhir.

**Perbaikan:** §26 menjadi katalog metrik kanonis. §17 dan §34 cukup merujuk kode metrik dan menyatakan metode pengujiannya.

### 2.8 Rencana wawancara terlalu rinci di badan utama

Tiga puluh pertanyaan wawancara memperpanjang Validation Plan dan memutus alur keputusan.

**Perbaikan:** badan §34 memuat tujuan, sampel, metode, indikator, dan keputusan. Seluruh interview guide masuk lampiran.

### 2.9 Kesimpulan muncul dua kali

Recommendations dan Keputusan Akhir Sementara menyampaikan keputusan yang sama.

**Perbaikan:** §39 menjadi satu rekomendasi akhir. Bagian I §7 memberi preview singkat, bukan kesimpulan kedua.

---

## 3. Jargon dan Aturan Penyederhanaan Bahasa

PDD v1 terlalu sering memakai istilah Inggris sebagai bahasa utama. V2 harus menggunakan istilah Indonesia terlebih dahulu, lalu istilah teknis Inggris dalam kurung ketika membantu developer.

| Istilah v1 | Bentuk utama v2 | Definisi pertama yang disarankan |
|---|---|---|
| election | pemilihan | Satu proses pemilihan dari persiapan sampai hasil dan arsip. |
| voter | pemilih | Anggota yang tercantum sebagai pihak yang berhak memilih. |
| organizer | panitia/penyelenggara | Pengguna yang menyiapkan dan menjalankan pemilihan. |
| roster | daftar pemilih | Daftar orang yang berhak menggunakan hak pilih. |
| eligibility | kelayakan/hak memilih | Aturan dan status yang menentukan siapa boleh memilih. |
| entitlement | hak pilih sekali pakai | Catatan bahwa seorang pemilih berhak mengirim tepat satu suara. |
| credential | kredensial akses | Bukti akses, misalnya token, untuk membuka surat suara. |
| ballot | surat suara/data suara | Pilihan yang disimpan tanpa identitas langsung pemilih. |
| secret ballot | pemungutan suara rahasia | Sistem yang mencegah panitia menghubungkan pemilih dengan pilihannya. |
| identity–choice separation | pemisahan identitas dan pilihan | Identitas serta status penggunaan hak pilih disimpan terpisah dari isi suara. |
| lifecycle/state machine | tahapan/status pemilihan | Aturan perubahan status, misalnya draf, terjadwal, dibuka, ditutup, atau dibatalkan. |
| immutable snapshot | salinan konfigurasi terkunci | Versi kandidat, aturan, dan jadwal yang tidak dapat diubah setelah gate tertentu. |
| idempotency | pengiriman ulang yang aman (idempotensi) | Permintaan yang diulang tidak membuat suara kedua atau hasil berbeda. |
| atomic transaction | transaksi atomik | Seluruh langkah penyimpanan suara berhasil bersama-sama atau batal seluruhnya. |
| reconciliation | rekonsiliasi | Pencocokan jumlah hak pilih terpakai dengan jumlah suara yang diterima. |
| append-only audit event | catatan audit hanya-tambah | Catatan tindakan administratif yang tidak dapat diubah melalui fungsi normal aplikasi. |
| RBAC | kontrol akses berbasis peran | Hak akses ditentukan oleh peran pengguna. |
| break-glass | akses darurat terkendali | Akses luar biasa yang terbatas waktu, beralasan, dan selalu diaudit. |
| high-entropy token | token acak yang sulit ditebak | Kode akses acak dengan ruang kemungkinan yang cukup besar. |
| deterministic count | penghitungan deterministik | Data masukan yang sama selalu menghasilkan total yang sama. |
| receipt | bukti pencatatan nonpilihan | Konfirmasi bahwa suara tercatat tanpa menunjukkan kandidat yang dipilih. |
| threat model | model ancaman | Daftar pihak, cara serangan, dampak, kontrol, dan risiko yang tersisa. |
| low-bandwidth | hemat data/koneksi lambat | Pengalaman yang tetap dapat dipakai pada jaringan terbatas. |
| preflight | pemeriksaan sebelum publikasi | Pemeriksaan kelengkapan dan keamanan sebelum pemilihan dijadwalkan/dibuka. |
| beachhead | pasar awal | Segmen pertama yang sengaja dipilih untuk validasi produk. |
| table stakes | kemampuan minimum kategori | Kemampuan dasar yang diharapkan pengguna dari produk sejenis. |
| willingness-to-pay | kesediaan membayar | Batas harga yang sungguh bersedia dibayar calon pembeli. |
| go/no-go | keputusan lanjut/hentikan | Gate berbasis bukti untuk melanjutkan, mengubah, atau menghentikan pekerjaan. |

### Aturan editorial

1. Jangan membuat kalimat dengan lebih dari dua istilah teknis yang belum dijelaskan.
2. Gunakan satu istilah secara konsisten; jangan berganti antara *vote*, ballot, suara, dan pilihan tanpa alasan.
3. Hindari campuran seperti “atomic consume-entitlement + ballot insert”; ubah menjadi perilaku: “sistem menandai hak pilih telah digunakan dan menyimpan suara dalam satu transaksi; bila salah satu gagal, keduanya dibatalkan.”
4. Hindari label abstrak tanpa akibat. “Security domain tinggi” harus dijelaskan sebagai kontrol yang dapat diuji.
5. Singkatan seperti RBAC, MFA, DPA, ASVS, WCAG, SSO, dan WORM harus dieja saat pertama digunakan; glosarium ringkas ditempatkan di lampiran.
6. Pertahankan istilah teknis dalam kurung pada bagian developer agar pencarian dan pemetaan implementasi tetap mudah.
7. Gunakan paragraf pendek dan kalimat aktif. Tabel dipakai untuk perbandingan, matriks, atau traceability; bukan untuk memadatkan semua narasi.

---

## 4. Kontradiksi dan Keputusan yang Harus Diselesaikan

Kontradiksi berikut tidak boleh disamarkan dalam penulisan ulang. Masing-masing perlu keputusan kanonis, rationale, dan dampak terhadap bagian terkait.

| ID | Konflik/ketidakselarasan v1 | Dampak | Resolusi yang diperlukan sebelum/f saat menulis v2 |
|---|---|---|---|
| C-01 | Feature Prioritization menyatakan MFA “post-MVP”, tetapi Security Release Gates menyatakan MFA wajib untuk seluruh peran berprivilege. | Scope dan acceptance gate V1 tidak jelas. | Putuskan MFA sebagai Must V1, kontrol pilot eksternal, atau V1.1. Jangan mempertahankan kedua pernyataan. Rekomendasi audit: bila akun admin mengelola pemilihan nyata, MFA adalah gate pilot dan bagian scope V1. |
| C-02 | MVP menyebut kandidat/aturan/roster tidak dapat diubah “setelah open”, sedangkan flow membuat snapshot saat “publish/schedule”; Solution Hypothesis menyebut lock “after start”. | Developer tidak tahu kapan konfigurasi terkunci dan bagaimana koreksi dilakukan. | Definisikan dua gate: publikasi membuat snapshot/version; pembukaan mengunci konfigurasi operasional. Jelaskan tindakan edit: buat revisi sebelum open, atau batalkan dan buat pemilihan baru setelah open. |
| C-03 | Scope V1 menyebut “abstain jika diaktifkan”, tetapi daftar tipe pemilihan hanya single-choice dan open questions menanyakan apakah abstain wajib dibedakan dari tidak memilih. | Abstain tampak sebagai fitur final padahal policy belum diputuskan. | Jadikan keputusan eksplisit: pilihan “abstain” adalah kandidat khusus V1 atau dikeluarkan sampai validasi. Bedakan selalu abstain (suara sah) dari tidak berpartisipasi. |
| C-04 | V1 menyebut organizer dapat mengekspor/mendistribusikan token, sementara prinsip privacy menuntut token tidak plaintext dan risiko insider diminimalkan. | Ekspor token dapat menjadi titik kebocoran dan impersonasi. | Definisikan distribusi awal, format ekspor, siapa boleh mengakses, apakah token hanya terlihat sekali, perlindungan file, revocation, dan audit. Jika belum aman, batasi pilot pada kanal terkontrol. |
| C-05 | Email “opsional manual” di V1, tetapi V1.1 memuat invitation/reminder/resend dan risiko menyebut email dependency/fallback. | Alur akses end-to-end tidak jelas tanpa kanal distribusi. | Nyatakan V1 menjamin pembuatan token dan distribusi oleh organizer; pengiriman email otomatis bukan V1. Dokumentasikan fallback dan beban operasionalnya. |
| C-06 | Emergency close disebut “auto/manual emergency close”; lifecycle juga memiliki auto-close terjadwal dan manual close normal. | Tiga mekanisme penutupan tercampur. | Bedakan: penutupan terjadwal, penutupan normal lebih awal, dan penghentian darurat karena insiden. Tentukan authority, reason, akibat pada hasil, dan apakah dapat dibuka kembali. |
| C-07 | Permission matrix memberi Org Admin dan Organizer hak yang hampir sama untuk publish, close, roster, result, dan audit, sedangkan narasi menyebut Org Admin menetapkan governance dan Organizer mengoperasikan. | Pemisahan tugas tidak nyata. | Tetapkan apakah approval dua peran diperlukan untuk tindakan kritis. Jika tidak, jelaskan alasan dan risiko. Supervisor harus tetap read-only. |
| C-08 | Supervisor dapat melihat identitas voter “jika policy”, tetapi prinsip privasi dan kebutuhan supervisor menekankan aggregate/read-only evidence. | Akses identitas dapat memperbesar risiko privasi dan bertentangan dengan least privilege. | Default harus tanpa identitas. Jika pengecualian dibutuhkan, definisikan tujuan, approval, field minimum, retention, dan audit. |
| C-09 | Audit log disebut append-only wajib, tetapi hash chaining/HMAC/WORM diletakkan di P1; pada saat yang sama release gate menuntut tamper detection. | Arti “append-only” dan bukti integritas tidak jelas. | Pisahkan proteksi perubahan aplikasi/DB dari deteksi perubahan. Tetapkan kontrol minimum V1 yang benar-benar dapat mendeteksi manipulasi dan bukti yang diuji. |
| C-10 | Secret-ballot separation diklaim melalui separate stores/no direct FK, tetapi transaksi atomik juga mengonsumsi entitlement dan menulis ballot; timestamp/correlation dapat mereidentifikasi. | Klaim kerahasiaan dapat terlalu kuat. | §27 dan §30 harus menjelaskan boundary, metadata yang dihapus/dibucket, akses infrastruktur, risiko korelasi, dan residual risk. Hindari klaim anonimitas absolut. |
| C-11 | Reconciliation didefinisikan `used_entitlements = accepted_ballots`, sementara audit event ditulis dalam transaksi vote namun log tidak boleh mengandung pilihan; belum jelas apakah event per-vote dapat dikorelasikan. | Risiko deanonymization dan definisi mismatch tidak lengkap. | Tentukan event yang dicatat, tingkat agregasi, timestamp precision, serta penanganan pembatalan/invalid ballot. Jangan gunakan event yang menghubungkan identitas ke ballot. |
| C-12 | V1.1 memuat public result page, tetapi permission matrix sudah memiliki Public Viewer dan published result. | Public result tampak sekaligus V1 dan V1.1. | Putuskan V1 hanya ekspor/private report atau juga halaman publik. Samakan permission, user story, scope, dan acceptance criteria. |
| C-13 | Candidate dapat mengusulkan profil pada permission matrix, tetapi fitur Candidate self-service tidak ada pada MVP atau user stories. | Scope UI/API bertambah diam-diam. | Untuk V1, Organizer memasukkan kandidat; candidate proposal/self-service dipindah ke post-MVP kecuali ada bukti kebutuhan. |
| C-14 | Billing muncul pada permission matrix walau billing secara eksplisit ditunda. | Developer dapat menganggap billing dan permission-nya bagian V1. | Hapus dari matriks V1; letakkan pada future permissions di lampiran bila masih diperlukan. |
| C-15 | Scope skala awal 50–1.000 pemilih, pilot 50–200, tetapi performance gate hanya menyebut 100 retry dan load ≥2× expected concurrency tanpa model concurrency. | NFR tidak dapat diuji secara konsisten. | Tetapkan workload pilot dan target produksi terpisah: concurrent voters, burst, latency, timeout, queue, dan recovery. Jangan menyamakan jumlah eligible dengan concurrency. |
| C-16 | Harga/pay-per-election direkomendasikan, tetapi willingness-to-pay belum divalidasi dan billing tidak boleh dibangun. | Rekomendasi bisnis dapat terbaca sebagai keputusan final. | Nyatakan model harga sebagai hipotesis; keputusan final menunggu eksperimen harga dan biaya support. |
| C-17 | North Star mensyaratkan organizer/supervisor “menerima” hasil, tetapi definisi penerimaan, instrumen, dan kondisi supervisor tidak tersedia belum jelas. | Metrik tidak reproducible. | Definisikan event sistem dan pertanyaan attestation/survey; jelaskan bila supervisor tidak ditunjuk. |
| C-18 | “One person one vote” tersirat, tetapi token sharing/coercion diakui tidak terselesaikan dan tidak ada identity proofing kuat. | Klaim dapat melampaui assurance aktual. | Gunakan klaim sempit: “satu hak pilih digital dapat diterima satu kali”; jangan menyatakan sistem membuktikan satu manusia unik tanpa kontrol tambahan. |

### Decision ledger minimum

Sebelum draft final, catat untuk setiap konflik: `ID`, keputusan, status (`sementara/disetujui/perlu validasi`), alasan, owner, tanggal, bagian terdampak, dan bukti yang dapat mengubah keputusan.

---

## 5. Hal yang Harus Dipertahankan

1. **Lima label epistemik** `[FAKTA]`, `[INSIGHT]`, `[ASUMSI]`, `[REKOMENDASI]`, dan `[PERLU VALIDASI]`; definisinya diletakkan di awal dan digunakan konsisten.
2. **Cakupan yang tegas:** pemilihan internal, bukan pemilu pemerintahan.
3. **Beachhead sementara:** organisasi mahasiswa Indonesia, 50–1.000 pemilih, single-choice.
4. **Masalah inti berbasis kepercayaan:** hak memilih, pemakaian sekali, kerahasiaan pilihan, dan bukti proses.
5. **Perbandingan yang adil dengan Google Forms dan kertas:** bukan menyatakan alat tersebut buruk, melainkan tidak memodelkan kebutuhan domain secara lengkap.
6. **Peringatan bukti vendor:** fitur/harga vendor bukan bukti audit independen.
7. **Larangan klaim absolut:** tidak menggunakan “100% aman”, “anti-curang”, atau “mustahil dimanipulasi”.
8. **Pemisahan identitas/status dari isi suara** sebagai prinsip produk, disertai batas dan residual risk.
9. **Transaksi pengiriman suara yang aman saat retry** sebagai kebutuhan correctness, bukan sekadar detail optimasi.
10. **Tahapan pemilihan dan penguncian konfigurasi** agar perubahan dapat ditelusuri.
11. **Hasil disembunyikan selama pemilihan** sebagai default sementara.
12. **Rekonsiliasi tanpa membuka pilihan individual** sebagai bukti proses untuk pengawas.
13. **Mobile-first, koneksi terbatas, dan accessibility** sebagai syarat hak akses praktis, bukan kosmetik.
14. **Minimisasi data dan UU PDP sejak MVP**, termasuk peran pengendali/prosesor yang masih perlu kajian hukum.
15. **Risk disclosure:** coercion, token sharing, malware perangkat, dan kolusi admin tidak dianggap terselesaikan.
16. **Traceability problem → hypothesis → feature → metric**, tetapi gunakan ID dan satu sumber kebenaran.
17. **Kriteria lanjut/ubah/hentikan** dan keputusan untuk tidak langsung membangun penuh sebelum riset primer serta pilot.
18. **Target riset primer dan pilot** sebagai hipotesis operasional, bukan bukti yang sudah terjadi.
19. **Scope discipline:** blockchain, biometrik, native app, SSO kampus, advanced fraud AI, dan white-label bukan MVP.
20. **Open questions yang jujur**, tetapi diprioritaskan berdasarkan keputusan yang diblokir.

---

## 6. Hal yang Harus Disederhanakan

| Materi v1 | Masalah | Bentuk v2 yang disarankan |
|---|---|---|
| Executive Summary empat paragraf teknis | Terlalu cepat masuk idempotency, append-only, dan RBAC | 1–2 halaman: konteks, masalah, siapa, solusi, keputusan MVP, risiko, next step |
| Background Project panjang | Mengulang solusi existing dan kompetitor | Narasi singkat kondisi panitia, biaya proses, dan alasan fokus kampus |
| Problem statement satu kalimat sangat panjang | Sulit dipresentasikan | Satu kalimat utama + empat akibat konkret |
| HMW delapan butir | Berguna saat workshop, kurang penting sebagai bagian terpisah | Serap menjadi prinsip/pertanyaan desain; versi lengkap di lampiran |
| Empat persona lengkap | Detail demografis sebagian bersifat rekaan | Dua proto-persona utama + dua perspektif governance ringkas; semua diberi label asumsi |
| Pain table 18×9 kolom | Sangat padat dan skor tampak presisi | Tampilkan 5–8 pain prioritas; daftar lengkap dan scoring rubric di lampiran |
| Competitor table sembilan kolom | Sulit dibaca, klaim vendor bercampur | Ringkas per keputusan: akses, kerahasiaan, audit, kemudahan, harga; ledger lengkap terpisah |
| Position maps ordinal | Tidak divisualisasikan dan belum berdasarkan teardown | Hapus atau tampilkan sebagai hipotesis kualitatif yang jelas |
| Tiga positioning statement | Mengaburkan pilihan utama | Satu positioning sementara; alternatif untuk tes masuk lampiran |
| Solution hypotheses delapan baris | Target dan threshold berulang | Pilih hipotesis risiko tertinggi; referensi katalog metrik |
| RICE dengan angka presisi | Confidence/effort belum memiliki dasar | Gunakan ranking relatif atau jelaskan input dan owner; jangan memberi kesan kalkulasi objektif |
| User stories berbahasa Inggris | Campuran bahasa dan terlalu generik | Tulis Indonesia; kelompokkan per alur; sambungkan ID fitur dan acceptance criteria |
| Given/When/Then campuran | Baik untuk developer, tetapi kurang edge case | Pertahankan format, terjemahkan, tambahkan failure/recovery penting |
| Mermaid satu flow besar | Padat | Satu diagram stakeholder-friendly dan satu sequence/transaction diagram teknis bila perlu |
| Permission matrix 16×7 | Memuat future scope dan ambiguity | Matriks V1 saja; tindakan kritis memiliki approval dan audit requirement |
| Threat table generik web | OWASP risks bercampur dengan risiko produk | Kelompokkan account, election integrity, privacy, availability, insider; detail kontrol di sumber keamanan |
| Architecture principles bullet padat | Banyak keputusan implementasi tanpa model | Diagram konseptual + penjelasan boundary, authority, failure, recovery, residual risk |
| Business model enam opsi | Terlalu luas untuk discovery saat ini | Satu hipotesis monetisasi, alternatif ringkas, eksperimen harga |
| 30 pertanyaan interview | Mengganggu alur | Pindah ke lampiran |
| Dua bagian kesimpulan | Duplikasi | Satu §39 rekomendasi akhir |

---

## 7. Hal yang Harus Dipindahkan ke Lampiran atau Dokumen Pendukung

### Lampiran PDD v2

1. Glosarium istilah dan singkatan.
2. Daftar lengkap 18 pain point serta metode/skala scoring.
3. Interview guide organizer dan voter (30 pertanyaan).
4. Proto-persona lengkap bila masih dibutuhkan untuk workshop.
5. Tabel kompetitor rinci dan snapshot harga bertanggal.
6. Feature matrix lengkap dengan legenda status bukti.
7. Daftar sumber lengkap, evidence notes, dan tanggal akses.
8. Daftar open questions lengkap beserta owner dan keputusan yang diblokir.
9. Traceability matrix rinci dengan stable ID.
10. Changelog keputusan v1 → v2 dan decision ledger kontradiksi.
11. Glosarium status lifecycle dan diagram transisinya.
12. Daftar acceptance criteria granular bila badan §24 terlalu panjang.

### Dokumen pendukung terpisah

1. **Security/privacy research:** threat catalog detail, OWASP ASVS mapping, logging controls, DPA/legal analysis, dan source excerpts.
2. **Competitor research:** seluruh klaim per vendor, URL, access date, status verifikasi, serta teardown notes.
3. **Research plan:** sampling, recruitment, scripts, consent, analysis method, dan artifact protocol.
4. **PRD/technical specification berikutnya:** endpoint, schema fisik, isolation level, key length, exact API errors, infrastructure provider, deployment topology, dan stack final.
5. **Runbook pilot/incident:** escalation, fallback, communication, extension/cancellation, backup/restore, evidence preservation.
6. **Architecture Decision Records:** keputusan stack, database separation, audit integrity mechanism, token delivery, dan hosting region.

### Jangan dipindahkan dari badan utama

Keputusan scope, batas klaim, prinsip kerahasiaan, risiko terbesar, permission V1, alur end-to-end, acceptance gate, metrik keberhasilan, dan kriteria lanjut/hentikan harus tetap dapat ditemukan tanpa membuka lampiran.

---

## 8. Gap Substansi yang Belum Cukup di v1

1. **Prinsip produk belum diformalkan.** Turunkan 5–7 prinsip, misalnya rahasia secara default, perubahan dapat ditelusuri, hasil tidak tampil sebelum tutup, recovery tidak boleh menggandakan suara, dan akses minimum.
2. **Data model konseptual belum utuh.** Perlu entitas Organization, Membership/Role, Election, Election Version/Snapshot, Candidate, Voter Eligibility, Credential, Cast Authorization, Ballot, Audit Event, Result/Report, serta relasi yang sengaja dilarang.
3. **Authority/source of truth belum tegas.** Untuk setiap stateful system, jelaskan komponen yang berwenang mengubah status dan siapa yang hanya membaca.
4. **Failure dan recovery belum lengkap.** Bahas kegagalan setelah autentikasi tetapi sebelum cast, timeout dengan status tidak diketahui, database failure, close bersamaan dengan cast, import parsial, token reissue, count mismatch, dan hasil terpublikasi salah.
5. **Rencana pilot belum operasional.** Perlu tujuan, election risk tier, peserta, owner, consent/privacy, support desk, freeze window, rollback/fallback, incident severity, komunikasi, exit criteria, serta post-pilot review.
6. **Roadmap belum berbasis dependency.** Urutan minimum: keputusan scope → threat/data model → lifecycle → roster/credential → cast transaction → reconciliation/report → permission/audit → accessibility/load/security gates → pilot.
7. **NFR belum terstruktur.** Perlu availability window, latency, concurrency, durability, backup/restore objective, observability, browser/device support, accessibility, localization/timezone, retention/deletion, dan security verification.
8. **Acceptance criteria belum mencakup abuse cases.** Tambahkan unauthorized object access, token enumeration, replay, payload mismatch, race saat close, role escalation, audit tampering, dan privacy leakage.
9. **Keputusan perubahan/cancellation belum jelas.** Kandidat mundur, roster salah setelah publish, perubahan jadwal, extension, cancel/restart, dan dampak terhadap suara yang sudah masuk perlu policy.
10. **Model assurance akses belum berjenjang.** Token saja tidak cukup untuk semua risiko; definisikan risk tier pemilihan dan kapan secondary attribute/MFA/SSO diperlukan.
11. **Governance dan separation of duties belum tegas.** Siapa menyetujui roster, membuka, menghentikan, membatalkan, dan mempublikasikan hasil harus jelas.
12. **Definisi auditability belum dapat diuji.** Tentukan event minimum, integritas, eksportabilitas, viewer, retention, dan cara mendeteksi perubahan.
13. **Data retention belum menjadi lifecycle.** Proposal 30–90 hari perlu trigger, legal hold/sengketa, deletion evidence, backup expiry, dan tenant policy.
14. **Kriteria “trusted election” belum operasional.** Harus menggabungkan indikator sistem, incident status, report, dan attestation yang terukur.
15. **Klaim diferensiasi lokal belum tervalidasi.** Bahasa Indonesia, harga IDR, CSV NIM, dan workflow sederhana masih hipotesis; jangan ditulis sebagai keunggulan terbukti.
16. **Business viability masih tipis.** Belum ada support cost, acquisition channel, repeat frequency, buyer authority, procurement constraints, atau price sensitivity evidence.
17. **Accessibility belum diterjemahkan menjadi acceptance per layar kritis.** WCAG 2.2 AA perlu journey dan bukti uji, bukan sekadar target umum.
18. **Source freshness dan claim ledger perlu diperbarui.** V2 mensyaratkan verifikasi terkini dan pengaruh setiap klaim terhadap keputusan.

---

## 9. Checklist Penulisan Ulang — 40 Bagian

Status awal menggunakan tiga kategori: **Siap disintesis**, **Parsial**, atau **Gap utama**. Checklist selesai hanya bila narasi mudah dipahami, keputusan eksplisit, ketidakpastian diberi label, dan detail implementasi tidak melampaui bukti.

### Bagian I — Ringkasan Pengambil Keputusan

- [ ] **1. Tentang One Voting — Parsial.** Jelaskan produk, konteks pemilihan internal, audience, status discovery, dan batas “bukan pemilu pemerintahan” dalam maksimal satu halaman. Jangan membuka dengan daftar kontrol teknis.
- [ ] **2. Mengapa Produk Ini Dibutuhkan — Siap disintesis.** Gabungkan latar kertas/form, beban panitia, dan kebutuhan bukti. Gunakan satu contoh alur; hindari mengulang competitor analysis.
- [ ] **3. Masalah yang Dipilih — Siap disintesis.** Tetapkan 4–5 masalah kanonis dengan stable ID, dampak, dan status bukti. Hindari skor seolah data populasi.
- [ ] **4. Pengguna dan Pasar Awal — Siap disintesis.** Nyatakan Organizer, Voter, buyer, supervisor, beachhead 50–1.000, serta alasan dan batas generalisasi.
- [ ] **5. Solusi yang Diusulkan — Siap disintesis.** Jelaskan pengalaman end-to-end dan lima kontrol inti dalam bahasa perilaku, bukan istilah database.
- [ ] **6. Keputusan MVP — Parsial.** Buat satu daftar scope kanonis dan selesaikan C-01 sampai C-14 yang memengaruhi V1. Bedakan keputusan, hipotesis, dan non-MVP.
- [ ] **7. Risiko dan Langkah Berikutnya — Siap disintesis.** Tampilkan tiga risiko residual, alasan belum full build, dan urutan validation→prototype→vertical slice→pilot. Jangan menduplikasi §39.

### Bagian II — Product Discovery

- [ ] **8. Metode dan Batas Riset — Siap disintesis.** Jelaskan desk research, standar bukti, keterbatasan, belum adanya wawancara/analytics, dan kebutuhan verifikasi ulang. Perbaiki tautan research plan lama yang salah nama.
- [ ] **9. Proses Voting Saat Ini — Siap disintesis.** Tampilkan journey kertas/form/platform dan titik kegagalan per tahap. Satu tabel ringkas cukup.
- [ ] **10. Problem Statement — Siap disintesis.** Pecah kalimat utama v1 menjadi pernyataan singkat, penyebab, dan dampak. Pertahankan out-of-scope assurance.
- [ ] **11. Target User dan Stakeholder — Siap disintesis.** Gabungkan target-user dan stakeholder map; jelaskan user, buyer, operator, pengawas, dan pihak legal/IT tanpa mengulang persona.
- [ ] **12. Persona dan Jobs to Be Done — Parsial.** Pertahankan Organizer dan Voter sebagai proto-persona asumsi; ringkas Admin/Supervisor. Hilangkan kutipan rekaan atau tandai jelas sebagai skenario hipotetis, bukan hasil wawancara.
- [ ] **13. Pain Points dan Prioritas — Siap disintesis.** Sajikan prioritas dan rationale; pindahkan 18-row inventory ke lampiran. Hubungkan stable ID ke §3.
- [ ] **14. Existing Solutions — Siap disintesis.** Bandingkan kertas, form umum, DIY, dan platform khusus berdasarkan pekerjaan pengguna; jangan membuat klaim fitur tanpa sumber.
- [ ] **15. Competitor Analysis — Parsial.** Verifikasi ulang empat vendor, fitur, harga, legal entity, dan tanggal akses. Pisahkan klaim vendor dari bukti independen; pindahkan matriks penuh ke lampiran.
- [ ] **16. Market Gap dan Positioning — Parsial.** Nyatakan diferensiasi sebagai hipotesis yang diuji. Pilih satu positioning utama; hapus position map yang tidak memiliki metode/visual memadai.
- [ ] **17. Solution Hypothesis — Siap disintesis.** Prioritaskan hipotesis paling berisiko; setiap hipotesis memiliki perilaku, metrik ID, eksperimen, threshold, dan keputusan accept/reject.
- [ ] **18. Assumption Mapping — Siap disintesis.** Pertahankan desirability/feasibility/viability/security/legal; tambah owner, due point, dan keputusan yang diblokir. Hindari mengulang risk register.

### Bagian III — Definisi Produk

- [ ] **19. Prinsip Produk — Gap utama.** Rumuskan 5–7 prinsip yang mengarahkan trade-off, termasuk secrecy, correctness, traceability, least privilege, mobile/accessibility, dan honest assurance.
- [ ] **20. Alur Election End-to-End — Parsial.** Pertahankan normal flow, tambahkan aktor, alternative/error/recovery, serta batas antara distribusi token, entitlement, cast, close, count, dan publish. Diagram harus valid dan tidak terlalu padat.
- [ ] **21. Scope MVP V1 — Parsial.** Jadikan sumber kebenaran tunggal dengan stable feature ID, outcome, dependency, acceptance summary, dan exclusion. Selesaikan MFA, public result, abstain, candidate self-service, serta token distribution.
- [ ] **22. Post-MVP dan Future Scope — Siap disintesis.** Pisahkan V1.1 dari Future; jelaskan trigger promosi scope, bukan daftar keinginan. Pastikan tidak ada item yang diam-diam masih muncul di permission/NFR V1.
- [ ] **23. Feature Prioritization — Parsial.** Tampilkan Must/Should/Could/Won’t dan alasan. Gunakan RICE hanya bila input dapat dijelaskan; jika tidak, gunakan ranking relatif tanpa presisi semu.
- [ ] **24. User Stories dan Acceptance Criteria — Parsial.** Tulis dalam Bahasa Indonesia, beri ID, petakan ke fitur dan masalah, serta tambahkan negative/abuse/recovery cases. Detail lengkap boleh di lampiran tetapi Must harus dapat ditemukan.
- [ ] **25. Role dan Permission — Parsial.** Matriks hanya scope V1; selesaikan separation of duties, supervisor identity access, super-admin break-glass, dan approval tindakan kritis. Hapus billing serta candidate self-service bila bukan V1.
- [ ] **26. Success Metrics — Parsial.** Definisikan Completed Trusted Elections secara operasional; bedakan product, UX, operational, security, trust, dan business metrics. Setiap metric punya formula, source, window, target asumsi, dan owner.

### Bagian IV — Keamanan dan Teknis

- [ ] **27. Model Kerahasiaan Suara — Parsial.** Jelaskan apa yang dilindungi, terhadap siapa, data yang dipisah, metadata leakage, pihak infrastruktur, dan residual risk. Jangan menyamakan no direct FK dengan anonimitas absolut.
- [ ] **28. Risiko Keamanan dan Mitigasi — Siap disintesis.** Buat risk register kanonis dengan likelihood, impact, owner, control, evidence, residual risk, dan release gate. Konsolidasikan threat dan product risk yang berulang.
- [ ] **29. Privasi dan UU PDP — Parsial.** Pertahankan minimisasi, notice, retention, breach notice, serta controller/processor hypothesis. Verifikasi sumber hukum; tambahkan purpose, data subject rights, deletion, legal hold, subprocessor, dan owner legal review.
- [ ] **30. Arsitektur Teknis yang Direkomendasikan — Parsial.** Gunakan diagram konseptual dan authority boundary. Bedakan rekomendasi product-level dari keputusan stack yang membutuhkan ADR; jelaskan failure/recovery dan audit boundary.
- [ ] **31. Data Model Konseptual — Gap utama.** Definisikan entitas, stable ID, cardinality, state ownership, data sensitif, relasi terlarang, retention, dan separation boundary. Jangan menetapkan schema fisik dalam PDD.
- [ ] **32. Transaksi Vote dan Idempotency — Parsial.** Jelaskan sequence success/retry/failure, idempotency-key semantics, payload mismatch, concurrency, close race, unique constraints, serta status recovery. Sinkronkan dengan secrecy dan audit model.
- [ ] **33. Non-Functional Requirements — Gap utama.** Tetapkan availability, performance/concurrency, durability, RPO/RTO, observability, accessibility, device/browser, localization/timezone, security verification, retention, dan supportability; pisahkan target pilot dari target skala 1.000.

### Bagian V — Validasi dan Eksekusi

- [ ] **34. Validation Plan — Siap disintesis.** Pertahankan fase dan sampel sebagai asumsi; tambahkan recruitment, evidence capture, owner, timeline relatif, dan decision link. Interview script pindah ke lampiran.
- [ ] **35. Rencana Pilot — Gap utama.** Definisikan low-stakes eligibility, 50–200 peserta, prasyarat security/accessibility/load, freeze, fallback, incident desk, data handling, communication, observation, stop conditions, dan retrospective.
- [ ] **36. Roadmap Development — Parsial.** Ubah tujuh langkah v1 menjadi dependency gates; bedakan prototype, vertical slice, pilot-ready, dan post-pilot. Jangan memasukkan stack final atau estimasi palsu.
- [ ] **37. Go/No-Go Criteria — Parsial.** Konsolidasikan lanjut/ubah/hentikan dengan threshold metrik, critical findings, reconciliation, user value, legal gate, dan owner keputusan. Jelaskan hasil “pause” dan tindakan berikutnya.
- [ ] **38. Open Questions — Siap disintesis.** Prioritaskan pertanyaan menurut keputusan yang diblokir; beri owner, deadline/gate, metode menjawab, dan default sementara. Daftar panjang masuk lampiran.
- [ ] **39. Rekomendasi Akhir — Siap disintesis.** Satu keputusan yang jelas: validasi dan prototype sebelum full build; sebut rationale, scope, syarat berubah, dan next accountable action. Jangan mengulang semua daftar sebelumnya.
- [ ] **40. Referensi dan Lampiran — Parsial.** Perbarui source ledger dengan URL langsung, tanggal akses, status, jenis bukti, klaim yang dipakai, dan pengaruh keputusan. Sertakan glosarium, interview guide, full matrices, decision ledger, traceability, dan changelog v1→v2.

---

## 10. Checklist Lintas Bagian dan Definition of Done Editorial

- [ ] Tepat 40 bagian utama sesuai spec dan seluruhnya muncul dalam daftar isi.
- [ ] Bagian I dapat menjelaskan keputusan MVP tanpa membaca bagian teknis atau lampiran.
- [ ] Target panjang berada pada 12.000–18.000 kata sebagai koridor praktis 30–45 halaman; kepadatan tabel tetap diperiksa saat ekspor.
- [ ] Setiap keputusan penting memiliki satu lokasi kanonis; bagian lain merujuk ID, bukan menyalin ulang.
- [ ] Semua konflik C-01–C-18 diputuskan atau diberi status `[PERLU VALIDASI]` dengan default sementara.
- [ ] Semua istilah pada tabel jargon dijelaskan saat kemunculan pertama dan digunakan konsisten.
- [ ] Tidak ada persona, kutipan, hasil interview, statistik, atau capability vendor yang direka.
- [ ] Fakta vendor ditandai sebagai klaim vendor jika belum didukung bukti independen.
- [ ] Semua target numerik yang belum berasal dari data nyata diberi label `[ASUMSI]`.
- [ ] Setiap fitur Must memiliki stable ID dan jalur `masalah → hipotesis → fitur → risiko → acceptance criteria → metrik`.
- [ ] Scope V1, V1.1, dan Future konsisten di ringkasan, scope, stories, permission, arsitektur, roadmap, serta metrik.
- [ ] Semua stateful system menyebut source of truth/authority, failure path, dan recovery path.
- [ ] Model kerahasiaan menyebut batas perlindungan serta residual risk; tidak ada klaim anonimitas atau keamanan absolut.
- [ ] Tindakan kritis memiliki role, approval bila perlu, reason, audit event, dan rollback/cancel behavior.
- [ ] Data sensitif memiliki purpose, viewer, retention, deletion trigger, dan batas export/logging.
- [ ] Acceptance criteria mencakup happy path, retry, unauthorized access, concurrency, interruption, close race, mismatch, dan recovery.
- [ ] NFR membedakan target pilot dari target skala produk awal.
- [ ] Rencana pilot memiliki prasyarat, owner, stop condition, fallback, incident response, serta bukti pascapilot.
- [ ] Referensi penting diverifikasi ulang dan mencantumkan tanggal akses.
- [ ] Tabel dipakai hanya jika membantu perbandingan/keterlacakan; paragraf utama tetap dapat dipresentasikan.
- [ ] Seluruh diagram Mermaid valid dan memiliki penjelasan teks untuk pembaca/accessibility.
- [ ] Tidak ada placeholder, tautan lokal rusak, atau nama file lama yang tidak tersedia.
- [ ] PDD tetap berhenti pada product/architecture recommendation; schema fisik, endpoint, stack, dan runbook detail dipindah ke PRD/ADR/dokumen pendukung.

---

## 11. Urutan Kerja Penulisan Ulang yang Disarankan

1. Bekukan v1 sebagai sumber arsip dan buat decision ledger C-01–C-18.
2. Verifikasi ulang sumber yang benar-benar memengaruhi keputusan: form umum, kompetitor, UU PDP, keamanan, accessibility, dan e-voting.
3. Tetapkan taksonomi stable ID untuk masalah, asumsi, fitur, risiko, story, acceptance criteria, dan metrik.
4. Tulis Bagian I terlebih dahulu dan uji apakah stakeholder dapat menjelaskan masalah, pengguna, MVP, risiko, dan next step tanpa bantuan.
5. Tulis Bagian II sebagai bukti dan reasoning, bukan pengulangan Bagian I.
6. Kunci scope V1/V1.1/Future sebelum menulis stories, permission, serta arsitektur.
7. Tulis Bagian III dengan satu scope kanonis dan traceability.
8. Tulis Bagian IV mulai dari model kerahasiaan dan data konseptual, baru transaksi serta NFR.
9. Tulis Bagian V berbasis dependency gate dan bukti keputusan.
10. Pindahkan inventaris/detail ke lampiran, lalu lakukan audit repetisi, jargon, kontradiksi, sumber, dan panjang.

## 12. Kesimpulan

PDD v1 tidak perlu diganti karena substansinya lemah; ia perlu ditulis ulang karena substansi yang baik tertutup oleh repetisi, jargon, dan pencampuran audience. V2 harus mempertahankan disiplin bukti, scope sempit, honest security claims, dan traceability, sambil menjadikan keputusan produk sebagai tulang punggung narasi. Risiko terbesar dalam rewrite adalah merapikan bahasa tanpa menyelesaikan konflik scope. Karena itu, penyelesaian decision ledger—terutama MFA, waktu lock, distribusi token, public results, abstain, permission, dan audit integrity—merupakan prasyarat kualitas, bukan pekerjaan editorial tambahan.
