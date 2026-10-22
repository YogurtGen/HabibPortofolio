# Habib Maulana: fotografi & desain

Website statis dengan alur storyboard, memakai karya asli dari tautan portofolio yang diberikan. Tidak memerlukan npm, framework, atau proses build.

## Isi

```text
index.html     Konten dan struktur halaman
styles.css     Warna, tipografi, layout, dan animasi
logos.css      Folder logo interaktif dan kartu poster
script.js      Pembuka gambar, pilihan foto, dan ekspor storyboard
assets/        Foto, desain, font, dan lisensi font lokal
.nojekyll      Menonaktifkan pemrosesan Jekyll
```

## Unggah ke GitHub Pages

1. Ekstrak ZIP. Unggah **isi folder** `habib-portfolio` ke root repository. `index.html` harus berada di root, bukan di subfolder tambahan.
2. Buka **Settings → Pages** pada repository.
3. Pilih **Deploy from a branch**, branch **main**, folder **/(root)**, lalu **Save**.

Semua path aset relatif sehingga bisa dipakai pada `username.github.io/nama-repository/` tanpa mengganti kode. Sertakan `.nojekyll` saat mengunggah.

[Panduan resmi GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Pratinjau lokal

`index.html` dapat dibuka langsung untuk melihat halaman. Untuk menguji unduhan PNG secara penuh, jalankan server lokal dari folder ini:

```sh
python -m http.server 4500
```

Lalu buka `http://localhost:4500`. Browser dapat membatasi ekspor canvas bila halaman dibuka melalui `file://`.

## Mengubah isi

- Edit narasi, judul, tautan kontak, dan urutan karya di `index.html`.
- Edit token warna dan ukuran di `:root` dalam `styles.css`.
- Ganti foto dalam `assets/` dengan nama yang sama, atau perbarui path pada HTML.
- Pilihan pengunjung tersimpan hanya pada browser pengunjung melalui `localStorage`.
- Tombol kontak membuka aplikasi email. Tidak ada backend pengiriman email.
- Folder Logo menyembunyikan semua logo ketika tertutup. Kata “bentuk” dan “cerita” memakai huruf kecil solid berwarna hijau, dengan pijar kuning dan satu sapuan cahaya yang berputar di belakang folder. Saat dibuka, lima logo menyebar, kata-kata terlempar ke tepi, dan cahaya berhenti. Saat ditutup, kata-kata kembali. Di ponsel, teks bergerak ke atas dan bawah; reduced motion memakai perpindahan langsung dan fade. Seri Farewell Party berisi enam kartu poster, dengan deretan geser native di ponsel.
- Tinjau narasi baru dengan suara personal Habib sebelum penerbitan publik.

## Sumber karya

Semua fotografi dan desain bersumber dari materi yang dibagikan pengguna. Sepuluh cover foto memakai restorasi resolusi berbantuan AI melalui imagegen sesuai permintaan pengguna. Detail hasil restorasi dapat berbeda dari foto asli; berkas ini hanya dipakai untuk cover. Tidak ada foto stok.

- [Photography Portfolio ©2025, Habib Maulana](https://www.behance.net/gallery/228135761/Photography-Portfolio-2025): spread fotografi, potret Habib, dan crop foto Triwindu, Andong, Bandongan, Blebak, serta Pantai Ayah.
- [Portfolio Desain Habib](https://drive.google.com/drive/folders/1Lh7DBZHKu04ETdxjMzqSrAXSG19Coy3g): poster Mayar Aji, Astraphala, Nyepi, Pendidikan Nasional, Dahayu Abhirama, serta logo Coklat Clekit.
- [Portofolio tengah periode 2026](https://drive.google.com/file/d/1grz0ICZ-Sn846omXDLfCQaM6feQx5rCt/view): acuan merah, hijau, kuning; informasi profil profesional; dan studi kasus organigram BEM KM UNNES.

Lima logo pada halaman keenam PDF dan enam poster Farewell Party pada halaman ketujuh diekstrak langsung sebagai aset transparan. Bentuk folder di tengah dibuat dalam CSS. Tidak ada logo yang digambar ulang atau dibuat AI.

Kredit karya terdapat di footer. Hak foto dan desain tetap pada pemiliknya; paket ini tidak memberi lisensi untuk penggunaan karya oleh pihak lain. Klik cover membuka spread asli yang sama seperti sebelumnya. Klik potret Habib membuka crop asli. Unduhan storyboard juga memakai crop asli, bukan hasil restorasi AI.

Cover berakhiran `-hd.webp`, dengan sisi terpanjang 1.271–1.916 piksel. Foto sumber tetap disertakan tanpa perubahan. Prompt lengkap dan ukuran setiap hasil tercatat di `assets/cover-restoration.json`. Jika tersedia, berkas dari kamera tetap menjadi sumber terbaik untuk menggantikan cover.

Font Bricolage Grotesque disertakan secara lokal dengan SIL Open Font License di `assets/OFL-Bricolage.txt`.

## Desain dan pemeriksaan

Arah: **The contact sheet**, seed **430782721**. Foto di sekeliling nama menjadi pembuka; cerita Triwindu dan Andong berlanjut ke arsip, pilihan storyboard, desain, profil, dan kontak. Galeri diganti dari strip yang banyak ruang kosong menjadi lembar karya karena materi foto yang tersedia banyak. Penutup disesuaikan dengan kontak yang benar-benar tersedia.

Gerak memakai CSS dan JavaScript native: pengenalan awal, parallax ringan, foto yang terbuka dari tumpukan, serta respons tekan. Kurva `cubic-bezier(.23,1,.32,1)`, gerak masuk 700–900 ms, respons kontrol 160 ms. Reduced motion mempertahankan seluruh isi dan menghilangkan perpindahan. Tidak ada video karena sumber portofolio berisi fotografi dan desain statis.

Pengujian dan batasnya tercatat di `QA.md`. Situs siap diunggah, tetapi belum dipublikasikan ke repository GitHub pengguna.
