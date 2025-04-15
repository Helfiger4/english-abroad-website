
function toggleLanguage() {
  const eng = document.querySelectorAll('.lang-eng');
  const rus = document.querySelectorAll('.lang-rus');
  eng.forEach(el => el.style.display = el.style.display === 'none' ? 'block' : 'none');
  rus.forEach(el => el.style.display === 'none' ? 'block' : 'none');
}

function showNewsSection() {
  document.getElementById('news').style.display = 'block';
}

const sheetAPI = "https://script.google.com/macros/s/AKfycbzAZ-_yP8mU8mbk8vdIpDWRe-ZCIutj5_24gUTgA5W4CijDXH4pI7YgSJCfJdRsFQg/exec";

fetch(sheetAPI)
  .then(res => res.json())
  .then(data => {
    const today = new Date().toISOString().split("T")[0];
    const lastNewsEl = document.getElementById("last-news");
    const archiveNewsEl = document.getElementById("archive-news");

    const todayItems = data.filter(item => item.date === today);
    const pastItems = data.filter(item => item.date !== today);

    todayItems.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.url}" target="_blank">📰 ${item.title}</a>`;
      lastNewsEl.appendChild(li);
    });

    pastItems.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.url}" target="_blank">📚 ${item.title} (${item.date})</a>`;
      archiveNewsEl.appendChild(li);
    });
  })
  .catch(err => {
    console.error("Failed to load news:", err);
  });
