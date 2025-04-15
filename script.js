
let lang = 'eng';

function toggleLanguage() {
  lang = lang === 'eng' ? 'rus' : 'eng';

  const dictionary = {
    eng: {
      title: "About English Abroad",
      btnNews: "📰 News",
      btnPrograms: "🎓 Programs / Courses",
      btnRequest: "📨 Send Request",
      btnVisas: "🛬 Visas – Tips & Guidelines",
      btnChat: "💬 Ask a Question",
      lastNews: "📰 Last News",
      archiveNews: "📚 Archived News"
    },
    rus: {
      title: "Об английском за границей",
      btnNews: "📰 Новости",
      btnPrograms: "🎓 Программы / Курсы",
      btnRequest: "📨 Подать заявку",
      btnVisas: "🛬 Визы – Советы и рекомендации",
      btnChat: "💬 Задать вопрос",
      lastNews: "📰 Последние новости",
      archiveNews: "📚 Архив новостей"
    }
  };

  const dict = dictionary[lang];

  document.getElementById("title-main").textContent = dict.title;
  document.getElementById("btn-news").textContent = dict.btnNews;
  document.getElementById("btn-programs").textContent = dict.btnPrograms;
  document.getElementById("btn-request").textContent = dict.btnRequest;
  document.getElementById("btn-visas").textContent = dict.btnVisas;
  document.getElementById("btn-chat").textContent = dict.btnChat;
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
