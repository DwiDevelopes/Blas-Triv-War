// Ambil elemen tombol
const startBtn = document.getElementById('startBtn');
const settingsBtn = document.getElementById('settingsBtn');
const exitBtn = document.getElementById('exitBtn');

// Ambil elemen audio
const clickSound = document.getElementById('clickSound');

// Fungsi untuk memainkan suara klik
function playClickSound() {
  clickSound.currentTime = 0; // Reset suara agar bisa diputar dari awal
  clickSound.play(); // Mainkan suara
}

// Tambahkan event listener ke tombol-tombol
startBtn.addEventListener('click', function() {
  playClickSound();
    window.location.href = 'Pilih_game.html'; // Pergi ke halaman pilih game
    playClickSound();
  // Logic untuk memulai game
});

settingsBtn.addEventListener('click', function() {
  playClickSound();
  window.location.href = 'Game_info.html';
  playClickSound();
  // Logic untuk pengaturan multiplayer
});

exitBtn.addEventListener('click', function() {
  playClickSound();
    window.close(); // Tutup aplikasi
    playClickSound();
  // Logic untuk keluar dari game
});
