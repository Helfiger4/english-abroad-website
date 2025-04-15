
document.getElementById("application-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    country: form.country.value
  };

  fetch("https://script.google.com/macros/s/AKfycby4ReZYe8CDvmWDkOtqvOjCqrO0Y0oydUHC0vuLwyPp_RdGbyX0XVlr_npHDDJWRs8/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(() => {
    document.getElementById("success-message").style.display = "block";
    form.reset();
  })
  .catch(err => alert("Ошибка отправки: " + err));
});
