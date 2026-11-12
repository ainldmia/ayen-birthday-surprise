const openButton = document.getElementById("openLetter");
const envelopePage = document.querySelector(".envelope-page");
const letterContent = document.getElementById("letterContent");

// Buka sampul surat dan paparkan isi surat
openButton.addEventListener("click", function () {
    envelopePage.classList.add("opened");
    letterContent.style.display = "block"; // Pastikan ia dipaparkan

    window.setTimeout(function () {
        letterContent.classList.add("visible");
        letterContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 450);
});

// Kawalan Pemain Muzik (Audio Player)
const audio = document.getElementById('myAudio');
const playBtn = document.getElementById('playBtn');
const vinylDisc = document.getElementById('vinyl-disc');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const currentTimeEl = document.getElementById('currentTime');
const durationTimeEl = document.getElementById('durationTime');

// Fungsi Play / Pause
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().catch(error => {
            console.log("Autoplay sekatan pelayar:", error);
        });
        playBtn.innerHTML = "❚❚"; // Tukar kepada ikon pause
        if (vinylDisc) vinylDisc.classList.add('playing');
        const musicRow = document.querySelector('.music-content-row');
        if (musicRow) musicRow.classList.add('playing');
    } else {
        audio.pause();
        playBtn.innerHTML = "▶"; // Tukar kepada ikon play
        if (vinylDisc) vinylDisc.classList.remove('playing');
        const musicRow = document.querySelector('.music-content-row');
        if (musicRow) musicRow.classList.remove('playing');
    }
});

// Kemaskini masa semasa lagu dimainkan
audio.addEventListener('timeupdate', () => {
    const current = audio.currentTime;
    const duration = audio.duration;
    
    if (duration) {
        const percent = (current / duration) * 100;
        progressBar.style.width = percent + '%';
        
        // Format Minit:Saat semasa
        let currentMins = Math.floor(current / 60);
        let currentSecs = Math.floor(current % 60);
        if (currentSecs < 10) currentSecs = '0' + currentSecs;
        currentTimeEl.innerText = `${currentMins}:${currentSecs}`;
        
        // Format Minit:Saat tempoh penuh
        let durationMins = Math.floor(duration / 60);
        let durationSecs = Math.floor(duration % 60);
        if (durationSecs < 10) durationSecs = '0' + durationSecs;
        durationTimeEl.innerText = `${durationMins}:${durationSecs}`;
    }
});

// Boleh klik pada bar kemajuan untuk melompat ke masa tertentu
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    if (duration) {
        audio.currentTime = (clickX / width) * duration;
    }
});

document.getElementById("nextChapterBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Elakkan link daripada refresh halaman secara kasar

    const envelopePage = document.querySelector(".envelope-page");
    const letterContent = document.getElementById("letterContent");

    // Tutup semula paparan surat jika perlu
    if (letterContent) {
        letterContent.classList.remove("visible");
    }

    if (envelopePage) {
        envelopePage.classList.remove("opened");
    }

    // Skrol automatik naik ke bahagian atas skrin dengan lancar
    window.scrollTo({ 
        top: 0, 
        behavior: "smooth" 
    });
});