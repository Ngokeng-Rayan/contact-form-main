document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".container");
  const inputs = document.querySelectorAll("input[type='text'], textarea");
  const radios = document.querySelectorAll("input[name='query-type']");
  const checkbox = document.querySelector("#consent");
  const errors = document.querySelectorAll(".error");
  const submitBtn = document.querySelector(".submit-bouton");

  // 🔹 Création du toast de succès
  const toast = document.createElement("div");
  toast.classList.add("toast-success");
  toast.innerHTML = `
    <img src="./assets/images/icon-success-check.svg" alt="success icon">
    <div>
      <p class="toast-title">Message Sent!</p>
      <p class="toast-msg">Thanks for completing the form. We'll be in touch soon!</p>
    </div>
  `;
  document.body.appendChild(toast);

  // 🔹 Validation au clic
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let valid = true;

    // Réinitialiser les erreurs
    errors.forEach((error) => (error.textContent = ""));
    inputs.forEach((input) => input.classList.remove("error-border"));

    // Vérification des champs texte
    const firstName = document.querySelector("#firstname");
    const lastName = document.querySelector("#lastname");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    if (firstName.value.trim() === "") {
      showError(firstName, "This field is required");
      valid = false;
    }

    if (lastName.value.trim() === "") {
      showError(lastName, "This field is required");
      valid = false;
    }

    if (email.value.trim() === "") {
      showError(email, "This field is required");
      valid = false;
    } else if (!validateEmail(email.value.trim())) {
      showError(email, "Please enter a valid email address");
      valid = false;
    }

    const selectedRadio = [...radios].some((radio) => radio.checked);
    if (!selectedRadio) {
      showError(radios[0].closest(".names"), "Please select a query type");
      valid = false;
    }

    if (message.value.trim() === "") {
      showError(message, "This field is required");
      valid = false;
    }

    if (!checkbox.checked) {
      showError(checkbox.closest(".every"), "To submit this form, please consent to being contacted");
      valid = false;
    }

    // 🔹 Si tout est valide
    if (valid) {
      showToast();
      form.reset();
    }
  });

  // Fonction pour afficher les erreurs
  function showError(element, message) {
    const parent = element.closest(".names") || element.closest(".every");
    const errorField = parent.querySelector(".error");
    if (errorField) {
      errorField.textContent = message;
    }
    element.classList.add("error-border");
  }

  // Vérifie email valide
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  // 🔹 Afficher le toast de succès
  function showToast() {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
});
