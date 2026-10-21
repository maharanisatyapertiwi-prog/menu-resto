
/* =========================================
   1. DATA MENU
   ========================================= */

// Daftar makanan dan minuman yang ditampilkan di website.
// Harga menggunakan satuan rupiah.
// Ganti nama, harga, deskripsi, atau gambar sesuai kebutuhan.

const daftarProduk = [
    {
        id: 1,
        nama: "Nasi Goreng",
        kategori: "makanan",
        harga: 18000,
        deskripsi: "Nasi goreng gurih dengan telur dan sayuran.",
        gambar: "images/nasi-goreng.jpg"
    },
    {
        id: 2,
        nama: "Mie Goreng",
        kategori: "makanan",
        harga: 15000,
        deskripsi: "Mie goreng lezat dengan bumbu pilihan.",
        gambar: "images/mie-goreng.jpg"
    },
    {
        id: 3,
        nama: "Chicken Burger",
        kategori: "makanan",
        harga: 22000,
        deskripsi: "Burger ayam dengan sayuran dan saus spesial.",
        gambar: "images/burger.jpg"
    },
    {
        id: 4,
        nama: "Kentang Goreng",
        kategori: "camilan",
        harga: 12000,
        deskripsi: "Kentang goreng renyah dengan taburan garam.",
        gambar: "images/kentang-goreng.jpg"
    },
    {
        id: 5,
        nama: "Roti Cokelat",
        kategori: "camilan",
        harga: 10000,
        deskripsi: "Roti lembut dengan isian cokelat manis.",
        gambar: "images/roti-cokelat.jpg"
    },
    {
        id: 6,
        nama: "Es Teh Manis",
        kategori: "minuman",
        harga: 5000,
        deskripsi: "Teh manis dingin yang menyegarkan.",
        gambar: "images/es-teh.jpg"
    },
    {
        id: 7,
        nama: "Kopi Susu",
        kategori: "minuman",
        harga: 12000,
        deskripsi: "Perpaduan kopi, susu, dan rasa yang lembut.",
        gambar: "images/kopi-susu.jpg"
    },
    {
        id: 8,
        nama: "Jus Stroberi",
        kategori: "minuman",
        harga: 14000,
        deskripsi: "Minuman buah stroberi yang segar.",
        gambar: "images/jus-stroberi.jpg"
    }
];


/* =========================================
   2. MENGAMBIL ELEMEN HTML
   ========================================= */

// Menghubungkan JavaScript dengan elemen HTML
// berdasarkan ID yang sudah dibuat di index.html.

const elemenDaftarMenu = document.getElementById("daftar-menu");
const elemenPencarian = document.getElementById("pencarian-menu");
const elemenFilter = document.getElementById("filter-kategori");

const elemenDaftarKeranjang =
    document.getElementById("daftar-keranjang");

const elemenJumlahKeranjang =
    document.getElementById("jumlah-keranjang");

const elemenTotalHarga =
    document.getElementById("total-harga");

const tombolKeranjang =
    document.getElementById("tombol-keranjang");

const tombolKosongkan =
    document.getElementById("kosongkan-keranjang");

const tombolBuatPesanan =
    document.getElementById("buat-pesanan");


// Memastikan seluruh elemen HTML yang dibutuhkan tersedia.
const elemenWajib = [
    elemenDaftarMenu,
    elemenPencarian,
    elemenFilter,
    elemenDaftarKeranjang,
    elemenJumlahKeranjang,
    elemenTotalHarga,
    tombolKeranjang,
    tombolKosongkan,
    tombolBuatPesanan
];

if (elemenWajib.some((elemen) => elemen === null)) {
    throw new Error(
        "Ada elemen HTML yang belum ditemukan. " +
        "Periksa kembali ID pada index.html."
    );
}


/* =========================================
   3. DATA KERANJANG
   ========================================= */

// Menyimpan produk yang dipilih pengunjung.
// Jumlah setiap produk akan disimpan pada properti jumlah.

let keranjang = [];


/* =========================================
   4. FUNGSI FORMAT RUPIAH
   ========================================= */

// Mengubah angka menjadi format mata uang Indonesia.
// Contoh: 18000 menjadi Rp18.000.

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}


/* =========================================
   5. MENAMPILKAN DAFTAR MENU
   ========================================= */

// Membuat kartu menu berdasarkan data produk.
// Pencarian dan kategori digunakan untuk menyaring produk.

function tampilkanMenu() {
    const kataKunci = elemenPencarian.value
        .trim()
        .toLowerCase();

    const kategoriDipilih = elemenFilter.value;

    // Memilih produk yang sesuai dengan pencarian dan kategori.
    const produkTerpilih = daftarProduk.filter((produk) => {
        const cocokNama = produk.nama
            .toLowerCase()
            .includes(kataKunci);

        const cocokKategori =
            kategoriDipilih === "semua" ||
            produk.kategori === kategoriDipilih;

        return cocokNama && cocokKategori;
    });

    // Jika tidak ada produk yang sesuai, tampilkan pesan.
    if (produkTerpilih.length === 0) {
        elemenDaftarMenu.textContent =
            "Menu tidak ditemukan. Coba kata kunci lain.";

        return;
    }

    // Mengosongkan daftar sebelum menampilkan hasil baru.
    elemenDaftarMenu.replaceChildren();

    // Membuat kartu untuk setiap produk.
    produkTerpilih.forEach((produk) => {
        const kartu = document.createElement("article");
        kartu.className = "menu-card";

        // Menampilkan foto produk.
        const gambar = document.createElement("img");
        gambar.src = produk.gambar;
        gambar.alt = produk.nama;
        gambar.loading = "lazy";

        // Jika gambar tidak ditemukan, tampilkan pengganti.
        gambar.addEventListener("error", () => {
            gambar.removeAttribute("src");
            gambar.alt = "Gambar " + produk.nama + " belum tersedia";
            gambar.style.height = "190px";
        }, { once: true });

        // Wadah untuk informasi produk.
        const konten = document.createElement("div");
        konten.className = "menu-card-content";

        // Nama produk.
        const nama = document.createElement("h3");
        nama.textContent = produk.nama;

        // Deskripsi produk.
        const deskripsi = document.createElement("p");
        deskripsi.textContent = produk.deskripsi;

        // Harga produk.
        const harga = document.createElement("span");
        harga.className = "price";
        harga.textContent = formatRupiah(produk.harga);

        // Tombol untuk menambahkan produk ke keranjang.
        const tombolTambah = document.createElement("button");
        tombolTambah.type = "button";
        tombolTambah.textContent = "Tambah ke Keranjang";

        tombolTambah.addEventListener("click", () => {
            tambahKeKeranjang(produk.id);
        });

        // Menyusun seluruh elemen ke dalam kartu.
        konten.append(nama, deskripsi, harga, tombolTambah);
        kartu.append(gambar, konten);

        // Menampilkan kartu pada halaman.
        elemenDaftarMenu.appendChild(kartu);
    });
}


/* =========================================
   6. MENAMBAHKAN PRODUK KE KERANJANG
   ========================================= */

// Jika produk sudah ada, jumlahnya bertambah satu.
// Jika belum ada, produk dimasukkan dengan jumlah satu.

function tambahKeKeranjang(idProduk) {
    const produk = daftarProduk.find(
        (item) => item.id === idProduk
    );

    // Menghentikan fungsi jika produk tidak ditemukan.
    if (!produk) {
        return;
    }

    const itemKeranjang = keranjang.find(
        (item) => item.id === idProduk
    );

    if (itemKeranjang) {
        itemKeranjang.jumlah += 1;
    } else {
        keranjang.push({
            ...produk,
            jumlah: 1
        });
    }

    // Memperbarui tampilan setelah produk ditambahkan.
    tampilkanKeranjang();
}


/* =========================================
   7. MENGUBAH JUMLAH PRODUK
   ========================================= */

// Menambah atau mengurangi jumlah produk dalam keranjang.
// Jumlah tidak boleh kurang dari satu.

function ubahJumlah(idProduk, perubahan) {
    const item = keranjang.find(
        (produk) => produk.id === idProduk
    );

    if (!item) {
        return;
    }

    item.jumlah += perubahan;

    // Jika jumlah mencapai nol, produk dihapus.
    if (item.jumlah <= 0) {
        hapusDariKeranjang(idProduk);
        return;
    }

    tampilkanKeranjang();
}


/* =========================================
   8. MENGHAPUS PRODUK DARI KERANJANG
   ========================================= */

// Menghapus satu produk tertentu dari keranjang.

function hapusDariKeranjang(idProduk) {
    keranjang = keranjang.filter(
        (produk) => produk.id !== idProduk
    );

    tampilkanKeranjang();
}


/* =========================================
   9. MENAMPILKAN KERANJANG
   ========================================= */

// Menampilkan daftar pesanan, jumlah produk,
// subtotal, jumlah item, dan total harga.

function tampilkanKeranjang() {
    // Mengosongkan tampilan lama.
    elemenDaftarKeranjang.replaceChildren();

    // Jika keranjang kosong, tampilkan pesan.
    if (keranjang.length === 0) {
        const pesan = document.createElement("p");
        pesan.textContent = "Keranjang masih kosong.";

        elemenDaftarKeranjang.appendChild(pesan);
    } else {
        // Membuat tampilan untuk setiap produk pesanan.
        keranjang.forEach((produk) => {
            const baris = document.createElement("div");
            baris.className = "cart-item";

            const nama = document.createElement("p");
            nama.textContent = produk.nama;

            const jumlah = document.createElement("p");
            jumlah.textContent = "Jumlah: " + produk.jumlah;

            const subtotal = document.createElement("p");
            subtotal.textContent = formatRupiah(
                produk.harga * produk.jumlah
            );

            // Tombol mengurangi jumlah produk.
            const tombolKurang = document.createElement("button");
            tombolKurang.type = "button";
            tombolKurang.textContent = "−";
            tombolKurang.setAttribute(
                "aria-label",
                "Kurangi " + produk.nama
            );

            tombolKurang.addEventListener("click", () => {
                ubahJumlah(produk.id, -1);
            });

            // Tombol menambah jumlah produk.
            const tombolTambah = document.createElement("button");
            tombolTambah.type = "button";
            tombolTambah.textContent = "+";
            tombolTambah.setAttribute(
                "aria-label",
                "Tambah " + produk.nama
            );

            tombolTambah.addEventListener("click", () => {
                ubahJumlah(produk.id, 1);
            });

            // Tombol menghapus produk sepenuhnya.
            const tombolHapus = document.createElement("button");
            tombolHapus.type = "button";
            tombolHapus.textContent = "Hapus";

            tombolHapus.addEventListener("click", () => {
                hapusDariKeranjang(produk.id);
            });

            // Menyusun informasi dan tombol pesanan.
            baris.append(
                nama,
                jumlah,
                subtotal,
                tombolKurang,
                tombolTambah,
                tombolHapus
            );

            elemenDaftarKeranjang.appendChild(baris);
        });
    }

    // Menghitung total jumlah seluruh produk.
    const jumlahSemuaProduk = keranjang.reduce(
        (total, produk) => total + produk.jumlah,
        0
    );

    // Menghitung total harga seluruh pesanan.
    const totalHarga = keranjang.reduce(
        (total, produk) =>
            total + produk.harga * produk.jumlah,
        0
    );

    // Memperbarui angka pada tombol keranjang.
    elemenJumlahKeranjang.textContent = jumlahSemuaProduk;

    // Memperbarui total harga.
    elemenTotalHarga.textContent = formatRupiah(totalHarga);
}


/* =========================================
   10. MENGOSONGKAN KERANJANG
   ========================================= */

// Menghapus seluruh produk setelah pengguna mengonfirmasi.

function kosongkanKeranjang() {
    if (keranjang.length === 0) {
        alert("Keranjang sudah kosong.");
        return;
    }

    const yakin = confirm(
        "Apakah kamu yakin ingin mengosongkan keranjang?"
    );

    if (yakin) {
        keranjang = [];
        tampilkanKeranjang();
    }
}


/* =========================================
   11. SIMULASI MEMBUAT PESANAN
   ========================================= */

// Fitur ini hanya menampilkan ringkasan pesanan.
// Pesanan belum dikirim ke kasir atau server.

function buatPesanan() {
    if (keranjang.length === 0) {
        alert("Silakan pilih menu terlebih dahulu.");
        return;
    }

    // Menyiapkan daftar produk dan total pesanan.
    const ringkasan = keranjang.map((produk) => {
        const subtotal = produk.harga * produk.jumlah;

        return (
            produk.nama +
            " x" + produk.jumlah +
            " = " + formatRupiah(subtotal)
        );
    });

    const totalHarga = keranjang.reduce(
        (total, produk) =>
            total + produk.harga * produk.jumlah,
        0
    );

    const pesan =
        "RINGKASAN PESANAN MENUMATE\n\n" +
        ringkasan.join("\n") +
        "\n\nTotal: " + formatRupiah(totalHarga) +
        "\n\nIni adalah simulasi. Pesanan belum dikirim ke kasir.";

    alert(pesan);
}


/* =========================================
   12. MENGHUBUNGKAN TOMBOL DAN INPUT
   ========================================= */

// Pencarian diperbarui setiap kali pengunjung mengetik.
elemenPencarian.addEventListener("input", tampilkanMenu);

// Menu diperbarui ketika kategori berubah.
elemenFilter.addEventListener("change", tampilkanMenu);

// Tombol keranjang menggulir halaman ke bagian keranjang.
tombolKeranjang.addEventListener("click", () => {
    document.getElementById("keranjang").scrollIntoView({
        behavior: "smooth"
    });
});

// Tombol kosongkan keranjang.
tombolKosongkan.addEventListener(
    "click",
    kosongkanKeranjang
);

// Tombol buat pesanan.
tombolBuatPesanan.addEventListener(
    "click",
    buatPesanan
);


/* =========================================
   13. MENJALANKAN WEBSITE
   ========================================= */

// Menampilkan menu dan keranjang saat halaman dibuka.
tampilkanMenu();
tampilkanKeranjang();
