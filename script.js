
let currentLang = 'eng';

function toggleLanguage() {
  currentLang = currentLang === 'eng' ? 'rus' : 'eng';

  const content = {
    eng: {
      title: "About English Abroad",
      news: "📰 News",
      programs: "🎓 Programs / Courses",
      request: "📨 Send Request",
      visas: "🛬 Visas – Tips & Guidelines",
      chat: "💬 Ask a Question",
      lastNews: "📰 Last News",
      archiveNews: "📚 Archived News"
    },
    rus: {
      title: "Об английском за границей",
      news: "📰 Новости",
      programs: "🎓 Программы / Курсы",
      request: "📨 Подать заявку",
      visas: "🛬 Визы – Советы и рекомендации",
      chat: "💬 Задать вопрос",
      lastNews: "📰 Последние новости",
      archiveNews: "📚 Архив новостей"
    }
  };

  const dict = content[currentLang];

  document.getElementById("title-main").textContent = dict.title;
  document.getElementById("btn-news").textContent = dict.news;
  document.getElementById("btn-programs").textContent = dict.programs;
  document.getElementById("btn-request").textContent = dict.request;
  document.getElementById("btn-visas").textContent = dict.visas;
  document.getElementById("btn-chat").textContent = dict.chat;
  document.getElementById("label-last-news").textContent = dict.lastNews;
  document.getElementById("label-archive-news").textContent = dict.archiveNews;
}

function showNewsSection() {
  document.getElementById('news').style.display = 'block';

  const sheetAPI = "https://script.google.com/macros/s/AKfycbzAZ-_yP8mU8mbk8vdIpDWRe-ZCIutj5_24gUTgA5W4CijDXH4pI7YgSJCfJdRsFQg/exec";
  fetch(sheetAPI)
    .then(res => res.json())
    .then(data => {
      const today = new Date().toISOString().split("T")[0];
      const lastNewsEl = document.getElementById("last-news");
      const archiveNewsEl = document.getElementById("archive-news");

      lastNewsEl.innerHTML = "";
      archiveNewsEl.innerHTML = "";

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
}
