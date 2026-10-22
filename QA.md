# Catatan pemeriksaan

## Pembaruan cover, folder, dan hero

- Sepuluh cover dipulihkan dengan imagegen, lalu diperiksa secara visual sebagai gambar individual. Ukuran sisi terpanjang 1.271–1.916 piksel; perbedaan rasio terhadap sumber di bawah 2%.
- Hash SHA-256 pada 54 aset foto/desain sumber tetap sama. Seluruh 62 tujuan pembuka gambar yang sudah ada tetap sama. Potret Habib mendapat tautan ke crop aslinya.
- Unduhan storyboard memuat sumber asli dari `data-original`; cover HD hanya dipakai pada tampilan halaman.
- Pemeriksaan fungsi folder: tujuh pergantian status beruntun, `aria-expanded`, `aria-hidden`, dan `inert` sesuai keadaan. Saat tertutup, logo memiliki opacity 0, visibility hidden, dan tidak menerima klik.
- Cahaya di belakang folder berputar ketika bidang terlihat dan folder tertutup. Cahaya memudar dan berhenti saat dibuka. Reduced motion memakai cahaya statis.
- Tipografi dekoratif “bentuk” / “cerita” memakai huruf kecil solid dengan warna, bobot, dan opacity yang sama. Outline dan sinar empat arah dihapus; cahaya menjadi pijar radial dengan satu sapuan berputar di sekitar folder. Pada status terbuka, kata-kata mengecil, berotasi, dan bergeser ke sisi luar. Transisi memakai transform/opacity 300/200 ms dengan token ease-out yang sudah ada; klik berulang membalik transisi yang sedang berlangsung. Reduced motion memudarkan teks tanpa perjalanan, sedangkan keyboard mengikuti penggantian langsung yang sudah ada.
- Perhitungan ukuran huruf dari font lokal: kedua kata tetap berada di dalam bidang pada 101 posisi antara tertutup dan terbuka, pada sembilan lebar 360–1.920 px. Teks dekoratif memakai `aria-hidden`, mengabaikan pointer, dan disembunyikan pada fallback tanpa JavaScript.
- Foto hero mendapat jarak dari batas halaman dan `object-fit: contain`. Perhitungan batas pada sembilan ukuran 360–1.920 px mempertimbangkan rotasi dan perpindahan parallax maksimum 44 px; tidak melewati batas hero.
- Foto Bandongan dan Andong di atas nama digeser 28 px ke atas pada tablet dan desktop setelah pengguna menunjukkan jarak yang terlalu rapat dengan teks. Posisi ponsel dipertahankan.
- Pemeriksaan sintaks JavaScript, referensi aset lokal, struktur ID/anchor, dan integritas ZIP dijalankan ulang.

Pembaruan ini diperiksa melalui berkas, fungsi JavaScript terisolasi, perhitungan geometri, dan gambar individual. Pratinjau browser terbaru belum diuji ulang karena alat browser menolak akses ke localhost. Perhitungan batas bukan pengganti pemeriksaan visual browser. Hasil browser dan gambar pratinjau sebelumnya di bawah berasal dari versi sebelum pembaruan ini.

## Hasil browser versi sebelumnya

- Pemeriksaan tampilan: **0 FAIL** pada 1440, 768, dan 390 px.
- Lint antislop: **0 FAIL, 0 WARN**.
- Chrome headless: desktop 1440×900, tablet 768×1024, ponsel 390×844, ponsel kecil 360×640, serta reduced motion.
- 34 sampel tampilan, termasuk tiga posisi pembukaan contact sheet pada desktop dan tablet.
- Tidak ditemukan error JavaScript, respons HTTP gagal, gambar rusak, atau overflow horizontal pada lima pengaturan itu.
- Arsip foto bisa dibuka dan ditutup.
- Gambar dibuka dalam dialog. Escape menutup dialog dan mengembalikan fokus ke pemicu.
- Maksimal empat foto dapat dipilih. Foto bisa dilepas, pilihan tersimpan setelah reload, dan hasil unduhan PNG diverifikasi berukuran 1600×1000.
- Isi utama tetap terbaca tanpa JavaScript. `index.html` juga diuji melalui `file://`.
- Folder logo diuji buka-tutup, klik cepat berulang, dan Enter. Lima logo tetap berada di dalam bidangnya pada lima pengaturan layar. Setiap logo bisa dibuka dalam dialog.
- Enam kartu Farewell Party bisa dibuka. Fokus keyboard membawa kartu terakhir ke dalam deretan geser di ponsel.
- Aset memakai path relatif. Paket tidak memerlukan server aplikasi atau dependency JavaScript eksternal.

Dua peringatan visual yang dipertahankan: **tidak ada video**, karena materi asli berupa fotografi dan desain statis; dan **deretan kartu bergeser di ponsel**, sesuai bentuk kartu yang diminta pengguna. Kartu berikutnya terlihat sebagian dan navigasi keyboard membawa kartu yang difokuskan ke dalam pandangan. Halaman utamanya tidak melebar ke samping.

## Catatan desain

The contact sheet, seed 430782721. Warna mengacu PDF 2026: hijau sebagai tinta dan bidang desain, merah untuk penutup, kuning untuk tindakan kontak, dengan bidang merah muda yang lebih tenang. Foto-foto menjadi objek yang bergerak; teks tetap terbaca pada bidangnya sendiri.

Ide: foto-foto Habib dari Triwindu, Andong, dan Bandongan menjadi papan cerita yang dapat dipilih pengunjung. Urutan rasa: penasaran → dekat → senang memilih → percaya pada karya → mengenal pembuatnya → siap menghubungi. Puncaknya saat tumpukan foto terbuka menjadi contact sheet. Di ponsel, foto langsung disusun menjadi dua kolom agar pemilihan nyaman dan tidak memerlukan pinning.

Penilaian internal terakhir: desain 7,8; kemudahan penggunaan 8,0; kreativitas 7,8; konten 8,0. Nilai berbobot **7,9/10**, bukan penilaian pihak luar.

Gerak termasuk kategori kunjungan sesekali, untuk menjaga hubungan spasial dan memberi feedback. CSS dan transform/opacity native; kurva ease-out `.23,1,.32,1`; respons tekan 160 ms; pengenalan 700–900 ms. Reduced motion menghapus perjalanan foto. Interaksi keyboard memakai perubahan langsung.

## Batas pemeriksaan

- Belum diuji pada ponsel fisik atau Safari. Pemeriksaan ponsel memakai viewport Chrome.
- Belum dipublikasikan ke GitHub. Panduan penerbitan ada di README.
- Gambar asli dalam dialog mengikuti resolusi spread Behance. Cover HD mengandung detail hasil rekonstruksi AI, bukan detail kamera yang berhasil dipulihkan secara pasti.
- Narasi penghubung ditulis baru dari materi sumber. Nama, lokasi, kontak, judul karya, dan studi kasus diambil dari materi pengguna. Narasi personal tetap sebaiknya dibaca Habib sebelum publikasi.
- Tidak ada klaim klien, penghargaan, statistik, atau testimoni yang ditambahkan.
