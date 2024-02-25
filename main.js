document.addEventListener('DOMContentLoaded', fillColor);
document.addEventListener('DOMContentLoaded', setFirstValue);
document.addEventListener('DOMContentLoaded', setSecondValue);
document.addEventListener('DOMContentLoaded', setLabels);

const data = {
	minInputRange: 2014,
	maxInputRange: 2024,
	firstInputValue: 2016,
	secondInputValue: 2019,
	minRange: 0,
	maxRange: 0,
	firstSliderValue: 0,
	secondSliderValue: 0,

	setDataValue() {
		this.maxRange = (this.maxInputRange - this.minInputRange) * 12;
		this.firstSliderValue =
			(this.firstInputValue - this.minInputRange) * 12;
		this.secondSliderValue =
			(this.secondInputValue - this.minInputRange) * 12;
	},
};

const firstSlider = document.querySelector('#slider-one');
const secondSlider = document.querySelector('#slider-two');
const sliderTrack = document.querySelector('.slider__track');
const firstRangeValue = document.querySelector('#range-value-one');
const secondRangeValue = document.querySelector('#range-value-two');

const pageWidth = document.documentElement.clientWidth;

const yearsButton = document.querySelector('#year-button');
const monthButton = document.querySelector('#month-button');

const dataList = document.querySelector('#range-list');

const labels = document.querySelector('.slider__labels');

let minGap;
let isMonth = false;

data.setDataValue();

firstSlider.setAttribute('min', data.minRange);
firstSlider.setAttribute('max', data.maxRange);
firstSlider.setAttribute('value', data.firstSliderValue);

secondSlider.setAttribute('min', data.minRange);
secondSlider.setAttribute('max', data.maxRange);
secondSlider.setAttribute('value', data.secondSliderValue);

firstSlider.addEventListener('input', slideOne);
secondSlider.addEventListener('input', slideTwo);

firstSlider.addEventListener('input', setFirstValue);
secondSlider.addEventListener('input', setSecondValue);

yearsButton.addEventListener('click', switchYearButton);
monthButton.addEventListener('click', switchMonthButton);

let j = 0;

function setLabels() {
	for (let i = firstSlider.min; i <= firstSlider.max; i++) {
		if (Math.floor(i % 12) === 0 && pageWidth > 900) {
			labels.innerHTML += `<span class='year'>${
				data.minInputRange + Math.floor(i / 12)
			}</span>`;
		} else if (
			Math.floor(i % 12) === 0 &&
			Math.floor(i / 12) % 2 === 0 &&
			!isMonth
		) {
			labels.innerHTML += `<span class='year'>${
				data.minInputRange + Math.floor(i / 12)
			}</span>`;
		} else if (Math.floor(i % 12) === 0 && isMonth) {
			labels.innerHTML += `<span class='year'>${
				data.minInputRange + Math.floor(i / 12)
			}</span>`;
		}

		if (isMonth && Math.floor(i % 12) !== 0 && pageWidth > 900) {
			let month = getMonth(i).toLowerCase();
			labels.innerHTML += `<span>${month.slice(0, 3)}</span>`;
		} else if (
			isMonth &&
			Math.floor(i % 12) !== 0 &&
			Math.floor(i % 2) === 0
		) {
			let month = getMonth(i).toLowerCase();
			labels.innerHTML += `<span>${month.slice(0, 3)}</span>`;
		}
	}
}

function switchYearButton() {
	if (!this.classList.contains('active')) {
		this.classList.add('active');
		monthButton.classList.remove('active');

		firstSlider.setAttribute('min', data.minRange);
		firstSlider.setAttribute('max', data.maxRange);
		firstSlider.setAttribute('value', firstSlider.value);

		secondSlider.setAttribute('min', data.minRange);
		secondSlider.setAttribute('max', data.maxRange);
		secondSlider.setAttribute('value', secondSlider.value);
	}
	minGap = 12;
	isMonth = false;
	fillColor();
	setFirstValue();
	setSecondValue();
	labels.innerHTML = '';
	setLabels();
}

function switchMonthButton() {
	if (!this.classList.contains('active')) {
		this.classList.add('active');
		yearsButton.classList.remove('active');

		firstSlider.setAttribute(
			'min',
			firstSlider.value - Math.floor(firstSlider.value % 12)
		);
		firstSlider.setAttribute(
			'max',
			secondSlider.value - Math.floor(secondSlider.value % 12)
		);
		firstSlider.setAttribute(
			'value',
			firstSlider.value - Math.floor(firstSlider.value % 12)
		);

		secondSlider.setAttribute(
			'min',
			firstSlider.value - Math.floor(firstSlider.value % 12)
		);
		secondSlider.setAttribute(
			'max',
			secondSlider.value - Math.floor(secondSlider.value % 12)
		);
		secondSlider.setAttribute(
			'value',
			secondSlider.value - Math.floor(secondSlider.value % 12)
		);
	}
	minGap = 1;
	isMonth = true;
	fillColor();
	setFirstValue();
	setSecondValue();
	labels.innerHTML = '';
	setLabels();
}

function slideOne() {
	if (parseInt(secondSlider.value) - parseInt(firstSlider.value) <= minGap) {
		firstSlider.value = parseInt(secondSlider.value) - minGap;
	}
	fillColor();
}

function slideTwo() {
	if (parseInt(secondSlider.value) - parseInt(firstSlider.value) <= minGap) {
		secondSlider.value = parseInt(firstSlider.value) + minGap;
	}
	fillColor();
}

function fillColor() {
	sliderTrack.style.background = `linear-gradient(to right, #edf1f8 ${getPercent(
		firstSlider
	)}%, #6cb5ec ${getPercent(firstSlider)}%, #6cb5ec ${getPercent(
		secondSlider
	)}%, #edf1f8 ${getPercent(secondSlider)}%)`;
}

function setFirstValue() {
	firstRangeValue.innerHTML = `<span class='bubble-one'><div>${getMonth(
		firstSlider.value
	)}</div> <div>${
		data.minInputRange + Math.floor(firstSlider.value / 12)
	}</div></span>`;

	firstRangeValue.style.left = `calc(${getPercent(firstSlider)}% + (${
		8 - getPercent(firstSlider) * 0.15
	}px))`;
	firstRangeValue.style.transform = `translateY(-75px)`;
}

function setSecondValue() {
	secondRangeValue.innerHTML = `<span class='bubble-two'><div>${getMonth(
		secondSlider.value
	)}</div> <div>${
		data.minInputRange + Math.floor(secondSlider.value / 12)
	}</div></span>`;

	secondRangeValue.style.left = `calc(${getPercent(secondSlider)}% + (${
		8 - getPercent(secondSlider) * 0.15
	}px))`;
}

function getPercent(slider) {
	return ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
}

function getMonth(value) {
	switch (Math.floor(value % 12)) {
		case 0:
			return 'Январь';
		case 1:
			return 'Февраль';
		case 2:
			return 'Март';
		case 3:
			return 'Апрель';
		case 4:
			return 'Май';
		case 5:
			return 'Июнь';
		case 6:
			return 'Июль';
		case 7:
			return 'Август';
		case 8:
			return 'Сентябрь';
		case 9:
			return 'Октябрь';
		case 10:
			return 'Ноябрь';
		case 11:
			return 'Декабрь';
	}
}
