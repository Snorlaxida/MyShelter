(function() {
	const burgerItem = document.querySelector('.burger');
	const menu = document.querySelector('.header__nav');
	const menuLinks = document.querySelectorAll('.header__link');
	const cover = document.querySelector('.cover');
	const body = document.querySelector('body');
	burgerItem.addEventListener('click', () => {
		if (burgerItem.classList.contains('header__burger_active')){
			menu.classList.remove('header__nav_active');
			burgerItem.classList.remove('header__burger_active');
			cover.classList.remove('cover_active');
			body.classList.remove('fixed-page');
		}
		else{
			menu.classList.add('header__nav_active');
			burgerItem.classList.add('header__burger_active');
			cover.classList.add('cover_active');
			body.classList.add('fixed-page');
		}
	})

	if (window.innerWidth <= 767){
		for (let i = 0; i < menuLinks.length; i++){
			menuLinks[i].addEventListener('click', () => {
				menu.classList.remove('header__nav_active');
				burgerItem.classList.remove('header__burger_active')
				cover.classList.remove('cover_active');
				body.classList.remove('fixed-page');
			});
		}
	}
}());


(function () {

	const smoothScroll = function (targetEl, duration) {
			let target = document.querySelector(targetEl);
			let targetPosition = target.getBoundingClientRect().top;
			let startPosition = window.pageYOffset;
			let startTime = null;
	
			const ease = function(t,b,c,d) {
					t /= d / 2;
					if (t < 1) return c / 2 * t * t + b;
					t--;
					return -c / 2 * (t * (t - 2) - 1) + b;
			};
	
			const animation = function(currentTime){
					if (startTime === null) startTime = currentTime;
					const timeElapsed = currentTime - startTime;
					const run = ease(timeElapsed, startPosition, targetPosition, duration);
					window.scrollTo(0,run);
					if (timeElapsed < duration) requestAnimationFrame(animation);
			};
			requestAnimationFrame(animation);

	};

	const scrollTo = function () {
			const links = document.querySelectorAll('.js-scroll');
			links.forEach(each => {
					each.addEventListener('click', function () {
							const currentTarget = this.getAttribute('href');
							smoothScroll(currentTarget, 1000);
					});
			});
	};
	scrollTo();
}());

const shuffle = (array) => {
  let m = array.length, t, i;

  // Пока есть элементы для перемешивания
  while (m) {

    // Взять оставшийся элемент
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
async function getResponse(){
	let response = await fetch("js/pets.json");
	let pets = await response.json();
	let slider = document.querySelector('.slider');
	pets = shuffle(pets);

	

	slider.innerHTML += `
		<img src="img/Arrow.svg" alt="Arrow" class="arrow arrow-1">
		<div class="card">
			<div class="card-img">
				<img src="${pets[0].img}" alt="">
			</div>
			<p class="pets-name">
				${pets[0].name}
			</p>
			<button class="pets-more">
				Learn more
			</button>
		</div>
		<div class="card hidden-card2">
			<div class="card-img">
				<img src="${pets[1].img}" alt="">
			</div>
			<p class="pets-name">
				${pets[1].name}
			</p>
			<button class="pets-more">
				Learn more
			</button>
		</div>
		<div class="card hidden-card3">
			<div class="card-img">
				<img src="${pets[2].img}" alt="">
			</div>
			<p class="pets-name">
				${pets[2].name}
			</p>
			<button class="pets-more">
				Learn more
			</button>
		</div>
		<img src="img/Arrow2.svg" alt="Arrow" class="arrow arrow-2">
				`
		let cards = document.querySelectorAll('.card');
		let popup = document.querySelector('.pop-up');
		let cover = document.querySelector('.cover');
		let body = document.querySelector('body');


		let arrowRight = document.querySelector('.arrow-2');
		let arrowLeft = document.querySelector('.arrow-1');
		Names = document.querySelectorAll(".pets-name");
		petImgs = document.querySelectorAll(".card-img");

		arrowLeft.addEventListener('click', () =>{
			if(arrowLeft.classList.contains("nowLeft")){
				pets = pets.slice(0, 3).concat(shuffle(pets.slice(3, 8)));
				let temp;
	
				temp = pets[0];
				pets[0] = pets[3];
				pets[3] = temp;
	
				temp = pets[1];
				pets[1] = pets[4];
				pets[4] = temp;
	
				temp = pets[2];
				pets[2] = pets[5];
				pets[5] = temp;
			}
			else{
				pets = pets.slice(3, 6).concat(pets.slice(0, 3)).concat(pets.slice(6, 8));
			}
			arrowLeft.classList.add('nowLeft');
			for(let i = 0; i < 3; i++){
					Names[i].innerHTML = `${pets[i].name}`;
					petImgs[i].innerHTML = `<img src="${pets[i].img}" alt="">`;
			}
		})
		arrowRight.addEventListener('click', () =>{
			if(arrowLeft.classList.contains("nowLeft")){
				pets = pets.slice(3, 6).concat(pets.slice(0, 3)).concat(pets.slice(6, 8));
			}
			else{
				pets = pets.slice(0, 3).concat(shuffle(pets.slice(3, 8)));
				let temp;
	
				temp = pets[0];
				pets[0] = pets[3];
				pets[3] = temp;
	
				temp = pets[1];
				pets[1] = pets[4];
				pets[4] = temp;
	
				temp = pets[2];
				pets[2] = pets[5];
				pets[5] = temp;
			}
			arrowLeft.classList.remove("nowLeft")
			for(let i = 0; i < 3; i++){
					Names[i].innerHTML = `${pets[i].name}`;
					petImgs[i].innerHTML = `<img src="${pets[i].img}" alt="">`;
			}
		
		})






		for (let i = 0; i < cards.length; i++){
				cards[i].addEventListener('click', () => {
					popup.innerHTML = "";
					popup.classList.add("show-pop");
					cover.classList.add('cover_active');
					body.classList.add('fixed-page');
					popup.innerHTML += `
					<div class="popup-close"></div>
					<div class="popup-img">
						<img class="popup-thumb" src="${pets[i].img}" alt="">
					</div>
					<div class="popup-content">
						<h2 class="popup-title">
							${pets[i].name}
						</h2>
						<h3 class="popup-subtitle">
							${pets[i].type} - ${pets[i].breed}
						</h3>
						<p class="popup-text">
							${pets[i].description}
						</p>
						<ul class="popup-list">
							<li class="popup-li"><b style="font-weight: 700;">Age:</b> ${pets[i].age}</li>
							<li class="popup-li"><b style="font-weight: 700;">Inoculations:</b> ${pets[i].inoculations}</li>
							<li class="popup-li"><b style="font-weight: 700;">Diseases:</b> ${pets[i].diseases}</li>
							<li class="popup-li"><span class="popup-li"><b style="font-weight: 700;">Parasites:</b> ${pets[i].parasites}</span></li>
						</ul>
					</div>
					`
					let popclose = document.querySelector('.popup-close');
					popclose.addEventListener('click', () => {
						popup.classList.remove("show-pop");
						cover.classList.remove('cover_active');
						body.classList.remove('fixed-page');
					})

			});
		}

		cover.addEventListener('click', () => {

			popup.classList.remove("show-pop");
			cover.classList.remove('cover_active');
			body.classList.remove('fixed-page');
		})



		

		
}
getResponse();


