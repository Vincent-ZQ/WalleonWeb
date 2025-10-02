document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const captcha = document.getElementById("captcha");
  if (!captcha.checked) {
    alert("Please verify you're not a robot.");
    return;
  }
  alert("Dear customer, the submit contact form is currently under maintainance. We will get back to you as soon as we could.");
});

function submitContactInfo() {
    alert("Dear customer, the submit contact form is currently under maintainance. We will get back to you as soon as we could.")
}