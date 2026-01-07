// guard: jalankan setelah DOM siap (script diberi defer, tapi ini aman)
(() => {
  const navLinksContainer = document.getElementById("nav-links");
  const navLinks = document.querySelectorAll("#nav-links a");
  const indicator = document.getElementById("indicator");
  const logo = document.getElementById("logo");
  const logout = document.getElementById("logout");
  const modeToggle = document.getElementById("mode-toggle");
  const body = document.body;

  if (!navLinksContainer || !indicator) return; // jika y6tielemen tidak ditemukan, hentikan

  // pastikan ada link aktif; jika tidak ada, set yang pertama aktif
  let active = document.querySelector("#nav-links a.active");
  if (!active) {
    active = navLinks[0];
    active.classList.add("active");
  }

  // memperbarui posisi indikator relatif ke container ul
  function moveIndicatorTo(element) {
    if (!element) return;
    const linkRect = element.getBoundingClientRect();
    const containerRect = navLinksContainer.getBoundingClientRect();

    indicator.style.width = "${linkRect.width}px";
    indicator.style.left = "${linkRect.left - containerRect.left}px";
    // jika mau indikator berbentuk pill lebih kecil margin, bisa dikurangi width/left
  }

  // set posisi awal setelah page load
  function moveIndicatorTo(element) {
    if (!element) return;
    const linkRect = element.getBoundingClientRect();
    const containerRect = navLinksContainer.getBoundingClientRect();

    indicator.style.width = `${linkRect.width}px`;
    indicator.style.left = `${linkRect.left - containerRect.left}px`;
  }

  // klik link -> pindah indikator & atur active
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      moveIndicatorTo(link);
    });
  });

  // jika jendela di-resize, posisikan ulang indikator agar tidak meleset
  window.addEventListener("resize", () => {
    const current = document.querySelector("#nav-links a.active");
    if (current) moveIndicatorTo(current);
  });

  // animasi klik logo (tetap)
  if (logo) {
    logo.addEventListener("click", () => {
      logo.classList.add("animate");
      setTimeout(() => logo.classList.remove("animate"), 300);
    });
  }

  // konfirmasi logout (tetap)
  if (logout) {
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      const ok = confirm("Yakin mau logout?");
      if (ok) {
        alert("Berhasil logout!");
        // redirect jika perlu: window.location.href = 'login.html';
      }
    });
  }

  // --------------- THEME TOGGLE ----------------
  // Inisialisasi dari localStorage (jika ada preferensi)
  const savedTheme = localStorage.getItem("theme"); // 'light' atau 'dark'
  if (savedTheme === "light") {
    body.classList.add("light");
    if (modeToggle) {
      modeToggle.textContent = "🌞";
      modeToggle.setAttribute("aria-pressed", "true");
    }
  } else {
    // default dark: pastikan aria
    if (modeToggle) modeToggle.setAttribute("aria-pressed", "false");
  }

  // klik toggle: ubah class body + simpan preferensi
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      const isLight = body.classList.toggle("light");
      modeToggle.textContent = isLight ? "🌞" : "🌙";
      modeToggle.setAttribute("aria-pressed", isLight ? "true" : "false");
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }
})();

// Toggle dropdown profil
const profileMenu = document.getElementById("profile-menu");
profileMenu.addEventListener("click", () => {
  profileMenu.classList.toggle("active");
});

// Contoh notif badge klik
const notifBadge = document.getElementById("notif-badge");
document.querySelector(".notification").addEventListener("click", () => {
  alert("Lihat notifikasi di sini!");
  notifBadge.textContent = "0"; // reset badge
});
