# Research Plan — One Voting

**Tanggal:** 28 Juli 2026  
**Tujuan keputusan:** Menentukan beachhead market, lima masalah kritis, hipotesis solusi, dan batas MVP yang dapat menjalankan satu election end-to-end oleh tim kecil.

## Pertanyaan riset

1. Masalah apa yang paling sering, berat, dan belum teratasi dalam voting organisasi mahasiswa?
2. Bagaimana panitia membatasi pemilih, mencegah suara ganda, menjaga kerahasiaan, dan menangani sengketa sekarang?
3. Kapabilitas apa yang menjadi standar minimum produk e-voting aktif?
4. Trade-off apa yang muncul antara akses mudah, keamanan, anonimitas, auditability, dan biaya?
5. Asumsi desirability, feasibility, viability, security, serta legal/privacy mana yang harus diuji sebelum pembangunan penuh?

## Scope

- **In scope:** election internal skala kecil–menengah untuk kampus, sekolah, komunitas, organisasi, dan perusahaan; single-choice pada MVP; web mobile-first.
- **Out of scope:** pemilu pemerintahan/nasional, blockchain, biometrik, face recognition, integrasi identitas pemerintah, aplikasi native, multi-region, dan klaim keamanan absolut.

## Metode

1. Desk research terhadap situs/dokumentasi resmi kompetitor dan solusi alternatif.
2. Review sumber otoritatif keamanan web, privasi, regulasi Indonesia, accessibility, serta publikasi akademik e-voting.
3. Sintesis proses voting saat ini dan stakeholder journey.
4. Scoring pain point menggunakan frekuensi × keparahan; skor awal diperlakukan sebagai hipotesis sampai wawancara.
5. Feature prioritization dengan MoSCoW dan RICE relatif.
6. Assumption mapping berdasarkan kepentingan dan ketidakpastian.
7. Penyusunan validation plan: wawancara, prototype test, landing/fake-door, dan pilot election.

## Standar bukti

- Klaim fitur dan harga kompetitor hanya dari halaman resmi yang dapat diakses.
- Sumber pencarian atau snippet hanya digunakan untuk discovery, bukan bukti.
- Klaim penting memiliki judul, organisasi/penulis, URL langsung, tanggal akses, dan ringkasan penggunaan.
- Bila sumber tidak membuktikan fitur, matriks ditandai **Tidak ditemukan bukti**, bukan diasumsikan tidak tersedia.
- Skor, persona, target metric, dan estimasi pasar diberi label asumsi atau rekomendasi.
- Fakta tidak digeneralisasi melebihi populasi atau konteks sumber.

## Output

1. `one-voting-product-discovery.md` — dokumen utama 33 bagian.
2. Bagian Sources and References di dokumen utama berfungsi sebagai source ledger.
3. Mermaid flowchart divalidasi secara sintaksis.
4. Tabel traceability menghubungkan problem, pain point, hypothesis, feature, dan metric.

## Kriteria keputusan

- MVP hanya memuat kemampuan yang diperlukan untuk election end-to-end dan mitigasi risiko kritis.
- Semua fitur Must Have harus terhubung ke masalah prioritas atau kontrol keamanan wajib.
- Asumsi berisiko tinggi memiliki eksperimen, indikator, dan kriteria lanjut/ubah/hentikan.
- Rekomendasi beachhead market tidak diperluas sebelum pilot menghasilkan bukti perilaku dan kepercayaan.
