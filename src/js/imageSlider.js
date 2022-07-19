export default class ImageSlider {
  #currentPosition = 0;

  #slideNumber = 0;

  #slideWidth = 0;

  #intervalId = 0;

  sliderWrapElement;

  sliderListElement;

  nextBtnElement;

  prevBtnElement;

  inticatorWrapElement;

  controlWrapElement;

  constructor() {
    this.assignElement();
    this.addEvent();
    this.init();
    this.createIndicator();
    this.setIndicator(this.#currentPosition);
    this.initAutoPlay();
  }

  assignElement() {
    this.sliderWrapElement = document.getElementById('slider-wrap');
    this.sliderListElement = this.sliderWrapElement.querySelector('#slider');
    this.nextBtnElement = this.sliderWrapElement.querySelector('#next');
    this.prevBtnElement = this.sliderWrapElement.querySelector('#previous');
    this.inticatorWrapElement =
      this.sliderWrapElement.querySelector('#indicator-wrap');
    this.controlWrapElement =
      this.sliderWrapElement.querySelector('#control-wrap');
  }

  initAutoPlay() {
    // this.#intervalId = setInterval(() => {
    //   this.#currentPosition %= this.#slideNumber;
    //   this.moveFromIndex(this.#currentPosition);
    //   this.#currentPosition += 1;
    // }, 1000);
    this.#intervalId = setInterval(this.moveToRight.bind(this), 2000);
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
      this.moveIndicator.bind(this),
    );
    this.controlWrapElement.addEventListener(
      'click',
      this.playPause.bind(this),
    );
  }

  playPause(e) {
    const { target, currentTarget } = e;
    if (target.dataset.status === 'play') {
      currentTarget.classList.remove('pause');
      currentTarget.classList.add('play');
      this.initAutoPlay();
    } else {
      currentTarget.classList.remove('play');
      currentTarget.classList.add('pause');
      clearInterval(this.#intervalId);
      this.#currentPosition -= 1;
    }
  }

  moveToRight() {
    this.#currentPosition += 1;
    if (this.#slideNumber <= this.#currentPosition) {
      this.#currentPosition = 0;
    }
    this.moveFromIndex(this.#currentPosition);
  }

  moveToLeft() {
    this.#currentPosition -= 1;
    if (this.#currentPosition < 0) {
      this.#currentPosition = this.#slideNumber - 1;
    }
    this.moveFromIndex(this.#currentPosition);
  }

  moveIndicator(event) {
    const dom = event.target;
    const index = dom.dataset?.index;
    this.moveFromIndex(index);
  }

  moveFromIndex(index) {
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
    const val = value + 1;
    this.inticatorWrapElement
      .querySelector('li.active')
      ?.classList.remove('active');
    const current = this.inticatorWrapElement.querySelector(
      `li:nth-child(${val})`,
    );
    current?.classList.add('active');
  }
}
