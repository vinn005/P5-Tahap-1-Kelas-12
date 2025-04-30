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