// Handle klik tombol navigasi
document.querySelectorAll('.scroll-to').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Scroll manual ke target hanya kalau user klik, bukan page load
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('nav').offsetHeight,
                behavior: 'smooth'
            });

            // Setelah klik nav, paksa scrollRestoration jadi manual
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
        }
    });
});

// Saat DOM selesai load, biarin browser restore otomatis posisi terakhir
document.addEventListener('DOMContentLoaded', function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
    }
});

AOS.init({
    offset: 120,
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Mendapatkan semua elemen navigasi dan section
const navLinks = document.querySelectorAll('.scroll-to');
const sections = document.querySelectorAll('section');

// Fungsi untuk mengatur tombol aktif
function activateLink() {
    let currentSection = ''; // Untuk menyimpan section yang sedang aktif

    // Memeriksa setiap section apakah sudah dalam jangkauan viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Menentukan apakah section sedang terlihat di viewport
        if (window.pageYOffset >= sectionTop - sectionHeight / 3 && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Menambahkan kelas 'active' pada link yang sesuai dengan section yang aktif
    navLinks.forEach(link => {
        link.classList.remove('active');  // Menghapus kelas aktif dari semua link
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');  // Menambahkan kelas aktif pada link yang sesuai
        }
    });
}

// Event listener untuk scroll
window.addEventListener('scroll', activateLink);

// Menjalankan sekali di awal untuk memastikan jika halaman sudah dalam posisi scroll tertentu
activateLink();
