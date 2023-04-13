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
	let response2 = await fetch("js/pets.json");
	let pets1 = await response2.json();
	let slider = document.querySelector('.cards-container');
	let page = document.querySelector('.arrow-number');
	let pageN = 1;
	pets = shuffle(pets).concat(shuffle(pets1)).concat(shuffle(pets)).concat(shuffle(pets)).concat(shuffle(pets)).concat(shuffle(pets));
	pets1 = shuffle(pets1);
	slider.innerHTML += `
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
		<div class="card">
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
		<div class="card">
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
		<div class="card hidden-card-2">
			<div class="card-img">
				<img src="${pets[3].img}" alt="">
			</div>
			<p class="pets-name">
				${pets[3].name}
			</p>
			<button class="pets-more">
				Learn more
			</button>
		</div>
		<div class="card hidden-card-2">
			<div class="card-img">
				<img src="${pets[4].img}" alt="">
			</div>
			<p class="pets-name">
				${pets[4].name}
			</p>
			<button class="pets-more">
				Learn more
			</button>
		</div>
		<div class="card hidden-card-2">
			<div class="card-img">
				<img src="${pets[5].img}" alt="">
			</div>
			<p class="pets-name">
				${pets[5].name}
			</p>
			<button class="pets-more">
				Learn more
			</button>
		</div>
		<div class="card hidden-card-1">
			<div class="card-img">
				<img src="${pets[6].img}" alt="">
			</div>
			<p class="pets-name">
				${pets[6].name}
			</p>
			<button class="pets-more">
				Learn more
			</button>
		</div>
		<div class="card hidden-card-1">
			<div class="card-img">
				<img src="${pets[7].img}" alt="">
			</div>
			<p class="pets-name">
				${pets[7].name}
			</p>
			<button class="pets-more">
				Learn more
			</button>
		</div>
	`
	let arrowRight = document.querySelector('.arrow-right');
	let arrowLeft = document.querySelector('.arrow-left');
	let arrowLeftBig = document.querySelector('.arrow-big-left');
	let arrowRightBig = document.querySelector('.arrow-big-right');
	let Names = document.querySelectorAll(".pets-name");
	let petImgs = document.querySelectorAll(".card-img");


	arrowLeft.setAttribute("disabled", "disabled");
	arrowLeftBig.setAttribute("disabled", "disabled");

	let save = 0;
	let temp = 8;
	arrowLeft.addEventListener('click', () =>{
		if(pageN == 2){
			arrowLeft.setAttribute("disabled", "disabled");
			arrowLeftBig.setAttribute("disabled", "disabled");
		}
		if(pageN == 6){
			arrowRight.removeAttribute("disabled");
			arrowRightBig.removeAttribute("disabled");
		}
		if(pageN != 1){
			let i = 0;
			for(i = 0; i < Names.length; i++)
			{
				Names[i].innerHTML = `${pets[i - temp + save].name}`;
				petImgs[i].innerHTML = `<img src="${pets[i - temp + save].img}" alt="">`;
			}

			save -= i;
			pageN--;
			page.innerHTML = `${pageN}`;
			console.log(save);
		}
	})

	arrowRight.addEventListener('click', () =>{
		if(pageN == 5){
			arrowRight.setAttribute("disabled", "disabled");
			arrowRightBig.setAttribute("disabled", "disabled");
		}
		if(pageN == 1){
			arrowLeft.removeAttribute("disabled");
			arrowLeftBig.removeAttribute("disabled");
		}
		if (pageN != 6){
			let i = 0;
			for(i = 0; i < Names.length; i++)
			{
				console.log(i + save + temp);
				Names[i].innerHTML = `${pets[i + temp + save].name}`;
				petImgs[i].innerHTML = `<img src="${pets[i + temp + save].img}" alt="">`;
			}
			save += i;
			pageN++;
			page.innerHTML = `${pageN}`;
			console.log(save);
		}
	})

	arrowLeftBig.addEventListener('click', () =>{
		arrowLeft.setAttribute("disabled", "disabled");
		arrowLeftBig.setAttribute("disabled", "disabled");
		if(pageN == 6){
			arrowRight.removeAttribute("disabled");
			arrowRightBig.removeAttribute("disabled");
		}
		if(pageN != 1){
			save = 0;
			for(i = 0; i < Names.length; i++)
			{
				Names[i].innerHTML = `${pets[i].name}`;
				petImgs[i].innerHTML = `<img src="${pets[i].img}" alt="">`;
			}
			pageN = 1;
			page.innerHTML = `${pageN}`;
			console.log(save);
		}
	})

	arrowRightBig.addEventListener('click', () =>{
		arrowRight.setAttribute("disabled", "disabled");
		arrowRightBig.setAttribute("disabled", "disabled");
		if(pageN == 1){
			arrowLeft.removeAttribute("disabled");
			arrowLeftBig.removeAttribute("disabled");
		}
		if(pageN != 6){
			save = temp * 5;
			for(i = 0; i < Names.length; i++)
			{
				Names[i].innerHTML = `${pets[i + save].name}`;
				petImgs[i].innerHTML = `<img src="${pets[i + save].img}" alt="">`;
			}
			pageN = 6;
			page.innerHTML = `${pageN}`;
			console.log(save);
		}
	})

	
	let cards = document.querySelectorAll('.card');
	let popup = document.querySelector('.pop-up');
	let cover = document.querySelector('.cover');
	let body = document.querySelector('body');






	for (let i = 0; i < cards.length; i++){
		cards[i].addEventListener('click', () => {
			popup.innerHTML = "";
			popup.classList.add("show-pop");
			cover.classList.add('cover_active');
			body.classList.add('fixed-page');
			popup.innerHTML += `
			<div class="popup-close"></div>
					<div class="popup-img">
						<img class="popup-thumb" src="${pets[i + save].img}" alt="">
					</div>
					<div class="popup-content">
						<h2 class="popup-title">
							${pets[i + save].name}
						</h2>
						<h3 class="popup-subtitle">
							${pets[i + save].type} - ${pets[i].breed}
						</h3>
						<p class="popup-text">
							${pets[i + save].description}
						</p>
						<ul class="popup-list">
							<li class="popup-li"><b style="font-weight: 700;">Age:</b> ${pets[i + save].age}</li>
							<li class="popup-li"><b style="font-weight: 700;">Inoculations:</b> ${pets[i + save].inoculations}</li>
							<li class="popup-li"><b style="font-weight: 700;">Diseases:</b> ${pets[i + save].diseases}</li>
							<li class="popup-li"><span class="popup-li"><b style="font-weight: 700;">Parasites:</b> ${pets[i + save].parasites}</span></li>
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

