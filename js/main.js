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
				Countdown
-------------------------------------*/
const EVENT_YEAR = 2025;
const EVENT_MONTH = 2; //Jan=0; Feb=1
const EVENT_DAY = 1;
const EVENT_HOUR = 9;
const EVENT_MINUTE = 30;

const MONTH_NAMES = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

function updateCountdown() {
    const timerElement = document.getElementById("Timer");
    const eventDate = new Date(EVENT_YEAR, EVENT_MONTH, EVENT_DAY, EVENT_HOUR, EVENT_MINUTE, 0);
    const now = new Date();

    if (now < eventDate) {
        const diff = eventDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timerElement.textContent = `Der nächste Wettkampf ist in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (now.getDate() === EVENT_DAY && now.getMonth() === EVENT_MONTH) {
        timerElement.textContent = "Der Wettkampf läuft gerade! Schau doch mal auf unserem Instagram vorbei.";
    } else {
        timerElement.textContent = `Der Wettkampf hat am ${EVENT_DAY}. ${MONTH_NAMES[EVENT_MONTH]} stattgefunden.`;
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();


/*-------------------------------------
			Profilbilder 
-------------------------------------*/
function imageLoaded() {
	document.getElementById('placeholder').style.display = 'none';
	document.getElementById('loadedImage').classList.remove('d-none');
}

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
function CreateBlogElement(parentId, titleText, htmlContent, images, textRightSide, firstArticle) {
    // Container
    var container = document.createElement('div');
    container.className = firstArticle ? 'd-flex flex-column flex-xl-row' : 'd-flex flex-column flex-xl-row content';

    // Textbereich
    var textDiv = document.createElement('div');

    var title = document.createElement('p'); // Überschrift
    title.className = textRightSide ? 'text white right' : 'text white';
    title.textContent = titleText;

    // HTML-Content direkt übernehmen
    var paragraph = document.createElement('div');
    paragraph.className = textRightSide ? 'text right' : 'text';
    paragraph.innerHTML = htmlContent;

    textDiv.appendChild(title);
    textDiv.appendChild(paragraph);

    // Carousel
    var carouselDiv = document.createElement('div');
    carouselDiv.className = 'carousel slide d-flex align-items-end';

    var carouselId = 'Carousel' + parentId; 
    carouselDiv.id = carouselId;
    carouselDiv.setAttribute('data-bs-ride', 'carousel');

    var indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';

    var carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';

    images.forEach((imageObj, index) => {
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
        img.src = imageObj.src;
        img.className = 'd-block w-100 skeleton';
        img.setAttribute('loading', imageObj.loading || 'lazy');

        img.onload = function() {
            this.classList.remove('skeleton');
        };

        if (imageObj.style) {
            Object.keys(imageObj.style).forEach(key => {
                img.style[key] = imageObj.style[key];
            });
        }

        item.appendChild(img);
        carouselInner.appendChild(item);
    });

    carouselDiv.appendChild(indicators);
    carouselDiv.appendChild(carouselInner);

    var SmallScreen = window.matchMedia("(max-width:1199px)").matches;

    if (textRightSide && !SmallScreen) {
        container.appendChild(carouselDiv);
        container.appendChild(textDiv);
    } else {
        container.appendChild(textDiv);
        container.appendChild(carouselDiv);
    }

    document.getElementById(parentId).appendChild(container);
    new bootstrap.Carousel(carouselDiv);
}


function loadBlogPost(url, parentId, title, images, textRightSide, firstArticle) {
    fetch(url)
        .then(res => res.text())
        .then(htmlContent => {
            CreateBlogElement(parentId, title, htmlContent, images, textRightSide, firstArticle);
        })
        .catch(err => console.error("Fehler beim Laden von " + url, err));
}
  

/*------------Blog Elemente-----------------*/
/* Richtige Erstellung:
/* CreateBlogElement('Jahr-Blognummer', 'Titel', 'Text (<br> für Absätze)', 
					[{src: 'BildPfad'}](Bilder kann auch loading/style Attribute mitgegen werden),
					jeder 2. Artikel kommt auf die rechte Seite -> dann true; der Erste Artikel bekommt immer ein true)

/*24/25*/
loadBlogPost('blog/24-25-regensburg-live.html', 
	'24/25-3-live', 
	'Quali Regensburg',
	[ {src: '../assets/LiveBanner.png'}],
	  false, false);
loadBlogPost('blog/24-25-ilmenau.html',
	'24/25-2',
	'Regionalwettbewerb Ilmenau',
	[
		{src: '../assets/seasons/24-25/Ilmenau-Team.JPG'},
		{src: '../assets/seasons/24-25/Ilmenau-Design.jpg'},
		{src: '../assets/seasons/24-25/Ilmenau-RobotGame.JPG', style: {'object-position': 'bottom'}},
		{src: '../assets/seasons/24-25/Ilmenau-Forschung.JPG'},
		{src: '../assets/seasons/24-25/Ilmenau-Sieger.JPG'}
	  ],
	  true, false);
loadBlogPost('blog/24-25-vorbereitung.html',
	'24/25-1',
	'Vorbereitungen',
	[{src: '../assets/seasons/24-25/Vorbereitung.jpeg'}],
	false, true);



	/*23/24*/
loadBlogPost('blog/23-24-vorbereitungen.html',
	'23/24-1',
	'Vorbereitungen',
	[
		{src: '../assets/seasons/23-24/Vorbereitung.jpg'},
		{src: '../assets/seasons/23-24/SpielfeldAufbau.jpg'}
	],
	false, true);

loadBlogPost('blog/23-24-ilmenau.html',
	'23/24-2',
	'Regionalwettbewerb Ilmenau',
	[
		{src: '../assets/seasons/23-24/Ilmenau-RobotGame.jpg'},
		{src: '../assets/seasons/23-24/Ilmenau-Forschung1.jpg'},
		{src: '../assets/seasons/23-24/Ilmenau-Forschung2.jpg'}
	],
	true, false);

loadBlogPost('blog/23-24-nürnberg.html',
	'23/24-3',
	'Regionalwettbewerb Nürnberg',
	[
		{src: '../assets/seasons/23-24/Nürnberg-Siegerbild.jpg'},
		{src: '../assets/seasons/23-24/Nürnberg-Robotgame1.jpg'},
		{src: '../assets/seasons/23-24/Nürnberg-Robotgame2.jpg'},
		{src: '../assets/seasons/23-24/Nürnberg-Robotgame3.jpg'},
		{src: '../assets/seasons/23-24/Nürnberg-Preisverleihung.jpeg'}
	],
	false, false);

loadBlogPost('blog/23-24-regensburg.html',
	'23/24-4',
	'Qualifikationswettbewerb Regensburg',
	[
		{src: '../assets/seasons/23-24/Regensburg-Gruppenbild.JPG'},
		{src: '../assets/seasons/23-24/Regensburg-Vorbereitung.jpeg'},
		{src: '../assets/seasons/23-24/Regensburg-RobotGame1.jpg'},
		{src: '../assets/seasons/23-24/Regensburg-RobotGame2.jpg'},
		{src: '../assets/seasons/23-24/Regensburg-RobotGame3.JPG'},
		{src: '../assets/seasons/23-24/Regensburg-Birds.jpeg'},
		{src: '../assets/seasons/23-24/Regensburg-Freaks.jpeg'}
	],
	true, false);

/*22/23*/
loadBlogPost('blog/22-23-ilmenau.html',
	'22/23-1',
	'Regionalwettbewerb Ilmenau',
	[{src: '../assets/seasons/22-23/Ilmenau-Sieger.jpg', style:{'object-position': 'center'}},{src:'../assets/seasons/22-23/Ilmenau-RobotGame.jpg'},
	{src: '../assets/seasons/22-23/Ilmenau-Jury.jpg'}, {src: '../assets/seasons/22-23/Ilmenau-Essen.jpg', style: {'object-position': 'center'}}, {src: '../assets/seasons/22-23/Ilmenau-Ende.jpg'}],
	false, true);
loadBlogPost('blog/22-23-siegen.html',
	'22/23-2',
	'Deutschlandentscheid Siegen',
	[{src: '../assets/seasons/22-23/Siegen-Ende.jpg'},{src:'../assets/seasons/22-23/Siegen-Besprechung.jpeg', style: {'object-position': 'center'}},
	{src: '../assets/seasons/22-23/Siegen-Jury.jpg'}, {src: '../assets/seasons/22-23/Siegen-RobotGame.jpg'}],
	true);

/*21/22*/
loadBlogPost('blog/21-22-ilmenau.html',
	'21/22-1',
	'Regionalwettbewerb Ilmenau',
	[{src:'../assets/seasons/21-22/Ilmenau-Team.png'}, {src: '../assets/seasons/21-22/Ilmenau-RobotGame.png'}],
	false, true);
loadBlogPost('blog/21-22-frankfurt.html',
	'21/22-2',
	'Deutschlandentscheid Frankfurt',
	[{src: '../assets/seasons/21-22/Frankfurt-Team.jpeg'}, {src: '../assets/seasons/21-22/Frankfurt-Sponsor.png'},
	{src: '../assets/seasons/21-22/Frankfurt-Gruppenbild.png'}, {src: '../assets/seasons/21-22/Frankfurt-Module.png', style: {'object-position': 'bottom'}}],
	true);
loadBlogPost('blog/21-22-paderborn.html',
	'21/22-3',
	'DACH Finale in Paderborn',
	[{src: '../assets/seasons/21-22/Paderborn-Sieger.JPG'}, {src: '../assets/seasons/21-22/Paderborn-Jury.png'},
	{src: '../assets/seasons/21-22/Paderborn-Forschung.JPG'}, {src: '../assets/seasons/21-22/Paderborn-RobotGame.JPG'}, {src: '../assets/seasons/21-22/Paderborn-Siegerehrung.JPG'}],
	true);
loadBlogPost('blog/20-21.html',
	'20/21-1',
	'',
	[],
	false, true);