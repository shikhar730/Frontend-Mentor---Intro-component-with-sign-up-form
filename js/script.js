'use strict';

const form = document.getElementById('form1');
const allInputs = form.querySelectorAll('input');
const error = [' cannot be empty', 'Looks like this is not an '];

allInputs.forEach((input) => {
  input.required = true;
});

const showError = function (input) {
  console.log(input);
  let this_error = input.closest('.input-field').nextElementSibling;
  let error_icon = input.nextElementSibling;

  if (input.validity.valid) {
    error_icon.classList.remove('active');
    this_error.classList.remove('active');
    input.classList.remove('invalidInput');
    this_error.textContent = '';
    return;
  }
  error_icon.classList.add('active');
  this_error.classList.add('active');
  input.classList.add('invalidInput');
  if (input.validity.valueMissing) {
    this_error.textContent = `${input.name} ${error[0]}`;
  } else if (input.validity.typeMismatch) {
    this_error.textContent = `${error[1]} ${input.name}`;
  }
};

form.addEventListener(
  'blur',
  function (event) {
    if (event.target.required === true) {
      showError(event.target);
    }
  },
  true
);
form.addEventListener('submit', function (event) {
  allInputs.forEach((input) => {
    if (!input.validity.valid) {
      showError(input);
      event.preventDefault();
    }
  });
});
