/**
 * REPOSITORY DATA STUDI KASUS PROYEK UI/UX
 * Berisi detail lengkap untuk modal interaktif setiap proyek.
 */
const caseStudies = [
  {
    tag: "PROJECT 01 • MOBILE E-COMMERCE",
    title: "Velvet Bloom",
    subtitle: "Aplikasi Belanja Perawatan Kulit Botanikal dengan Kuis Personal",
    metrics: [
      { label: "Konversi Kuis", value: "+38%" },
      { label: "Cart Drop-off", value: "-28%" },
      { label: "Skor SUS", value: "88/100" }
    ],
    problem: "Pengguna pemula sering merasa kewalahan memilih produk skincare akibat istilah bahan aktif yang terlalu teknis, menyebabkan tingginya tingkat keluar aplikasi sebelum checkout.",
    solution: "Merancang alur '3-Step Skin Quiz' yang ramah dengan ilustrasi editorial lembut, kartu perbandingan bahan yang ringkas, serta palet warna hangat yang menenangkan.",
    impact: "Dalam pengujian usability terhadap 24 partisipan, 92% pengguna berhasil menemukan produk yang sesuai dalam waktu kurang dari 90 detik."
  },
  {
    tag: "PROJECT 02 • MINDFULNESS WEB & APP",
    title: "Kala Journal",
    subtitle: "Jurnal Refleksi Harian & Pelacak Suasana Hati Tanpa Distraksi",
    metrics: [
      { label: "Retensi 30 Hari", value: "64%" },
      { label: "Durasi Sesi", value: "6.5 mnt" },
      { label: "Komponen UI", value: "48 Token" }
    ],
    problem: "Banyak aplikasi jurnal digital terasa kaku seperti aplikasi produktivitas kerja, sehingga pengguna merasa terbebani untuk menulis setiap hari.",
    solution: "Menghadirkan nuansa buku catatan editorial dengan aksen kuning hangat, prompt pertanyaan refleksi adaptif, serta grafik tren emosi mingguan yang mudah dipahami.",
    impact: "Meningkatkan konsistensi menulis harian pengguna sebesar 41% dibandingkan prototipe awal berbasis formulir standar."
  },
  {
    tag: "PROJECT 03 • HOSPITALITY & TABLET POS",
    title: "Aroma Bakery",
    subtitle: "Sistem Pemesanan Meja QR & Kasir Tablet untuk Kafe Artisan",
    metrics: [
      { label: "Waktu Antrean", value: "-45%" },
      { label: "Upsell Pastry", value: "+22%" },
      { label: "Kepuasan Staf", value: "4.9/5" }
    ],
    problem: "Antrean panjang di kasir pada jam sarapan membuat pelanggan membatalkan pesanan pendamping seperti pastry dan minuman spesial.",
    solution: "Mendesain antarmuka pemesanan visual berfoto besar dengan rekomendasi pasangan kopi-pastry otomatis serta kartu stempel loyalitas digital bergaya retro.",
    impact: "Mempercepat proses transaksi kasir dari rata-rata 2 menit 15 detik menjadi hanya 55 detik per pelanggan."
  }
];

// Status Global State
let isDeckMode = false;
let currentSlideIndex = 0;
const totalSlides = 10;

/**
 * TOGGLE MODE TAMPILAN (Mode Scroll vs Mode Slide Deck Presentasi)
 */
function toggleViewMode() {
  isDeckMode = !isDeckMode;
  const body = document.body;
  const modeText = document.getElementById('modeText');
  const modeIcon = document.getElementById('modeIcon');
  const deckControls = document.getElementById('deckControls');

  if (isDeckMode) {
    body.classList.add('deck-mode');
    modeText.textContent = 'Mode Scroll';
    modeIcon.textContent = '☰';
    deckControls.classList.remove('hidden');
    showSlide(currentSlideIndex);
  } else {
    body.classList.remove('deck-mode');
    modeText.textContent = 'Mode Slide';
    modeIcon.textContent = '◫';
    deckControls.classList.add('hidden');
    
    // Gulir halus ke slide aktif saat kembali ke mode scroll
    const targetEl = document.getElementById(`slide-${currentSlideIndex + 1}`);
    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * TAMPILKAN SLIDE TERTENTU DALAM MODE DECK
 * @param {number} index - Nomor indeks slide (0 - 9)
 */
function showSlide(index) {
  currentSlideIndex = (index + totalSlides) % totalSlides;
  const slides = document.querySelectorAll('.portfolio-slide');
  
  slides.forEach((slide, idx) => {
    if (idx === currentSlideIndex) {
      slide.classList.add('active-slide');
      slide.scrollTop = 0;
    } else {
      slide.classList.remove('active-slide');
    }
  });

  document.getElementById('currentSlideNum').textContent = String(currentSlideIndex + 1).padStart(2, '0');
}

/**
 * NAVIGASI LANGSUNG KE SLIDE TERTENTU
 * @param {number} index 
 */
function goToSlide(index) {
  currentSlideIndex = index;
  if (isDeckMode) {
    showSlide(index);
  }
}

/**
 * PINDAH KE SLIDE BERIKUTNYA
 */
function nextSlide() {
  showSlide(currentSlideIndex + 1);
}

/**
 * PINDAH KE SLIDE SEBELUMNYA
 */
function prevSlide() {
  showSlide(currentSlideIndex - 1);
}

/**
 * NAVIGASI KEYBOARD PANAH SAAT DALAM MODE SLIDE DECK
 */
document.addEventListener('keydown', (e) => {
  if (!isDeckMode) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    nextSlide();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    prevSlide();
  }
});

/**
 * BUKA MODAL DETAIL STUDI KASUS PROYEK
 * @param {number} idx - Indeks proyek (0, 1, atau 2)
 */
function openCaseStudy(idx) {
  const data = caseStudies[idx];
  if (!data) return;

  document.getElementById('modalTag').textContent = data.tag;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalSubtitle').textContent = data.subtitle;
  document.getElementById('modalProblem').textContent = data.problem;
  document.getElementById('modalSolution').textContent = data.solution;
  document.getElementById('modalImpact').textContent = data.impact;

  const metricsContainer = document.getElementById('modalMetrics');
  metricsContainer.innerHTML = data.metrics.map(m => `
    <div class="metric-card">
      <div class="metric-val">${m.value}</div>
      <div class="metric-lbl">${m.label}</div>
    </div>
  `).join('');

  document.getElementById('caseStudyModal').classList.remove('hidden');
}

/**
 * TUTUP MODAL STUDI KASUS
 */
function closeCaseStudy() {
  document.getElementById('caseStudyModal').classList.add('hidden');
}

// Tutup modal saat mengklik area luar (backdrop)
document.getElementById('caseStudyModal').addEventListener('click', (e) => {
  if (e.target.id === 'caseStudyModal') closeCaseStudy();
});

/**
 * BUKA / TUTUP DRAWER KUSTOMISASI PROFIL (LIVE MOCKUP EDITOR)
 */
function toggleCustomizeDrawer() {
  const drawer = document.getElementById('customizeDrawer');
  drawer.classList.toggle('hidden');
}

/**
 * UPDATE DATA PROFIL SECARA REAL-TIME PADA HALAMAN
 */
function updateProfileData() {
  const fullName = document.getElementById('inputName').value.trim() || 'Clara Evangelin';
  const firstName = document.getElementById('inputFirstName').value.trim() || 'Clara';
  const role = document.getElementById('inputRole').value.trim() || 'UI/UX DESIGNER';
  const email = document.getElementById('inputEmail').value.trim() || 'HELLO@CLARAEVANGELIN.DESIGN';
  const bio = document.getElementById('inputBio').value.trim();

  document.getElementById('navBrandText').textContent = fullName.toUpperCase();
  document.getElementById('heroBadgeText').textContent = `BY ${fullName.toUpperCase()} — ${role.toUpperCase()}`;
  document.getElementById('fullNameCard').textContent = fullName;
  document.getElementById('roleCard').textContent = role;
  document.getElementById('aboutGreeting').innerHTML = `Hello,<br>I'm ${firstName}!`;
  document.getElementById('emailDisplayText').textContent = email.toUpperCase();
  document.getElementById('footerName').textContent = `${fullName.toUpperCase()} — ${role.toUpperCase()}`;
  
  const domainClean = email.includes('@') ? email.split('@')[1] : `${firstName.toUpperCase()}.DESIGN`;
  document.getElementById('websiteDomainText').textContent = `${domainClean} ↓`;

  if (bio) {
    document.getElementById('bioParagraph1').textContent = bio;
  }
}

/**
 * RESET DATA PROFIL KE DEFAULT AWAL
 */
function resetProfileData() {
  document.getElementById('inputName').value = 'Clara Evangelin';
  document.getElementById('inputFirstName').value = 'Clara';
  document.getElementById('inputRole').value = 'UI/UX DESIGNER';
  document.getElementById('inputEmail').value = 'HELLO@CLARAEVANGELIN.DESIGN';
  document.getElementById('inputBio').value = 'Saya seorang UI/UX Designer yang berfokus menciptakan pengalaman digital yang intuitif, hangat, dan berkesan. Karya saya menjembatani riset pengguna mendalam, arsitektur informasi yang rapi, serta arah visual editorial yang berkarakter.';
  updateProfileData();
}

/**
 * SALIN ALAMAT EMAIL KE CLIPBOARD (KOMPATIBEL DENGAN BERBAGAI PERANGKAT)
 */
function copyEmailAddress() {
  const emailText = document.getElementById('emailDisplayText').textContent;
  const tempInput = document.createElement('textarea');
  tempInput.value = emailText;
  document.body.appendChild(tempInput);
  tempInput.select();
  
  try {
    document.execCommand('copy');
    const toast = document.getElementById('copyToast');
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2800);
  } catch (err) {
    console.error('Gagal menyalin email:', err);
  }
  
  document.body.removeChild(tempInput);
}