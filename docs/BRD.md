# BRD — Business Requirements Document (hermes3d)

> **SSoT boundary (binding).** Berkas ini memiliki **WHY & WHAT (level bisnis)**: tujuan, registri aktor/peran, glosarium domain, aturan global.
> Berkas ini **tidak** memiliki alur fungsional per modul, katalog validasi, atau kriteria penerimaan — itu hidup di [PRD](./PRD.md).
> Detail implementasi (perintah setup, topologi) hidup di kode dan berkas yang dirujuk [README](../README.md).

- Repo: `hermes3d` — frontend Next.js 16 (TypeScript, React 19, Three.js, Phaser) untuk backend Hermes; **bukan** aplikasi end-user dan **bukan** backend agen itu sendiri.
- Aturan repo normatif: [AGENTS.md](../AGENTS.md) (instruksi generik aman open-source; overlay privat tidak boleh di-commit), [ARCHITECTURE.md](../ARCHITECTURE.md), [VISION.md](../VISION.md), [TUTORIAL.md](../TUTORIAL.md), [CONTRIBUTING.md](../CONTRIBUTING.md), [SECURITY.md](../SECURITY.md), [CODE_OF_CONDUCT.MD](../CODE_OF_CONDUCT.MD).

## 1. Ringkasan eksekutif & tujuan sistem

Daripada memantau otomasi lewat dasbor dan log, operator berjalan di kantor 3D live tempat agen berkolaborasi, review kode, standup, menaikkan PR, dan mengeksekusi tugas berdampingan. Hermes3D adalah lapisan visualisasi dan interaksi; Gateway hanya control plane, produknya adalah kantornya.

Nilai yang diimplementasikan (alur di [PRD](./PRD.md)):

1. **Kantor 3D live** (`/office`) dengan fallback kantor piksel 2D untuk mesin lemah.
2. **Builder tata letak** (`/office/builder`) untuk menyunting dan menerbitkan layout.
3. **Arsitektur gateway-first**: status runtime milik backend yang terhubung, Studio hanya menyimpan preferensi UI lokal.
4. **Seam runtime netral-backend** di Studio sehingga penyedia baru terintegrasi tanpa menulis ulang UI.
5. **Operasi agen terlihat**: standup GitHub/Jira, review PR, monitor QA, gym, janitor reset.

Di luar lingkup: membangun runtime upstream itu sendiri; repo ini tidak berisi backend Hermes.

## 2. Aktor & matriks peran

Repo tooling self-hosted ini **tidak punya peran login end-user** dan tidak punya tabel user. Aktor di bawah adalah peran operasional, bukan role registry aplikasi.

| Aktor | Sifat | Kemampuan |
|---|---|---|
| Operator self-host | Manusia yang menjalankan infrastruktur sendiri | `npm run dev`, `npm run hermes-adapter` / `demo-gateway`, membuka `/office` dan `/office/builder`, memasang `.env`, kredensial GitHub/Jira |
| Backend agen | Runtime eksternal (Hermes via adapter bundel, penyedia `custom` HTTP, atau demo gateway) | Menyediakan status runtime lewat protokol gateway WebSocket; satu-satunya sumber kebenaran status agen |
| Pengunjung demo | Tanpa backend | Menjelajah kantor memakai demo gateway, tanpa data agen nyata |
| Kontributor OSS | Publik (Lisensi MIT) | Mengikuti CONTRIBUTING.md; instruksi privat dilarang masuk repo |

## 3. Glosarium domain

| Istilah | Arti di repo ini (PRD wajib memakai ulang, tidak mendefinisikan ulang) |
|---|---|
| Gateway | Control plane WebSocket; `server/hermes-gateway-adapter.js` (Hermes) atau `server/demo-gateway-adapter.js` (mock) |
| Studio | Frontend Next.js + preferensi UI lokal; tidak menyimpan status runtime |
| Runtime provider | `hermes` (bundel), `custom` (HTTP langsung untuk stack orkestrator), `demo` (eksplorasi tanpa backend) |
| Office renderer | `3D` (Three.js/R3F) atau `2D` (Phaser piksel); preferensi UI, bukan status |
| Janitor | Subsistem reset sesi dan bersih konteks |
| Gym | Subsistem pelatihan skill agen |

## 4. Aturan global & batas

1. **Protokol gateway dan Hermes HTTP API adalah kontrak eksternal yang dibaca, bukan disunting.** Perubahan yang diminta user berlaku untuk app ini; perbaikan protokol dilakukan di upstream.
2. **Status runtime milik backend.** Studio tidak boleh menjadi sumber kebenaran status agen.
3. **Repo generik dan aman open-source.** Dilarang commit instruksi personal, spesifik-lingkungan, atau rahasia; overlay privat tetap di luar repo.
4. **Proyek tidak resmi (unofficial).** Tidak berafiliasi, didukung, atau dipelihara tim backend agen yang disambunginya.
5. **Perintah interaktif TTY** (`npm run studio:setup`) dilarang dijalankan di lingkungan cloud non-interaktif.
6. **Vitest wajib `--run`** untuk pemakaian CI/agen (default-nya watch mode).
7. **Daftar pra-eksis diketahui**: satu galat ESLint (`RetroOffice3D.tsx`), galat tipe di `agentChatPanel-*.test.ts`, beberapa kegagalan uji. Perubahan baru tidak boleh menambah di luar daftar ini tanpa dicatat.
