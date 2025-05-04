const pertanyaanData = [
    {
      judul: "cindyy aku minta maaf yaa",
      teks: "kamu maafin aku ngga?",
      opsi: ["iya, aku maafin", "belum, pikir-pikir dulu", "gamau maafin"]
    },
    {
      judul: "sayangg, maaf ya aku ketiduran terus",
      teks: "matanya oto sayangg, maafin yaa??",
      opsi: ["oke, dimaafin", "nanti aku pikirin lagi", "ganti aja mata mu"]
    },
    {
      judul: "nanti matanya aku ganti dehh",
      teks: "masih mau ngobrol kayak biasa ngga?",
      opsi: ["mau banget", "mau aja", "gamau"]
    }
  ];
  
  let indeks = 0;
  
  function tampilkanPertanyaan() {
    if (indeks >= pertanyaanData.length) {
      document.querySelector('.choices').style.display = 'none';
      document.getElementById('thanks').classList.remove('hidden');
      return;
    }
  
    const data = pertanyaanData[indeks];
    document.getElementById('judul').textContent = data.judul;
    document.getElementById('pertanyaan').textContent = data.teks;
  
    const pilihan = document.getElementById('pilihan');
    pilihan.innerHTML = '';
  
    data.opsi.forEach((opsi) => {
      const tombol = document.createElement('button');
      tombol.textContent = opsi;
      tombol.onclick = () => {
        simpanJawaban(indeks, opsi);
        indeks++;
        tampilkanPertanyaan();
      };
      pilihan.appendChild(tombol);
    });
  }
  
  function simpanJawaban(nomor, jawaban) {
    localStorage.setItem(`jawaban${nomor+1}`, jawaban);
        if (nomor === 2) {
          // Kirim ke Google Sheets setelah pertanyaan 3 dijawab
          const jawaban1 = localStorage.getItem('jawaban1');
          const jawaban2 = localStorage.getItem('jawaban2');
          const jawaban3 = localStorage.getItem('jawaban3');
      
          const url = 'https://script.google.com/macros/s/AKfycbwkeXRD_kGwYZQWXZnXYiSa6jD_BKuhn-pf42v1p7__/dev';
          const payload = {
            jawaban1: jawaban1,
            jawaban2: jawaban2,
            jawaban3: jawaban3
          };
      
          const options = {
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            payload: payload
          };
      
          UrlFetchApp.fetch(url, options);
        }
      }
      
  
  tampilkanPertanyaan();
  