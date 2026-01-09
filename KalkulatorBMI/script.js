/* 
   1. EFEK SCRAMBLE & OPENING WELCOME
    */
function scrambleEffect(element) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
  const originalText = element.innerText;
  let iteration = 0;
  const interval = setInterval(() => {
    element.innerText = originalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) return originalText[index];
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join("");
    if (iteration >= originalText.length) clearInterval(interval);
    iteration += 1 / 3;
  }, 30);
}

window.addEventListener("DOMContentLoaded", () => {
  const textTarget = document.getElementById("scramble-text");
  if (textTarget) scrambleEffect(textTarget);
  const welcomeScreen = document.getElementById("welcome-screen");
  setTimeout(() => {
    if (welcomeScreen) {
      welcomeScreen.classList.add("fade-out-welcome");
      setTimeout(() => {
        welcomeScreen.remove();
      }, 800);
    }
  }, 3000);
});

/* 
   2. LOGIKA NAVIGASI & TEMA SINKRON
   */
const landingPage = document.getElementById("landing-page");
const btnMasuk = document.getElementById("btn-masuk");
const btnKeluar = document.getElementById("btn-keluar");
const btnKembali = document.getElementById("btn-kembali");
const btnInfoBuka = document.getElementById("btn-info-buka");
const modalInfo = document.getElementById("modal-info");
const btnCloseModal = document.querySelector(".close-modal");
const btnTema = document.getElementById("btn-tema");
const btnTemaLanding = document.getElementById("btn-tema-landing");

// Masuk ke Kalkulator
if (btnMasuk) {
  btnMasuk.addEventListener("click", () => {
    landingPage.style.opacity = "0";
    landingPage.style.pointerEvents = "none";
    setTimeout(() => {
      landingPage.style.display = "none";
    }, 500);
  });
}

// Kembali ke Landing Page
if (btnKembali) {
  btnKembali.addEventListener("click", () => {
    landingPage.style.display = "flex";
    setTimeout(() => {
      landingPage.style.opacity = "1";
      landingPage.style.pointerEvents = "auto";
    }, 10);
  });
}

// Keluar (Exit)
if (btnKeluar) {
  btnKeluar.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      window.location.href = "about:blank";
    }
  });
}

// Sinkronisasi Tema Global
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  // Update ikon di semua tombol tema
  const allIcons = document.querySelectorAll(".fa-moon, .fa-sun");
  allIcons.forEach((icon) => {
    if (isDark) icon.classList.replace("fa-moon", "fa-sun");
    else icon.classList.replace("fa-sun", "fa-moon");
  });

  // Update teks tombol tema kalkulator
  if (btnTema) {
    btnTema.innerHTML = isDark
      ? '<i class="fas fa-sun"></i> Mode Terang'
      : '<i class="fas fa-moon"></i> Mode Gelap';
  }
}

if (btnTema) btnTema.addEventListener("click", toggleTheme);
if (btnTemaLanding) btnTemaLanding.addEventListener("click", toggleTheme);

// Modal Info
if (btnInfoBuka)
  btnInfoBuka.addEventListener("click", () => {
    modalInfo.style.display = "flex";
  });
if (btnCloseModal)
  btnCloseModal.addEventListener("click", () => {
    modalInfo.style.display = "none";
  });
window.addEventListener("click", (e) => {
  if (e.target == modalInfo) modalInfo.style.display = "none";
});

/* 3. LOGIKA KALKULATOR (HITUNG & RESET)*/

const inputBerat = document.getElementById("input-berat");
const inputTinggi = document.getElementById("input-tinggi");
const btnHitung = document.getElementById("btn-hitung");
const btnReset = document.getElementById("btn-reset");
const skorBmiDisplay = document.getElementById("skor-bmi");
const keteranganDisplay = document.getElementById("keterangan");
const boxIdeal = document.getElementById("info-ideal");
const rangeIdealDisplay = document.getElementById("range-ideal");
const boxSaran = document.getElementById("box-saran");
const teksSaran = document.getElementById("teks-saran");

if (btnHitung) btnHitung.addEventListener("click", hitungBMI);
if (btnReset) btnReset.addEventListener("click", resetCalcuator);

function hitungBMI() {
  const berat = parseFloat(inputBerat.value);
  const tinggiCm = parseFloat(inputTinggi.value);
  
  if (isNaN(berat) || isNaN(tinggiCm) || berat <= 0 || tinggiCm <= 0) {
    alert("Mohon Dimasukan berat dan tinggi badan yang valid");
    return;
  }

  const tinggiM = tinggiCm / 100;
  const bmi = berat / (tinggiM * tinggiM);
  const bmiFinal = parseFloat(bmi.toFixed(1)); 

  // --- ANIMASI COUNT UP (Angka Berjalan) ---
  let startValue = 0;
  const duration = 1500; // Durasi animasi 1.5 detik
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Efek easeOutQuart agar melambat di akhir
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    const currentNum = (easeProgress * bmiFinal).toFixed(1);
    
    skorBmiDisplay.innerText = currentNum;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }
  requestAnimationFrame(updateNumber);

  // --- LOGIKA WARNA & TEKS  ---
  let kategori = "", warna = "", saran = "";

  if (bmi < 18.5) {
    kategori = "kurang berat badan";
    warna = "#e74c3c";
    saran = "Anda berada di kategori kurang berat badan. Tingkatkan asupan kalori dengan makanan bergizi seimbang.";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    kategori = "berat badan normal";
    warna = "#04ff00";
    saran = "Luar biasa! Berat badan Anda ideal. Pertahankan pola makan sehat.";
  } else if (bmi >= 25 && bmi <= 29.9) {
    kategori = "kelebihan berat badan";
    warna = "#ff8400";
  } else {
    kategori = "obesitas";
    warna = "#7a0606";
    saran = "Status kesehatan Anda termasuk kategori obesitas. Sebaiknya konsultasikan dengan dokter.";
  }

  // Update Tampilan
  keteranganDisplay.innerText = kategori;
  keteranganDisplay.style.backgroundColor = warna;
  keteranganDisplay.classList.add("shiny-text"); // Tambahkan efek Shiny dari CSS

  teksSaran.innerText = saran;
  boxSaran.style.display = "block";
  
  const minIdeal = (18.5 * tinggiM * tinggiM).toFixed(1);
  const maxIdeal = (24.9 * tinggiM * tinggiM).toFixed(1);
  rangeIdealDisplay.innerText = `${minIdeal} Kg - ${maxIdeal} kg`;
  boxIdeal.style.display = "block";
}

// --- FUNGSI RESET KALKULATOR ---
function resetCalcuator() {
  // Reset input
  inputBerat.value = "";
  inputTinggi.value = "";
  
  // Reset tampilan skor dan kategori
  skorBmiDisplay.innerText = "0.0";
  keteranganDisplay.innerText = "Menunggu Data...";
  keteranganDisplay.style.backgroundColor = "var(--text-sub)";
  keteranganDisplay.classList.remove("shiny-text");

  // Sembunyikan box saran dan ideal
  boxSaran.style.display = "none";
  boxIdeal.style.display = "none";
  teksSaran.innerText = "";
  rangeIdealDisplay.innerText = "-";
}