// Elementos del DOM
// Error corregido: Se cambió 'getElementByID' por 'getElementById' (la D era mayúscula)
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const uppercaseCheckbox = document.getElementById("includeUppercase");
const numbersCheckbox = document.getElementById("includeNumbers");
const symbolsCheckbox = document.getElementById("includeSymbols");
const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateForm = document.getElementById("optionsForm");
const feedbackMsg = document.getElementById("feedbackMsg");

// Caracteres base
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"; // Error: había hecho todo en una misma variable y lo modifique por las opciones
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

// Actualizar valor de longitud
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Función principal para generar contraseña
// Error corregido: Se cambió 'lenght' por 'length' en el parámetro de la función
function generatePassword(length, useUppercase, useNumbers, useSymbols) {
  // Error corregido: Se inicializaba 'charSet' en vez de 'charset' (error de mayúscula)
  let charset = lowercaseChars;
  if (useUppercase) charset += uppercaseChars;
  if (useNumbers) charset += numberChars;
  if (useSymbols) charset += symbolChars; // Error: Tuve que agregar las otras variables por la modificar

  if (!charset) return "";

  let password = "";
  // Error corregido: Se cambió 'Math.random * charset.lenght' por 'Math.random() * charset.length'
  // (faltaban los paréntesis en random y había error de ortografía en length)
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

// Evento de generación
generateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const length = parseInt(lengthSlider.value);
  const useUppercase = uppercaseCheckbox.checked;
  const useNumbers = numbersCheckbox.checked;
  const useSymbols = symbolsCheckbox.checked;

  if (!useUppercase && !useNumbers && !useSymbols && !lowercaseChars) {
    feedbackMsg.textContent = "⚠️ Seleccioná al menos una opción.";
    return;
  }

  const newPassword = generatePassword(length, useUppercase, useNumbers, useSymbols);
  
  if (newPassword) {
    passwordInput.value = newPassword;
    feedbackMsg.textContent = "✅ Contraseña generada correctamente.";
  } else {
    feedbackMsg.textContent = "⚠️ No se pudo generar la contraseña.";
  }
});

// Copiar al portapapeles
// Error corregido: Se agregó el catch para manejar errores al copiar al portapapeles
copyBtn.addEventListener("click", () => {
  if (!passwordInput.value) return;
  
  navigator.clipboard.writeText(passwordInput.value).then(() => {
    feedbackMsg.textContent = "📋 ¡Contraseña copiada al portapapeles!";
  }).catch(() => {
    feedbackMsg.textContent = "❌ Error al copiar la contraseña";
  });
});
