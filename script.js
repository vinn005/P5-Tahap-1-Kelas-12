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

const navLinks = document.querySelectorAll("nav ul li a");
const heroSection = document.querySelector(".hero");
const introSection = document.querySelector("#opening");
const activitiesSection = document.querySelector("#activities");
const closingSection = document.querySelector("#closing");

function activateLink() {
    const scrollY = window.pageYOffset;

    // Reset semua link
    navLinks.forEach(link => link.classList.remove("active"));

    // Titik batas awal
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

    if (scrollY < heroBottom - 50) {
        // ✅ Tidak ada tombol aktif saat masih di hero
        return;
    } else if (scrollY >= heroBottom - 50 && scrollY < activitiesSection.offsetTop - 100) {
        // ✅ Introduction aktif setelah lewat hero sampai sebelum activities
        document.querySelector('a[href="#opening"]').classList.add("active");
    } else if (scrollY >= activitiesSection.offsetTop - 100 && scrollY < closingSection.offsetTop - 100) {
        // ✅ Solutions aktif
        document.querySelector('a[href="#activities"]').classList.add("active");
    } else {
        // ✅ Conclusion aktif
        document.querySelector('a[href="#closing"]').classList.add("active");
    }
}

// Jalankan fungsi saat scroll dan load awal
window.addEventListener("scroll", activateLink);
activateLink();
