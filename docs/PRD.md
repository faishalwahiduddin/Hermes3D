# PRD — Product Requirements Document (hermes3d)

> **SSoT boundary (binding).** Berkas ini memiliki **HOW (perilaku fungsional & sistem)**: alur per modul, jalur positif/negatif, kondisi percabangan, kasus tepi, aturan validasi, kriteria penerimaan.
> Berkas ini **tidak** memiliki definisi peran, matriks izin, glosarium domain, atau aturan global — itu kanonis di [BRD](./BRD.md) dan **ditaut, tidak diulang**.
> Detail implementasi (SQL mentah, bentuk OpenAPI, setup/deploy) hidup di kode dan berkas yang dirujuk [README](../README.md), [ARCHITECTURE](../ARCHITECTURE.md), [AGENTS](../AGENTS.md).

- Aktor di bawah adalah peran operator dari [BRD §2](./BRD.md#2-aktor--matriks-peran). Tidak ada peran login end-user; repo ini tooling self-hosted tanpa tabel user.
- Spesifikasi perilaku agen (ruang rapat, papan buletin, progresi meja, QA, gym, janitor) dirinci di `docs/*.md` (`meeting-room-workflow-spec.md`, `bulletin-board-spec.md`, `desk-progression-spec.md`, `qa-department-spec.md`, `hermes-agent-tailscale.md`, `hermes-gateway.md`, `permissions-sandboxing.md`, `pi-chat-streaming.md`, `whiteboard-spec.md`, `multi-agent-beta.md`, `office-conversation-bridge.md`, `office-systems-roadmap.md`, `runtime-profiles.md`, `roadmap.md`).

---

## MOD-001 — Kantor 3D `/office` (`OFF`)

**Gambaran & pemetaan sumber.** Lingkungan kantor retro 3D tempat agen tampil sebagai pekerja yang bergerak di dunia bersama. Sumber: `src/app/` (rute Next.js 16 App Router), `src/components/` (termasuk `RetroOffice3D.tsx`), Three.js (`three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`), tampilan 2D piksel via Phaser (`phaser`) sebagai `Office renderer` alternatif (toolbar `2D` atau Settings).

**Aktor & prasyarat.** `operator` membuka `/office`. Prasyarat: gateway berjalan (`npm run hermes-adapter` di `ws://localhost:18789`, atau `npm run demo-gateway` untuk eksplorasi tanpa backend); tanpa gateway, UI memuat tapi menampilkan form koneksi gateway (perilaku yang diharapkan, bukan galat).

**Alur positif.**
1. Operator menjalankan `npm run dev` (port 3000 via `node server/index.js --dev`), lalu membuka `/office`.
2. Studio membuka proksi WebSocket same-origin (`server/gateway-proxy.js`) ke gateway upstream dan merender agen sebagai avatar di lantai kantor.
3. Operator beralih renderer 3D/2D lewat toolbar tanpa kehilangan status koneksi.
4. Hover/klik avatar menampilkan status agen (ruang, tugas, sesi).

**Alur negatif.** Gateway mati → form koneksi tampil; input URL/token salah → status terputus dengan pesan, tidak crash. Aset 3D gagal dimuat → fallback tampilan 2D bila dipilih operator.

**Kondisi & percabangan.** Renderer aktif tersimpan sebagai preferensi UI lokal Studio; status runtime tetap milik backend gateway (gateway-first, lihat [BRD §5](./BRD.md#5-aturan-global--batas)).

**Kasus tepi.** `RetroOffice3D.tsx` punya satu galat ESLint pra-eksis yang diketahui — perubahan di berkas itu wajib `npm run lint` terpisah. Mesin berdaya rendah memakai tampilan 2D Phaser.

**Kriteria penerimaan.**
- Dengan demo gateway hidup, ketika operator membuka `/office`, maka avatar agen tampil bergerak dalam < 10 detik.
- Ketika gateway dimatikan, maka form koneksi tampil dan tidak ada unhandled exception.

---

## MOD-002 — Adapter gateway (`GTW`)

**Gambaran & pemetaan sumber.** Lapisan adapter/proksi antara Studio dan runtime. Sumber: `server/hermes-gateway-adapter.js` (adapter Hermes, ~49KB), `server/demo-gateway-adapter.js` (gateway mock), `server/gateway-proxy.js` (proksi same-origin), `server/access-gate.js`, `server/network-policy.js`, `server/index.js` (custom server; `npm run dev`, `npm run start`, `npm run dev:https`).

**Aktor & prasyarat.** `operator` menjalankan perintah npm. Prasyarat: Node.js 20+ dan `.env` disalin dari `.env.example` (lihat "Configuration" di README).

**Alur positif.**
1. `npm run hermes-adapter` menghubungkan Studio ke backend Hermes lewat protokol gateway WebSocket.
2. `npm run demo-gateway` menyajikan data mock untuk eksplorasi kantor tanpa framework agen nyata.
3. `node server/index.js --dev` melayani Next.js + proksi WebSocket dalam satu proses.

**Alur negatif.** Port 18789 bentrok → adapter gagal start dengan pesan port; `.env` hilang → nilai default contoh dipakai dan koneksi gateway gagal secara eksplisit.

**Kondisi & percabangan.** Penyedia runtime: `hermes` (bundel), `custom` HTTP langsung untuk stack orkestrator, `demo` untuk eksplorasi (lihat `docs/runtime-profiles.md`).

**Kriteria penerimaan.**
- Ketika `npm run demo-gateway` lalu `npm run dev` dijalankan, maka `/office` menampilkan agen mock tanpa backend Hermes.
- Ketika protokol gateway berubah di upstream, maka yang diubah hanya lapisan adapter, bukan komponen UI.

---

## MOD-003 — Builder tata letak `/office/builder` (`BLD`)

**Gambaran & pemetaan sumber.** Permukaan edit dan publikasi tata letak kantor. Sumber: rute di bawah `src/app/office/builder`, `scripts/studio-setup.js` (setup Studio, interaktif TTY — jangan dijalankan di lingkungan non-interaktif), `docs/office-systems-roadmap.md`.

**Alur positif.** Operator membuka `/office/builder` → menggeser/menambah elemen → menerbitkan tata letak → `/office` merender tata letak baru.

**Alur negatif.** Publikasi dengan tata letak tak valid → ditolak dengan pesan field, tata letak lama tetap aktif.

**Kriteria penerimaan.**
- Ketika operator menerbitkan tata letak valid, maka `/office` memuatnya ulang tanpa restart server.

---

## MOD-004 — Operasi agen: standup, PR, QA, gym, janitor (`OPS`)

**Gambaran & pemetaan sumber.** Fitur kolaborasi yang terlihat di kantor: standup (terhubung GitHub dan Jira), review pull request dari dalam kantor, monitor pipeline QA dan log, gym pelatihan skill agen, sistem janitor untuk reset sesi dan bersih konteks. Spesifikasi perilaku di `docs/meeting-room-workflow-spec.md`, `docs/qa-department-spec.md`, `docs/hierarchy-and-teams-spec.md`, `docs/agent-state-model-spec.md`; peta jalan di `docs/office-systems-roadmap.md` dan `ROADMAP.md`.

**Alur positif.**
1. Operator memulai standup → agen yang terhubung GitHub/Jira melaporkan status di ruang rapat.
2. Operator membuka PR dari dalam kantor → komentar/review diteruskan ke penyedia git.
3. Operator memicu reset janitor → sesi dan konteks agen dibersihkan.

**Alur negatif.** Kredensial GitHub/Jira belum dipasang → fitur standup nonaktif dengan pesan konfigurasi, modul lain tetap jalan.

**Kriteria penerimaan.**
- Dengan kredensial terpasang, ketika standup dimulai, maka minimal satu agen melaporkan status di ruang rapat.
- Ketika janitor reset dijalankan, maka konteks sesi kembali kosong dan tercatat di log.

---

## MOD-005 — Verifikasi: lint, typecheck, uji (`QRY`)

**Gambaran & pemetaan sumber.** Perintah: `npm run lint` (ESLint), `npm run typecheck` (`tsc --noEmit`), `npm run test -- --run` (Vitest, wajib `--run` karena default watch), `npm run e2e` (Playwright, perlu `npx playwright install`), `npm run smoke:dev-server`, `npm run doctor` (`scripts/hermes3doctor.mjs`), `npm run cleanup:ux-artifacts`.

**Kriteria penerimaan.**
- Ketika `npm run typecheck` dijalankan setelah perubahan non-test, maka tidak ada galat baru di luar daftar pra-eksis (`agentChatPanel-*.test.ts` prop `onOpenSettings` basi).
- Ketika `npm run test -- --run` dijalankan, maka tidak ada kegagalan baru di luar daftar pra-eksis yang didokumentasikan.
