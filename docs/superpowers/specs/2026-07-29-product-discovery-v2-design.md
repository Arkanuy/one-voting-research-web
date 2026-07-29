# Desain Perombakan Product Discovery One Voting

**Tanggal:** 29 Juli 2026  
**Status:** Disetujui untuk perencanaan implementasi  
**Audience:** stakeholder nonteknis, product/UI/UX, dan developer

## 1. Tujuan

Mengganti dokumen utama yang padat dan berorientasi checklist dengan dokumen siap saji sepanjang sekitar 30–45 halaman. Pembaca nonteknis harus memahami alasan produk, masalah, pengguna, dan keputusan MVP. Tim pengembangan harus tetap menemukan alur, permission, keamanan, data, acceptance criteria, serta batas teknis yang dibutuhkan untuk mulai membuat PRD dan implementation plan.

Dokumen lama tidak dihapus. Ia menjadi arsip dan sumber penelusuran keputusan.

## 2. Masalah Dokumen Saat Ini

- Tiga puluh tiga bagian disusun untuk memenuhi daftar deliverable, bukan alur membaca.
- Keputusan penting tersebar di antara tabel dan detail teknis.
- Istilah seperti entitlement, idempotency, reconciliation, dan append-only muncul sebelum dijelaskan.
- Ringkasan stakeholder bercampur dengan threat model dan kontrak implementasi.
- Sejumlah poin diulang pada executive summary, pain points, MVP, security, dan recommendations.
- Dokumen sulit dipresentasikan tanpa penjelasan tambahan.

## 3. Pendekatan

Dokumen baru ditulis ulang berdasarkan alur keputusan:

`Konteks → Masalah → Pengguna → Bukti → Keputusan Produk → MVP → Risiko → Validasi → Development`

Riset lama dipakai sebagai discovery input, bukan teks yang sekadar dipendekkan. Klaim eksternal penting diverifikasi ulang. Informasi baru hanya masuk jika relevan terhadap keputusan produk.

## 4. Struktur Dokumen Baru

### Bagian I — Ringkasan Pengambil Keputusan

1. Tentang One Voting
2. Mengapa Produk Ini Dibutuhkan
3. Masalah yang Dipilih
4. Pengguna dan Pasar Awal
5. Solusi yang Diusulkan
6. Keputusan MVP
7. Risiko dan Langkah Berikutnya

### Bagian II — Product Discovery

8. Metode dan Batas Riset
9. Proses Voting Saat Ini
10. Problem Statement
11. Target User dan Stakeholder
12. Persona dan Jobs to Be Done
13. Pain Points dan Prioritas
14. Existing Solutions
15. Competitor Analysis
16. Market Gap dan Positioning
17. Solution Hypothesis
18. Assumption Mapping

### Bagian III — Definisi Produk

19. Prinsip Produk
20. Alur Election End-to-End
21. Scope MVP V1
22. Post-MVP dan Future Scope
23. Feature Prioritization
24. User Stories dan Acceptance Criteria
25. Role dan Permission
26. Success Metrics

### Bagian IV — Keamanan dan Teknis

27. Model Kerahasiaan Suara
28. Risiko Keamanan dan Mitigasi
29. Privasi dan UU PDP
30. Arsitektur Teknis yang Direkomendasikan
31. Data Model Konseptual
32. Transaksi Vote dan Idempotency
33. Non-Functional Requirements

### Bagian V — Validasi dan Eksekusi

34. Validation Plan
35. Rencana Pilot
36. Roadmap Development
37. Go/No-Go Criteria
38. Open Questions
39. Rekomendasi Akhir
40. Referensi dan Lampiran

## 5. Pola Isi

Bagian yang memerlukan keputusan menggunakan urutan berikut bila relevan:

1. **Inti pembahasan:** penjelasan sederhana.
2. **Bukti:** fakta dan sumber yang mendukung.
3. **Keputusan produk:** pilihan dan alasan.
4. **Implikasi desain/development:** konsekuensi konkret.
5. **Hal yang belum pasti:** asumsi dan validasi.

Label yang dipertahankan:

- `[FAKTA]`
- `[INSIGHT]`
- `[ASUMSI]`
- `[REKOMENDASI]`
- `[PERLU VALIDASI]`

## 6. Aturan Bahasa

- Bahasa Indonesia formal dan langsung.
- Istilah Indonesia didahulukan; istilah Inggris dicantumkan bila dibutuhkan developer.
- Jargon dijelaskan saat pertama muncul.
- Paragraf pendek; tabel hanya digunakan ketika membantu perbandingan.
- Tidak menggunakan bahasa promosi atau klaim keamanan absolut.
- Fakta, interpretasi, asumsi, dan keputusan tidak dicampur.
- Detail yang tidak mengubah keputusan dipindahkan ke lampiran atau dokumen pendukung.

## 7. Research Plan Ulang

Riset ulang bersifat terarah, bukan mengulang semua pencarian:

- verifikasi kemampuan dan harga kompetitor dari halaman resmi terkini;
- verifikasi keterbatasan Google Forms/Microsoft Forms dari dokumentasi resmi;
- verifikasi security guidance dari OWASP, NIST, dan sumber e-voting akademik;
- verifikasi UU PDP dari sumber regulasi resmi;
- periksa kembali studi kasus kampus Indonesia tanpa generalisasi nasional;
- catat tanggal akses, URL langsung, klaim yang dipakai, dan pengaruh terhadap keputusan.

Bukti vendor ditandai sebagai klaim vendor bila tidak ada audit independen.

## 8. Keputusan Produk yang Dipertahankan sampai Ada Bukti Baru

- Beachhead: organisasi mahasiswa Indonesia.
- Skala awal: 50–1.000 pemilih.
- Election awal: single-choice.
- Default: hasil disembunyikan sampai election ditutup.
- Organizer tidak boleh melihat hubungan identitas dengan pilihan.
- MVP harus mendukung satu election penuh dari setup sampai laporan.
- Blockchain, biometrik, native app, SSO kampus, dan advanced fraud AI bukan MVP.

Keputusan tersebut tetap diberi status sementara sampai wawancara dan pilot.

## 9. Perubahan Web

- `Product Discovery` menampilkan dokumen baru.
- Arsip tampil sebagai `Product Discovery v1 — Arsip`.
- Sidebar membedakan dokumen utama, riset pendukung, dan arsip.
- Search mengindeks dokumen baru dan arsip per section.
- Dokumen lama tidak dihapus dari Git atau D1.
- D1 menyimpan dokumen baru sebagai revision terpublikasi berikutnya.

## 10. Backup dan Migrasi

Backup wajib tersedia pada tiga lapis:

1. File arsip di `content/archive/product-discovery-v1-2026-07-28.md`.
2. Git commit sebelum dokumen baru menggantikan file utama.
3. Revision D1 sebelum publish versi baru.

Checksum arsip dicatat pada laporan akhir.

## 11. Acceptance Criteria

Dokumen dianggap siap bila:

- memiliki 40 bagian yang ditetapkan tanpa placeholder;
- berada pada kisaran 30–45 halaman secara estimasi ekspor;
- tujuh task inti dapat ditemukan dalam daftar isi;
- keputusan MVP dapat dipahami dari Bagian I tanpa membaca lampiran;
- setiap fitur Must dapat ditelusuri ke masalah, risiko, dan metric;
- istilah teknis utama didefinisikan;
- sumber penting memiliki URL dan tanggal akses;
- asumsi berisiko tinggi ditandai;
- Mermaid valid;
- tidak ada kontradiksi scope V1, V1.1, dan Future;
- validator dokumen, test, lint, type-check, dan production build lulus;
- halaman publik, search, arsip, tabel, Mermaid, desktop, dan mobile terverifikasi;
- versi D1 sama dengan file Markdown yang di-commit.

## 12. Out of Scope

- Mengubah hasil riset menjadi klaim hasil wawancara.
- Mendesain UI produk voting utama.
- Mengimplementasikan aplikasi One Voting.
- Menetapkan stack final tanpa architecture decision record terpisah.
- Menghapus dokumen pendukung yang sudah ada.

## 13. Deliverables

- Product Discovery v2 siap saji.
- Arsip Product Discovery v1.
- Ledger sumber yang diperbarui.
- Laporan gap dan perubahan keputusan.
- Validator struktur/sumber/keterlacakan.
- Versi web dan D1 yang telah dipublikasikan.
- Commit hash dan laporan verifikasi akhir.
