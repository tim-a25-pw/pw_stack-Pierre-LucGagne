export default class Form {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.element = element;
    this.formElement = this.element.elements;
    this.init();
  }

  init() {
    this.element.setAttribute('novalidate', '');

    for (let i = 0; i < this.formElement.length; i++) {
      const input = this.formElement[i];

      if (input.required) {
        input.addEventListener('input', () => this.validateInput(input));
      }
    }

    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      // Réussi
      console.log('Réussi');
      this.showConfirmation();
    } else {
      // Échec
      console.log('Échec');
    }
  }

  /**
   * Méthode de validation du formulaire
   * @return {boolean} Statut de la validation
   */
  validate() {
    let isValid = true;

    for (let i = 0; i < this.formElement.length; i++) {
      const input = this.formElement[i];
      if (input.required && !this.validateInput(input)) {
        isValid = false;
      }
    }

    return isValid;
  }

  /**
   * Valide un champ de formulaire
   * @param {Event|HTMLInputElement} event Événement d'entrée ou champ de formulaire
   * @return {boolean} Statut de validation du champ de formulaire
   */
  validateInput(event) {
    const input = event.currentTarget || event;

    if (input.validity.valid) {
      this.removeError(input);
    } else {
      this.addError(input);
    }

    return input.validity.valid;
  }

  addError(input) {
    const container = input.closest('.input');
    container.classList.add('error');
  }

  removeError(input) {
    const container = input.closest('.input');
    container.classList.remove('error');
  }

  showConfirmation() {
    this.element.classList.add('is-sent');
  }

  hideConfirmation() {
    this.element.classList.remove('is-sent');
  }
}
