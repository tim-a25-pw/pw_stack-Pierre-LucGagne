export default class Accordion {
  constructor(element) {
    this.element = element;
    this.titles = this.element.querySelectorAll('.accordion__title');

    this.init();
  }

  init() {
    for (let i = 0; i < this.titles.length; i++) {
      const title = this.titles[i];
      title.addEventListener('click', this.toggleAccordion.bind(this));
    }
  }

  toggleAccordion(event) {
    const title = event.currentTarget;
    const container = title.closest('.accordion__container');

    if (container.classList.contains('is-active')) {
      container.classList.remove('is-active');
    } else {
      this.closeAllAccordions();
      container.classList.add('is-active');
    }
  }

  closeAllAccordions() {
    const activeContainers = this.element.querySelectorAll(
      '.accordion__container.is-active'
    );
    for (let i = 0; i < activeContainers.length; i++) {
      const container = activeContainers[i];
      container.classList.remove('is-active');
    }
  }
}
