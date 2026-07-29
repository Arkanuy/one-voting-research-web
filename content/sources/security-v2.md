# Verifikasi sumber keamanan, privasi, aksesibilitas, dan e-voting — PDD One Voting

**Tanggal akses seluruh URL:** 2026-07-29  
**Konteks keputusan:** One Voting adalah produk pemungutan suara organisasi/komunitas, **bukan** sistem pemilu nasional. Catatan ini adalah telaah produk, bukan pendapat hukum, audit keamanan, sertifikasi WCAG, atau bukti bahwa sistem aman secara absolut.

## Ringkasan keputusan MVP

1. Perlakukan setiap pemungutan suara sebagai aksi berintegritas tinggi: autentikasi ulang sebelum mengirim suara, sesi pendek, rate limit, perlindungan CSRF, dan pencatatan kejadian keamanan.
2. Pisahkan identitas/kelayakan pemilih dari pilihan suara dalam model data dan akses operator. Hindari log, analitik, dan ekspor yang dapat menghubungkan keduanya.
3. Terapkan minimisasi data, tujuan dan dasar pemrosesan yang terdokumentasi, retensi/penghapusan, pemenuhan hak subjek data, serta prosedur insiden sejak MVP.
4. Targetkan **WCAG 2.2 Level AA** untuk alur inti dan lakukan uji manual keyboard, screen reader, zoom/reflow, kontras, serta error handling; hasil automated scanner saja tidak cukup.
5. Untuk MVP, jangan menjanjikan *end-to-end verifiability*, anonimitas kriptografis, atau kesetaraan dengan sistem pemilu tersertifikasi. Jika voting berisiko tinggi/rahasia menjadi target, lakukan threat model dan review kriptografi independen sebelum peluncuran.

---

## Ledger sumber dan implikasi

### S-01 — OWASP Application Security Verification Standard (ASVS) 5.0.0

- **Sumber langsung:** https://owasp.org/www-project-application-security-verification-standard/
- **Status akses:** berhasil; halaman proyek menyatakan versi stabil terbaru 5.0.0.
- **Temuan:** ASVS memberi basis persyaratan dan pengujian kontrol teknis aplikasi web. Identifikasi persyaratan perlu menyertakan versi (`v5.0.0-…`) agar tidak ambigu ketika nomor kontrol berubah.
- **Batas bukti:** ASVS adalah standar verifikasi generik aplikasi web, bukan profil khusus e-voting dan bukan sertifikasi otomatis. Adopsi checklist tidak membuktikan implementasi atau efektivitas kontrol.
- **Pengaruh pada MVP:** gunakan ASVS 5.0.0 sebagai *security acceptance checklist*, dengan cakupan eksplisit untuk autentikasi, sesi, otorisasi, validasi input, kriptografi, proteksi data, logging, konfigurasi, dan API. Simpan bukti uji per kontrol; jangan menulis klaim “ASVS compliant” sebelum asesmen terukur.

### S-02 — OWASP Authentication Cheat Sheet

- **Sumber langsung:** https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- **Status akses:** berhasil (HTTP 200).
- **Temuan:** panduan menekankan autentikasi ulang untuk aksi sensitif, pesan kegagalan generik untuk mengurangi enumerasi akun, pertahanan otomatisasi/rate limiting, dan MFA sesuai risiko.
- **Batas bukti:** *cheat sheet* adalah panduan implementasi, bukan hasil pengujian One Voting; pilihan faktor autentikasi tetap memerlukan analisis risiko, biaya, dan aksesibilitas.
- **Pengaruh pada MVP:** autentikasi ulang sebelum submit suara/aksi admin; rate limit dan monitoring login; respons login/recovery tidak membocorkan keberadaan akun; tawarkan MFA untuk admin dan pertimbangkan faktor tahan-phishing untuk operasi berisiko tinggi.

### S-03 — OWASP Session Management Cheat Sheet

- **Sumber langsung:** https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- **Status akses:** berhasil (HTTP 200).
- **Temuan:** ID sesi harus acak/tidak bermakna, seluruh sesi dilindungi TLS, cookie menggunakan atribut pengamanan yang sesuai, sesi diregenerasi setelah perubahan privilege, dan memiliki batas waktu serta terminasi server-side.
- **Batas bukti:** rekomendasi generik; nilai timeout dan desain cookie harus divalidasi terhadap arsitektur dan kebutuhan pengguna One Voting.
- **Pengaruh pada MVP:** gunakan cookie `Secure`, `HttpOnly`, dan `SameSite` yang sesuai; rotasi sesi setelah login/perubahan privilege; idle/absolute timeout; logout dan pencabutan sesi server-side; jangan menyimpan token sesi di URL atau log.

### S-04 — NIST SP 800-63B-4, Digital Identity Guidelines: Authentication and Authenticator Management

- **Sumber langsung:** https://pages.nist.gov/800-63-4/sp800-63b.html
- **Status akses:** berhasil; dokumen final SP 800-63B-4.
- **Temuan:** dokumen mendefinisikan Authentication Assurance Levels (AAL). AAL1 mengizinkan satu faktor tetapi menyarankan opsi MFA; AAL2 memerlukan dua faktor berbeda dan harus menawarkan opsi autentikasi tahan phishing; AAL3 mensyaratkan autentikator tahan phishing berbasis kunci publik. Dokumen juga mencakup password, rate limiting, recovery, reauthentication, sesi, privasi, dan pengalaman pengguna.
- **Batas bukti:** NIST ditujukan terutama bagi sistem identitas digital pemerintah AS dan bukan kewajiban hukum Indonesia. Penetapan AAL tidak otomatis menjamin integritas, kerahasiaan ballot, atau kelayakan pemilih.
- **Pengaruh pada MVP:** lakukan penilaian risiko per peran, bukan mengklaim AAL tanpa evaluasi lengkap. Baseline: password yang ramah password-manager, pemeriksaan terhadap password terkompromi, throttling, recovery yang tidak lebih lemah dari login, dan autentikasi ulang. Admin/penyelenggara wajib MFA; pilih WebAuthn/passkey bila layak dan sediakan jalur pemulihan yang aman serta inklusif.

### S-05 — NIST Privacy Framework

- **Sumber langsung:** https://www.nist.gov/privacy-framework
- **Status akses:** berhasil.
- **Temuan:** Privacy Framework adalah alat sukarela untuk mengidentifikasi dan mengelola risiko privasi melalui manajemen risiko organisasi, bukan sekadar kontrol keamanan.
- **Batas bukti:** bersifat sukarela, lintas yurisdiksi, dan tidak menggantikan UU PDP ataupun analisis hukum Indonesia. Halaman pada tanggal akses juga menampilkan Privacy Framework 1.1 sebagai *Initial Public Draft*, sehingga materi draf tidak boleh diperlakukan sebagai final.
- **Pengaruh pada MVP:** buat inventaris aliran data dan *privacy risk register*: data apa, tujuan, pihak yang mengakses, retensi, penghapusan, dan dampak bila identitas terhubung ke pilihan. Gunakan sebagai metode tata kelola tambahan, sementara persyaratan hukum tetap diturunkan dari UU PDP.

### S-06 — WCAG 2.2, W3C Recommendation

- **Sumber langsung:** https://www.w3.org/TR/WCAG22/
- **Versi permanen yang diverifikasi:** https://www.w3.org/TR/2024/REC-WCAG22-20241212/
- **Status akses:** berhasil; W3C Recommendation 12 Desember 2024.
- **Temuan:** kriteria keberhasilan bersifat dapat diuji dan tidak bergantung teknologi. WCAG 2.2 menambah kebutuhan yang relevan bagi voting, antara lain Focus Not Obscured, Focus Appearance (AAA), Dragging Movements, Target Size (Minimum), Consistent Help, Redundant Entry, dan Accessible Authentication. Konformitas harus memenuhi seluruh kriteria pada level yang diklaim untuk halaman/proses lengkap.
- **Batas bukti:** WCAG tidak mencakup semua kebutuhan setiap penyandang disabilitas. Lulus alat otomatis tidak sama dengan konformitas; evaluasi manusia dan teknologi bantu tetap diperlukan. WCAG juga bukan bukti keamanan.
- **Pengaruh pada MVP:** target internal Level AA untuk alur registrasi/login, undangan, membaca kandidat/opsi, memilih, meninjau, submit, konfirmasi, dan pemulihan. Pastikan semua fungsi via keyboard; fokus terlihat/tidak tertutup; target sentuh minimum 24×24 CSS px atau memenuhi pengecualian; tidak mewajibkan tes kognitif/transkripsi password; error teridentifikasi dan dapat diperbaiki; status submit diumumkan ke screen reader; review manual dengan NVDA/VoiceOver, zoom 200–400%, reflow, dan contrast check.

### S-07 — UU Republik Indonesia No. 27 Tahun 2022 tentang Pelindungan Data Pribadi

- **Halaman resmi/metadata dan naskah:** https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022
- **Status akses:** berhasil; metadata BPK menyatakan berlaku sejak 17 Oktober 2022 dan menyediakan naskah PDF. Halaman juga mencatat Putusan MK No. 151/PUU-XXII/2024 terkait Pasal 53 ayat (1) huruf b.
- **Temuan terverifikasi:** UU mengatur jenis data pribadi, hak subjek, dasar dan proses pemrosesan, kewajiban pengendali/prosesor, transfer, sanksi, dan insiden. Implikasi produk yang relevan meliputi: pemrosesan harus memiliki dasar yang sah; tujuan dan informasi pemrosesan harus jelas; data harus terbatas/relevan; keamanan dan akuntabilitas wajib dijaga; subjek memiliki hak atas informasi, akses, koreksi, penghapusan/pemusnahan dan hak lain sesuai syarat UU; kegagalan pelindungan data memicu kewajiban pemberitahuan tertulis paling lambat 3×24 jam kepada subjek dan lembaga; pemrosesan skala besar atau pemantauan sistematis dapat memicu kewajiban petugas/fungsi PDP; pemrosesan berisiko tinggi memerlukan penilaian dampak.
- **Batas bukti:** penerapan pasal bergantung pada peran faktual One Voting (pengendali/prosesor), dasar pemrosesan, kategori/skala data, kontrak dengan penyelenggara, lokasi infrastruktur, dan aturan pelaksana yang berlaku. “Persetujuan” bukan satu-satunya dasar hukum dan tidak boleh dipilih secara otomatis. Catatan ini bukan opini hukum; status putusan dan regulasi turunan perlu ditinjau penasihat hukum sebelum produksi.
- **Pengaruh pada MVP:** tetapkan peran pengendali/prosesor dalam kontrak; dokumentasikan dasar, tujuan, kategori, penerima, retensi, dan mekanisme hak subjek; minimalkan profil pemilih; pisahkan tabel kelayakan/identitas dari ballot; enkripsi transit dan at-rest; batasi akses berbasis peran; audit akses tanpa mencatat isi suara; tetapkan jadwal penghapusan; siapkan kanal permintaan hak, *data processing agreement*, register vendor/transfer, DPIA untuk voting sensitif/skala besar, dan *incident playbook* yang mampu memenuhi jendela 3×24 jam bila kewajiban berlaku.

### S-08 — *Securing the Vote: Protecting American Democracy* (National Academies, 2018)

- **Sumber langsung/DOI:** https://doi.org/10.17226/25120
- **Pembacaan daring:** https://www.nationalacademies.org/read/25120/chapter/1
- **Status akses:** berhasil (DOI HTTP 200); laporan konsensus akademik, DOI 10.17226/25120.
- **Temuan:** sistem voting terhubung internet menghadapi risiko serangan pada kerahasiaan, ketersediaan, dan integritas; laporan mendorong hasil yang dapat diaudit dan bukti independen dari perangkat lunak, termasuk paper ballots dan risk-limiting audits dalam konteks pemilu publik.
- **Batas bukti:** fokusnya pemilu Amerika Serikat, bukan voting organisasi dan bukan validasi produk One Voting. Rekomendasi paper ballot/RLA tidak dapat dipindahkan secara mekanis ke MVP SaaS.
- **Pengaruh pada MVP:** jangan memasarkan MVP sebagai pengganti pemilu publik. Untuk keputusan konsekuensi tinggi, sediakan prosedur alternatif/rekonsiliasi independen dan ekspor audit yang tidak membuka hubungan pemilih–pilihan. Dokumentasikan bahwa audit log aplikasi saja tetap bergantung pada sistem yang diaudit.

### S-09 — Ben Adida, “Helios: Web-based Open-Audit Voting” (USENIX Security 2008)

- **PDF langsung:** https://www.usenix.org/legacy/event/sec08/tech/full_papers/adida/adida.pdf
- **Halaman prosiding:** https://www.usenix.org/legacy/event/sec08/tech/
- **Status akses:** PDF berhasil diakses; paper konferensi akademik.
- **Temuan:** Helios menunjukkan pola *end-to-end verifiable/open-audit voting*: ballot terenkripsi dapat dilacak pemilih, tally dapat diverifikasi publik, dan privasi pilihan dipisahkan dari autentikasi melalui teknik kriptografi.
- **Batas bukti:** paper/prototipe tidak membuktikan bahwa setiap implementasi web voting aman; verifiability tidak menghapus risiko endpoint terkompromi, coercion/vote-selling, denial of service, kesalahan operasional, atau kelemahan autentikasi. Kriptografi khusus berisiko bila dirancang atau diimplementasikan tanpa review ahli.
- **Pengaruh pada MVP:** gunakan sebagai pembanding arsitektur, **bukan** alasan membuat kriptografi sendiri. MVP hanya boleh menyebut “receipt/confirmation” sebagai bukti sistem menerima transaksi, bukan bukti kriptografis bahwa suara masuk tally. Jika E2E verifiability masuk roadmap, gunakan protokol/libraries yang ditelaah publik, threat model eksplisit, dan audit kriptografi independen.

### S-10 — U.S. Election Assistance Commission, Voluntary Voting System Guidelines (VVSG) 2.0

- **PDF langsung:** https://www.eac.gov/sites/default/files/TestingCertification/Voluntary_Voting_System_Guidelines_Version_2_0.pdf
- **Status akses:** berhasil (HTTP 200).
- **Temuan:** VVSG 2.0 mengorganisasi prinsip untuk aksesibilitas, keamanan, auditabilitas, ballot secrecy, kontrol akses, logging, integritas data, dan pengujian sistem voting.
- **Batas bukti:** ini pedoman sertifikasi sistem voting AS, bukan sumber akademik dan tidak berlaku sebagai regulasi One Voting di Indonesia. Mengikuti sebagian prinsip tidak berarti produk “VVSG certified”.
- **Pengaruh pada MVP:** gunakan hanya sebagai *negative-space checklist* untuk menemukan risiko yang terlewat—khususnya secrecy, auditability, usability/accessibility, dan operasi—tanpa klaim kepatuhan atau sertifikasi.

---

## Batas klaim produk yang disarankan

### Klaim yang boleh dibuat setelah ada bukti uji

- “Alur inti diuji terhadap checklist WCAG 2.2 AA” — sertakan cakupan, metode, tanggal, dan temuan terbuka.
- “Kontrol aplikasi dipetakan ke OWASP ASVS 5.0.0” — sertakan kontrol yang diuji dan pengecualian.
- “Data dienkripsi saat transit dan saat tersimpan” — hanya setelah konfigurasi dan key management diverifikasi.
- “Identitas/kelayakan disimpan terpisah dari ballot” — hanya bila skema, query, log, ekspor, backup, dan akses operator semuanya mendukung klaim.

### Klaim yang harus dihindari pada MVP

- “100% aman”, “mustahil diretas”, “anonim total”, atau “sesuai UU PDP” tanpa asesmen hukum dan bukti operasional.
- “End-to-end verifiable” jika hanya ada ID transaksi, audit log internal, atau halaman konfirmasi.
- “WCAG 2.2 compliant”, “ASVS certified”, “NIST certified”, atau “VVSG certified” tanpa proses dan otoritas yang memang mendukung klaim tersebut.
- Klaim cocok untuk pemilu nasional/publik; bukti yang ditelaah tidak mendukung positioning itu.

## Celah bukti sebelum keputusan produksi

1. Threat model per tipe pemungutan suara: aset, aktor, coercion, insider, account takeover, endpoint compromise, denial of service, dan korelasi metadata.
2. DPIA/penilaian risiko privasi faktual serta review hukum Indonesia, termasuk peran pengendali–prosesor, anak/data spesifik, transfer lintas negara, dan aturan pelaksana terbaru.
3. Security verification berbasis ASVS dengan bukti pengujian, dependency/SAST/DAST review, pentest independen, dan remediasi.
4. Uji aksesibilitas manual oleh pengguna teknologi bantu pada proses lengkap, bukan hanya komponen terpisah.
5. Verifikasi operasional backup/restore, incident response, penghapusan, pemenuhan hak subjek, pemisahan tugas admin, dan audit akses.
6. Jika ballot secrecy atau E2E verifiability dijanjikan: spesifikasi protokol publik, analisis kebocoran metadata, review ahli kriptografi, dan usability study yang menunjukkan pemilih benar-benar dapat memverifikasi dengan benar.
