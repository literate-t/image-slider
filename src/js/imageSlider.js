export default class ImageSlider {
  #currentPosition = 0;

  #slideNumber = 0;

  #slideWidth = 0;

  constructor() {
    this.assignElement();
    this.addEvent();
    this.init();
    this.createIndicator();
    this.setIndicator(this.#currentPosition);
  }

  assignElement() {
    this.sliderWrapElement = document.getElementById('slider-wrap');
    this.sliderListElement = this.sliderWrapElement.querySelector('#slider');
    this.nextBtnElement = this.sliderWrapElement.querySelector('#next');
    this.prevBtnElement = this.sliderWrapElement.querySelector('#previous');
    this.inticatorWrapElement =
      this.sliderWrapElement.querySelector('#indicator-wrap');
  }

  init() {
    this.#slideNumber = this.sliderListElement.querySelectorAll('li').length;
    this.#slideWidth = this.sliderWrapElement.clientWidth;
    this.sliderListElement.style.width = `${
      this.#slideNumber * this.#slideWidth
    }px`;
  }

  addEvent() {
    this.nextBtnElement.addEventListener('click', this.moveToRight.bind(this));
    this.prevBtnElement.addEventListener('click', this.moveToLeft.bind(this));
    this.inticatorWrapElement.addEventListener(
      'click',
      this.moveInticator.bind(this),
    );
  }

  moveToRight() {
    if (this.#slideNumber - 1 <= this.#currentPosition) {
      return;
    }
    this.#currentPosition += 1;
    const offset = this.#slideWidth * this.#currentPosition * -1;
    this.sliderListElement.style.left = `${offset}px`;
    this.setIndicator(this.#currentPosition);
  }

  moveToLeft() {
    if (this.#currentPosition <= 0) {
      return;
    }
    this.#currentPosition -= 1;
    const offset = this.#slideWidth * this.#currentPosition * -1;
    this.sliderListElement.style.left = `${offset}px`;
    this.setIndicator(this.#currentPosition);
  }

  moveInticator(event) {
    const dom = event.target;
    const index = dom.dataset?.index;
    this.setIndicator(parseInt(index, 10));
    this.moveSlide(index);
  }

  moveSlide(value) {
    const offset = this.#slideWidth * value * -1;
    this.sliderListElement.style.left = `${offset}px`;
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideNumber; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.append(li);
    }
    this.inticatorWrapElement.querySelector('ul').append(docFragment);
  }

  setIndicator(value) {
    this.inticatorWrapElement
      .querySelector('li.active')
      ?.classList.remove('active');
    const current = this.inticatorWrapElement.querySelector(
      `li:nth-child(${value + 1})`,
    );
    current?.classList.add('active');
  }
}
