const inputBerat = document.getElementById('input-berat');
const inputTinggi = document.getElementById('input-tinggi');
const btnHitung = document.getElementById('btn-hitung');
const btnReset = document.getElementById('btn-reset');
const btnTema = document.getElementById("btn-tema");

const skorBmiDisplay = document.getElementById('skor-bmi');
const keteranganDisplay = document.getElementById('keterangan');
const boxIdeal = document.getElementById('info-ideal');
const rangeIdealDisplay = document.getElementById('range-ideal');
const boxSaran = document.getElementById('box-saran');
const teksSaran = document.getElementById('teks-saran');

btnHitung.addEventListener('click', hitungBMI);
btnReset.addEventListener('click', resetCalcuator);
btnTema.addEventListener('click', toggleTheme);

function  hitungBMI() {
    const berat = parseFloat(inputBerat.value);
    const tinggiCm = parseFloat(inputTinggi.value);

    if (isNaN(berat) || isNaN(tinggiCm) || berat <= 0 || tinggiCm <=0 ) {
        alert("Mohon Dimasukan berat dan tinggi badan yang valid");
        return;
    }

    const tinggiM = tinggiCm / 100;
    const bmi = berat / (tinggiM * tinggiM);
    const bmiFixed = bmi.toFixed(1);

    skorBmiDisplay.innerText = bmiFixed;

    let kategori = ' ';
    let warna = ' ';
    let saran = ' ';

    if (bmi < 18.5) {
        kategori = 'kurang berat badan';
        warna = '#e74c3c';
        saran = 'Anda berada di kategori kurang berat badan. Tingkatkan asupan kalori dengan makanan bergizi seimbang dan konsultasikan dengan ahli gizi.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        kategori = "beran badan nornal";
        warna = '#04ff00';
        saran = 'Luar biasa! Berat badan Anda ideal. Pertahankan pola makan sehat dan rutin berolahraga untuk menjaga kondisi tubuh tetap prima.';
    } else if (bmi >= 25 && bmi <= 29.9) {
        kategori = 'kelebihan berat badan';
        warna = '#ff8400';
        saran = 'Anda masuk kategori kelebihan berat badan. Cobalah untuk lebih aktif bergerak, kurangi asupan gula berlebih, dan perhatikan porsi makan harian';
    } else {
        kategori = 'obesitas';
        warna = '#7a0606'
        saran = 'Status kesehatan Anda termasuk kategori obesitas. Sebaiknya konsultasikan dengan dokter untuk program penurunan berat badan yang aman dan tepat';
    }

    keteranganDisplay.innerText = kategori;
    keteranganDisplay.style.backgroundColor = warna;

    teksSaran.innerText = saran;
    boxSaran.style.display = 'block';

    const minIdeal = (18.5 * tinggiM * tinggiM).toFixed(1);
    const maxIdeal = (24.9 * tinggiM * tinggiM).toFixed(1);

    rangeIdealDisplay.innerText = `${minIdeal} Kg - ${maxIdeal} kg`;
    boxIdeal.style.display = 'block';
}

function resetCalcuator(){
    inputBerat.value = ' ';
    inputTinggi.value = ' ';
    skorBmiDisplay.innerText = '0.0';

    keteranganDisplay.innerText = 'Menunggu data';
    keteranganDisplay.style.backgroundColor = 'var(--text-sub)';

    boxIdeal.style.display = 'none';
    boxSaran.style.display = 'none';
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    const icon = btnTema.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        btnTema.innerHTML = '<i class="fas fa-sun"></i> Mode Terang';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        btnTema.innerHTML = '<i class="fas fa-moon"></i> Mode Gelap';
    }
}