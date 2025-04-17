const translations = {
  ru: {
    title: "Об английском за границей",
    header: "Об английском за границей",
    programs: "🎓 Программы / Курсы",
    apply: "📨 Подать заявку",
    ask: "💬 Задать вопрос",
    form_title: "Подать заявку",
    name_label: "Имя:<br />",
    email_label: "Электронная почта:<br />",
    phone_label: "Телефон (WhatsApp, Telegram):<br />",
    country_label: "Страна подачи заявки:<br />",
    submit_btn: "Отправить"
  },
  en: {
    title: "About English Abroad",
    header: "About English Abroad",
    programs: "🎓 Programs / Courses",
    apply: "📨 Apply",
    ask: "💬 Ask a Question",
    form_title: "Apply",
    name_label: "Name:<br />",
    email_label: "Email:<br />",
    phone_label: "Phone (WhatsApp, Telegram):<br />",
    country_label: "Application Country:<br />",
    submit_btn: "Submit"
  }
};

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  const nodes = document.querySelectorAll("[data-i18n]");
  nodes.forEach((node) => {
    const key = node.getAttribute("data-i18n");
    node.innerHTML = translations[lang][key];
  });
  document.getElementById("lang-toggle").textContent = lang === "ru" ? "EN" : "RU";
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  const current = localStorage.getItem("lang") || "ru";
  const next = current === "ru" ? "en" : "ru";
  setLanguage(next);
});

window.addEventListener("DOMContentLoaded", () => {
  setLanguage(localStorage.getItem("lang") || "ru");
});
