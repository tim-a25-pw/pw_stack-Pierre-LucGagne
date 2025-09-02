import Scrolly from './components/Scrolly.js';
import Carousel from './components/Carousel.js';
import Header from './components/Header.js';
import Youtube from './components/Youtube.js';
import Accordion from './components/Accordion.js';
import Form from './components/Form.js';

export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      Scrolly,
      Carousel,
      Header,
      Youtube,
      Accordion,
      Form,
    };
    this.init();
  }

  init() {
    // Scrolly
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
        this.componentInstances.push(instance);
      } else {
        console.log(`la composante ${componentName} n'existe pas`);
      }
    }
  }
}
