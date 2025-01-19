let aktivitasList = [];

function tambahAktivitas() {
    const kategori = document.getElementById('kategori').value;
    const aktivitas = document.getElementById('aktivitas').value;

    if (!aktivitas) {
        alert('⚠️ Masukkan aktivitas!');
        return;
    }

    const kategoriEmoji = {
        "nonton video": "🎥",
        "baca materi": "📚",
        "latihan soal": "✏️",
        "tryout": "📝",
        "istirahat": "😴"
    };

    const aktivitasItem = `
        <div class="activity-item">
            ${kategoriEmoji[kategori]} ${aktivitas}
        </div>
    `;

    aktivitasList.push(`${kategoriEmoji[kategori]} ${aktivitas}`);
    document.getElementById('aktivitasList').innerHTML += aktivitasItem;
    document.getElementById('aktivitas').value = '';
}

function buatLaporan() {
    const tanggal = document.getElementById('tanggal').value;
    const hariKe = document.getElementById('hariKe').value;
    const durasi = document.getElementById('durasi').value;
    const evaluasi = document.getElementById('evaluasi').value;

    if (!tanggal || !hariKe || aktivitasList.length === 0 || !durasi) {
        alert('⚠️ Pastikan semua data telah diisi!');
        return;
    }

    const emojiCollections = {
        aktivitas: {
            '🎥': 'Materi UTBK',
            '📚': 'Teori Ujian',
            '✏️': 'Latihan Soal',
            '📝': 'Simulasi Ujian',
            '😴': 'Istirahat Produktif'
        },
      motivasi: [
          // Motivasi untuk waktu belajar singkat (< 1 jam)
          [
              '🌱 Aku mulai, itu sudah luar biasa',
              '🚶 Setiap langkah kecil berarti',
              '💡 Konsistensi adalah kekuatanku',
              '🌟 Kualitas, bukan kuantitas'
          ],
          // Motivasi untuk waktu belajar sedang (1-2 jam)
          [
              '🌿 Aku terus berkembang',
              '💪 Fokus adalah kunci produktivitasku',
              '🚀 Aku mampu mempersiapkan diriku',
              '📈 Progresku adalah bukti usahaku'
          ],
          // Motivasi untuk waktu belajar panjang (2-3 jam)
          [
              '🌳 Dedikasiku membuatku kuat',
              '🏆 Aku membangun keunggulanku sendiri',
              '💎 Zona produktifku adalah milikku',
              '✨ Komitmen membentuk diriku'
          ],
          // Motivasi untuk waktu belajar sangat panjang (> 3 jam)
          [
              '🚀 Aku adalah master perjalananku',
              '💯 Aku menciptakan level belajarku sendiri',
              '🌟 Aku adalah calon juara',
              '🏅 Performaku adalah refleksi usahaku'
          ]
      ],
        evaluasiEmoji: [
          '💡', '🔍', '🧠', '📊', '🌱', '🚀', '💪', '✨', 
          '🌟', '📈', '🎯', '🌈', '💭', '🔬', '📝'
        ]
    };

    function getRandomFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function calculateLearningIntensity(duration) {
        // Konversi format desimal ke menit
        const [jam, menit] = duration.split('.').map(Number);
        const totalMenit = jam * 60 + menit;

        if (totalMenit < 60) {
            return {
                emoji: '🌱',
                label: 'Tahap Awal',
                motivasiIndex: 0
            };
        }
        if (totalMenit < 120) {
            return {
                emoji: '🌿',
                label: 'Berkembang',
                motivasiIndex: 1
            };
        }
        if (totalMenit < 180) {
            return {
                emoji: '🌳',
                label: 'Konsisten',
                motivasiIndex: 2
            };
        }
        return {
            emoji: '🏆',
            label: 'Produktif',
            motivasiIndex: 3
        };
    }

    function formatDurasi(duration) {
        const [jam, menit] = duration.split('.').map(Number);
        return `${jam > 0 ? `${jam} jam ` : ''}${menit} menit`;
    }

    const aktivitasString = aktivitasList.map((aktivitas, index) => {
        const emoji = aktivitas.split(' ')[0];
        const deskripsi = aktivitas.replace(emoji, '').trim();
        const kategori = emojiCollections.aktivitas[emoji];
        return `${index + 1}. ${emoji} ${deskripsi} (${kategori})`;
    }).join('\n');

  const evaluasiList = evaluasi ? 
  evaluasi.split('\n').map((point, index) => {
      const evaluasiEmoji = getRandomFromArray(emojiCollections.evaluasiEmoji);
      return `${index + 1}. ${evaluasiEmoji} ${point.trim()}`;
  }).join('\n') : '';

    const learningIntensity = calculateLearningIntensity(durasi);
    const motivasi = getRandomFromArray(emojiCollections.motivasi[learningIntensity.motivasiIndex]);

    const laporan = `🌟 Jurnal Belajar UTBK #${hariKe} 📖

📅 Tanggal: ${tanggal}

🎯 Aktivitas Hari Ini:
${aktivitasString}

⏰ Durasi: ${formatDurasi(durasi)} (${learningIntensity.label})

✍️ Evaluasi:
${evaluasiList}

${motivasi}

#MenghitungHari #JourneyOfLearning`;

    document.getElementById('previewUmum').innerText = laporan;
    document.getElementById('laporan').style.display = 'block';

    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(laporan)}`;
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(laporan)}`;

    document.getElementById('whatsappLink').href = whatsappLink;
    document.getElementById('twitterLink').href = twitterLink;
}
