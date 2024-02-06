/*-------------------------------------
				Navbar			
-------------------------------------*/
/*
let lastScrollTop = 0;
navbar = document.getElementsByClassName("navbar")[0];

window.addEventListener("scroll", function() { //versteckt Nacbar beim runterscrollen
	let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

	if (currentScroll > lastScrollTop) {
		// Nach unten scrollen
		navbar.style.top = "-60px"; // oder eine andere Höhe entsprechend Ihrer Navbar
	} else {
		// Nach oben scrollen
		navbar.style.top = "0";
	}

	lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Für negative Scrolling-Werte
}, false);
*/

/*-------------------------------------
			Type Writer 
-------------------------------------*/
function typeWriter(elementId, text, speed) {
	let i = 0;
	let element = document.getElementById(elementId);

	function typing() {
		if (i < text.length) {
			element.innerHTML += text.charAt(i);
			i++;
			setTimeout(typing, speed);
		}
	}

	typing();
}

document.addEventListener('DOMContentLoaded', (event) => {
	typeWriter("typed-text", "RoboFreaks", 150); // Geschwindigkeit in Millisekunden
});


/*-------------------------------------
			Counting Numbers 
-------------------------------------*/
class CountUp {
	constructor(triggerEl, counterEl, startOn) {
	const counter = document.querySelector(counterEl)
	const trigger = document.querySelector(triggerEl)
	let num = startOn
	const decimals = counter.dataset.decimals

	const countUp = () => {
	if (num < counter.dataset.stop)
		
		// Do we want decimals?
		if (decimals) {
		num += 0.01
		counter.textContent = new Intl.NumberFormat('de', { 
			minimumFractionDigits: 2,
			maximumFractionDigits: 2 
}).format(num)
	}
	else {
		// No decimals
		num++
		counter.textContent = num
	}
	}
	
	const observer = new IntersectionObserver((el) => {
	if (el[0].isIntersecting) {
		const interval = setInterval(() => {
		(num < counter.dataset.stop) ? countUp() : clearInterval(interval)
		}, counter.dataset.speed)
	}
	}, { threshold: [0] })

	observer.observe(trigger)
	}
}

// Initialize any number of counters:
new CountUp('#start1', '#count-fll', 0)
new CountUp('#start1', '#count-lego', 14500)
new CountUp('#start1', '#count-döner', 0)


/*-------------------------------------
				tooltips			
-------------------------------------*/
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
return new bootstrap.Tooltip(tooltipTriggerEl)
})

/*-------------------------------------
			News & Archiv			
-------------------------------------*/
function CreateBlogElement(parentId, CarouselIDnum, titleText, paragraphText, images, textRightSide) {
	// Erstelle den Container
	var container = document.createElement('div');
	container.className = `d-flex flex-column flex-xl-row content`;


	// Erstelle den Textbereich
	var textDiv = document.createElement('div');
	
	var title = document.createElement('h4');
	title.className = 'subtitle';
	title.textContent = titleText;

	var paragraph = document.createElement('p');
	if (textRightSide) paragraph.className = 'text right';
	else paragraph.className = 'text';
	
	
	// Verarbeite und füge den Paragraphentext mit Zeilenumbrüchen hinzu
	// Splitte den Text an jedem "<br>" und füge Teile und entsprechende <br>-Tags hinzu
	paragraphText.split('<br>').forEach((part, index, array) => {
		paragraph.appendChild(document.createTextNode(part));
		// Füge <br> nur hinzu, wenn es nicht der letzte Teil ist
		if (index < array.length - 1) {
			paragraph.appendChild(document.createElement('br'));
		}
	});

	textDiv.appendChild(title);
	textDiv.appendChild(paragraph);



	// Erstelle den Carousel-Bereich
	var carouselId = 'newsCarousel' + CarouselIDnum; // Eindeutige ID
	var carouselDiv = document.createElement('div');
	carouselDiv.id = carouselId;
	carouselDiv.className = 'carousel slide d-flex align-items-end';
	carouselDiv.setAttribute('data-bs-ride', 'carousel');

	// Indikatoren und Inneres des Carousels
	var indicators = document.createElement('div');
	indicators.className = 'carousel-indicators';
	var carouselInner = document.createElement('div');
	carouselInner.className = 'carousel-inner';

	// Füge Bilder und Indikatoren hinzu
	images.forEach((image, index) => {
		// Indikator
		var indicator = document.createElement('button');
		indicator.setAttribute('type', 'button');
		indicator.setAttribute('data-bs-target', '#' + carouselId);
		indicator.setAttribute('data-bs-slide-to', index.toString());
		if (index === 0) indicator.className = 'active';
		indicators.appendChild(indicator);

		// Carousel-Item
		var item = document.createElement('div');
		item.className = 'carousel-item' + (index === 0 ? ' active' : '');
		var img = document.createElement('img');
		img.src = image;
		img.className = 'd-block w-100';
		item.appendChild(img);
		carouselInner.appendChild(item);
	});

	carouselDiv.appendChild(indicators);
	carouselDiv.appendChild(carouselInner);

	// Füge Text und Carousel in der gewünschten Reihenfolge zum container hinzu
	if (textRightSide) {
		container.appendChild(carouselDiv); // Funktion zum Erstellen des Carousel-Elements
		container.appendChild(textDiv);
	} else {
		container.appendChild(textDiv);
		container.appendChild(carouselDiv); // Funktion zum Erstellen des Carousel-Elements
	}

	// Füge den Container zum Elternelement hinzu
	document.getElementById(parentId).appendChild(container);

	// Aktiviere das Carousel (Bootstrap 5)
	new bootstrap.Carousel(carouselDiv);
}

/*------------Blog Elemente-----------------*/
CreateBlogElement('23/24-1', 1, 'Saison 2023/24', 'In diesem Schuljahr ist unser Team stark angewachsen. Um unseren neuen jungen Mitgliedern gerecht zu werden, haben wir das Team "RoboBirds" ins Leben gerufen. Die Vorbereitungen für die bevorstehenden Wettbewerbe sind in vollem Gange, und die Vorfreude auf den Wettbewerbstag steigt stetig. Wir hoffen, dort auch einige bekannte Gesichter wiederzusehen! <br> Die RoboFreaks starten dieses Jahr in Nürnberg.', ['../assets/seasons/23-24/Vorbereitung.jpg', '../assets/seasons/23-24/SpielfeldAufbau.jpg'], false);
CreateBlogElement('23/24-2', 2, '' , 'Die Robobirds (unser neues & junges Team) haben am Regionalwettbewerb in Ilmenau teilgenommen. Die gesamte Organisation vor Ort war wie im Jahr zuvor wieder unglaublich gut.Wir wurden bestens versorgt und es war spitze, wieder die ganzen uns schon bekannten Teams aber auch neue zu treffen. <br> Im RobotGame haben wir uns in den Vorrunden gut geschlagen und sind so ins Halbfinale und dann sogar noch ins Finale gekommen. Die Spannung bei der Siegerehrung war also riesig. <br> Letztendlich kamen wir auf einen unglaublichen 2. Platz und haben uns damit sogar für die nächste Runde in Regensburg qualifiziert! <br> Robot Game: 2; Robot Design: Top 4; Forschung: Top 4; Grundwerte: 1', ['../assets/seasons/23-24/Ilmenau-RobotGame.jpg', '../assets/seasons/23-24/Ilmenau-Forschung1.jpg', '../assets/seasons/23-24/Ilmenau-Forschung2.jpg'], true);