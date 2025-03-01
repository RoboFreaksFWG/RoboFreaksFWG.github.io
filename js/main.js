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
function CreateBlogElement(parentId, titleText, paragraphText, images, textRightSide, FirstArticle) {
	// Erstelle den Container
	var container = document.createElement('div');
	container.className = FirstArticle ? 'd-flex flex-column flex-xl-row' : 'd-flex flex-column flex-xl-row content';

	// Erstelle den Textbereich
	var textDiv = document.createElement('div');
	
	var title = document.createElement('p'); //weiße Überschrift
	title.className = textRightSide ? 'text white right' : 'text white';
	title.textContent = titleText;

	var paragraph = document.createElement('p'); //Text
	paragraph.className = textRightSide ? 'text right' : 'text';
	
	
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
	var carouselDiv = document.createElement('div');
	carouselDiv.className = 'carousel slide d-flex align-items-end';
	
	var carouselId = 'Carousel' + parentId; // Eindeutige ID
	carouselDiv.id = carouselId;
	carouselDiv.setAttribute('data-bs-ride', 'carousel');

	// Indikatoren und Inneres des Carousels
	var indicators = document.createElement('div');
	indicators.className = 'carousel-indicators';
	var carouselInner = document.createElement('div');
	carouselInner.className = 'carousel-inner';

	// Füge Bilder und Indikatoren hinzu
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
		img.setAttribute('loading', imageObj.loading || 'lazy'); // Setze das loading-Attribut, sonst lazy

		//entferne Skeleton wen geladen
		img.onload = function() {
			this.classList.remove('skeleton');
		};

		// Wende CSS-Styles an, falls vorhanden
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

	// Füge Text und Carousel in der gewünschten Reihenfolge zum container hinzu
	if (textRightSide && !SmallScreen) {
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
/* Richtige Erstellung:
/* CreateBlogElement('Jahr-Blognummer', 'Titel', 'Text (<br> für Absätze)', 
					[{src: 'BildPfad'}](Bilder kann auch loading/style Attribute mitgegen werden),
					jeder 2. Artikel kommt auf die rechte Seite -> dann true; der Erste Artikel bekommt immer ein true)

/*24/25*/
CreateBlogElement('24/25-3', 'Quali Regensburg LIVE',
	'5:47Uhr: Abfahrt in Kronach Richung Regensburg. Stimmung ok, für die Uhrzeit. <br> 7:54Uhr: Ankunft in Regensburg und Check-In. <br> 9:30Uhr: Eröffnug des Wettbewerbs. Die Stimmung ist bombe. <br> 10:25Uhr: Der RobotGame Testlauf lief super. 335 Punkte! <br> 11:30Uhr: Kurze Essenspause. <br> 11:55Uhr: Erste RobotGame Vorrunde. Der Roboter war super - 460 Punkte! Damit sind wir erstmal auf dem 3. Platz. <br> 13:05Uhr: Jury-Bewertung. Die Präsentation lief gut und es hat Spaß gemacht unsere Forschung und das Design zu präsentieren. <br> 14:00Uhr: Zweite RobotGame Runde.', [{src:'../assets/LiveBanner.png'}], false, true)
CreateBlogElement('24/25-2', 'Regionalwettbewerb Ilmenau',
	'Am 25.01.25 waren wir in Ilmenau. Die Organisation des Wettbewerbs war sagenhaft. Wir wurden mit viel Essen, Snacks und Getränken versorgt. Der Ablauf des Programms lief tadellos. Das macht wirklich immer sehr viel Spaß! <br> Dieses Jahr sind wir wieder mit nur einem Team angetreten. In der Vorrunde hat unser Robi nicht ganz so funktioniert wie er sollte. Trotzdem haben wir das Halbfinale erreicht und am Ende den 4. Platz gemacht. Unsere Forschung durften wir noch einmal vor dem gesamten Publikum vorstellen und kamen in die Top 4. Auch im Robot Design konnten wir die Top 4 erreichen und wurden damit tatsächlich Champion in Ilmenau! <br> Somit dürfen wir am 1. März nach Regensburg. Herzlichen Glückwunsch auch an GGI R2D2 - wir sehen und wieder in Regensburg. :) <br> Robot Game: 4; Robot Design, Forschung & Grundwerte: Top 4; Gesamt: 1',
	[{src: '../assets/seasons/24-25/Ilmenau-Team.JPG', loading:'eager'},{src: '../assets/seasons/24-25/Ilmenau-Design.jpg'},{src: '../assets/seasons/24-25/Ilmenau-RobotGame.JPG', style: {'object-position': 'bottom'}} ,{src: '../assets/seasons/24-25/Ilmenau-Forschung.JPG'},{src: '../assets/seasons/24-25/Ilmenau-Sieger.JPG'}],true);
CreateBlogElement('24/25-1', 'Vorbereitungen',
	'Die Vorbereitungen für RobotGame, Forschung und RobotDesign laufen auf hochtouren. Wir freuen uns schon auf den Wettbewerb am 25.01.25 in Ilmenau. :)',
	[{src: '../assets/seasons/24-25/Vorbereitung.jpeg'}], false, true);

	/*23/24*/
CreateBlogElement('23/24-1', 'Vorbereitungen', 
	'In diesem Schuljahr ist unser Team stark angewachsen. Um unseren neuen jungen Mitgliedern gerecht zu werden, haben wir das Team "RoboBirds" ins Leben gerufen. Die Vorbereitungen für die bevorstehenden Wettbewerbe sind in vollem Gange, und die Vorfreude auf den Wettbewerbstag steigt stetig. Wir hoffen, dort auch einige bekannte Gesichter wiederzusehen! <br> Die RoboFreaks starten dieses Jahr in Nürnberg.',
	[{src: '../assets/seasons/23-24/Vorbereitung.jpg'},{src: '../assets/seasons/23-24/SpielfeldAufbau.jpg'}],
	false, true);
CreateBlogElement('23/24-2', 'Regionalwettbewerb Ilmenau' , 
	'Die Robobirds (unser neues & junges Team) haben am Regionalwettbewerb in Ilmenau teilgenommen. Die gesamte Organisation vor Ort war wie im Jahr zuvor wieder unglaublich gut. Wir wurden bestens versorgt und es war spitze, wieder die ganzen uns schon bekannten Teams, aber auch neue zu treffen. <br> Im RobotGame haben wir uns in den Vorrunden gut geschlagen und sind so ins Halbfinale und dann sogar noch ins Finale gekommen. Die Spannung bei der Siegerehrung war also riesig. <br> Letztendlich kamen wir auf einen unglaublichen 2. Platz und haben uns damit sogar für die nächste Runde in Regensburg qualifiziert! <br> Robot Game: 2; Robot Design: Top 4; Forschung: Top 4; Grundwerte: 1', 
	[{src: '../assets/seasons/23-24/Ilmenau-RobotGame.jpg'},{src: '../assets/seasons/23-24/Ilmenau-Forschung1.jpg'}, {src: '../assets/seasons/23-24/Ilmenau-Forschung2.jpg'}], 
	true);
CreateBlogElement('23/24-3', 'Regionalwettbewerb Nürnberg',
	'Zum ersten mal seit 5 Jahren sind wir wieder nach Nürnberg zum Regionalwettbewerb gegangen. Die Location an der Burg in Nürnberg ist wunderschön und der Wettbewerb war super organisiert. Insgesamt konnten wir den 2. Platz belegen und qualifizierten uns somit für den Wettbewerb in Regensburg. <br> RobotGame: 2; RobotDesign: N/A; Forschung: Top 4; Grundwerte: 1',
	[{src: '../assets/seasons/23-24/Nürnberg-Siegerbild.jpg'},{src: '../assets/seasons/23-24/Nürnberg-Robotgame1.jpg'}, {src: '../assets/seasons/23-24/Nürnberg-Robotgame2.jpg'},
	{src: '../assets/seasons/23-24/Nürnberg-Robotgame3.jpg'}, {src: '../assets/seasons/23-24/Nürnberg-Preisverleihung.jpeg'}],
	false);
CreateBlogElement('23/24-4', 'Qualifikationswettbewerb Regensburg',
	'Mit unseren beiden Teams RoboFreaks und Robobirds durften wir in Regensburg am Qualifikationswettbewerb teilnehmen. Wir konnten zwar keinen Pokal gewinnen, hatten aber unheimlich viel Spaß als Gruppe den ganzen Tag zu verbringen. Ganz liebe Grüße gehen auch an die Teams GGI R2D2, LEGOminati & RTG-NextGeneration.',
	[{src:'../assets/seasons/23-24/Regensburg-Gruppenbild.JPG'}, {src:'../assets/seasons/23-24/Regensburg-Vorbereitung.jpeg'}, {src:'../assets/seasons/23-24/Regensburg-RobotGame1.jpg'}, {src:'../assets/seasons/23-24/Regensburg-RobotGame2.jpg'}, {src:'../assets/seasons/23-24/Regensburg-RobotGame3.JPG'},
	{src:'../assets/seasons/23-24/Regensburg-Birds.jpeg'}, {src:'../assets/seasons/23-24/Regensburg-Freaks.jpeg'}],
	true);

/*22/23*/
CreateBlogElement('22/23-1', 'Regionalwettbewerb Ilmenau:',
	'Zum zweiten mal sind wir zum Regionalwettbewerb in Ilmenau angetreten. Wie schon im Vorjahr waren wir von der Organisation total begeistert und es hat riesen Spaß gemacht. Es war auch schön die anderen Teams wieder zu sehen. Tatsächlich waren wir auch sehr erfolgreich und haben erneut den Champion Pokal erhalten. <br> Robot Game: 1; Robot Design: Top 4; Forschung: Top 4; Grundwerte: N/A',
	[{src: '../assets/seasons/22-23/Ilmenau-Sieger.jpg', style:{'object-position': 'center'}},{src:'../assets/seasons/22-23/Ilmenau-RobotGame.jpg'},
	{src: '../assets/seasons/22-23/Ilmenau-Jury.jpg'}, {src: '../assets/seasons/22-23/Ilmenau-Essen.jpg', style: {'object-position': 'center'}}, {src: '../assets/seasons/22-23/Ilmenau-Ende.jpg'}], 
	false, true)
CreateBlogElement('22/23-2', 'Deutschlandentscheid Siegen:',
	'Durch den Sieg in Ilmenau haben wir uns für den Deutschlandentscheid in Siegen qualifiziert. Eigentlich waren wir in allen Kategorien recht gut, leider hat es nicht für die Top 5 gereicht, was unser aus für diese Saison bedeutet hat. <br> Robot Game: 1; Robot Design: Top 4; Forschung: N/A; Grundwerte: Top 4',
	[{src: '../assets/seasons/22-23/Siegen-Ende.jpg'},{src:'../assets/seasons/22-23/Siegen-Besprechung.jpeg', style: {'object-position': 'center'}},
	{src: '../assets/seasons/22-23/Siegen-Jury.jpg'}, {src: '../assets/seasons/22-23/Siegen-RobotGame.jpg'}], 
	true)

/*21/22*/
CreateBlogElement('21/22-1', 'Regionalwettbewerb Ilmenau:',
	'In diesem Jahr haben wir uns in Ilmenau angemeldet. Aufgrund von Corona musste der Wettbewerb aber noch digital ausgetragen werden. <br> Das erste mal in der Geschchichte der RoboFreaks haben wir den Regio gewonnen und uns damit für den Deutschlandentscheid in Frankfurt qualifiziert. <br> Robot Game: 1; Robot Design: 3; Forschung: 4; Grundwerte: 2',
	[{src:'../assets/seasons/21-22/Ilmenau-Team.png'}, {src: '../assets/seasons/21-22/Ilmenau-RobotGame.png'}],
	false, true)
CreateBlogElement('21/22-2', 'Deutschlandentscheid Frankfurt:',
	'Nachdem wir in Ilmenau gewonnen hatten, haben wir uns als Ziel gesetzt das RobotGame zu überarbeiten. Über viele Stunden Arbeit konnten wir so die vollen 680p erreichen. Am Wettkampftag, der wegen Corona noch digital stattgefunden hat, ist unser Robi nicht das gefahren, was er eingentlich könnte. <br> Deshalb hatten wir an ein Weiterkommen nicht mehr gedacht und waren extrem überrascht und erfreut, dass wir den 4. Platz belegt haben. Dadruch qualifizierten wir uns für das große DACh Finale in Paderborn. <br> Robot Game: 5; Robot Design: 13; Forschung: 9; Grundwerte: 1',
	[{src: '../assets/seasons/21-22/Frankfurt-Team.jpeg'}, {src: '../assets/seasons/21-22/Frankfurt-Sponsor.png'},
	{src: '../assets/seasons/21-22/Frankfurt-Gruppenbild.png'}, {src: '../assets/seasons/21-22/Frankfurt-Module.png', style: {'object-position': 'bottom'}}],
	true)
CreateBlogElement('21/22-3', 'DACH Finale in Paderborn:',
	'Für uns war es eine aufregende Reise nach Paderborn zum DACH Finale. Zum ersten Mal konnten wir uns für weitere Runden in der FLL qualifizieren und es war der erste Wettkampf in Präsenz seit City Chaper. Zudem konnten wir so richtig mit anderen Teams in Kontakt treten und uns austauschen. <br> Es waren unglaubliche Erfahrungen, die wir an den beiden Tagen während des Wettbewerbs und des Teamabends sammeln durften. Tatsächlich konnten wir uns im RobotGame bis ins Finale durchsetzen, was uns unglaublich gefreut hat. <br> Als aber bei der Siegerehrung der Name "RoboFreaks" als Gewinner des gesamten DACH Finales verkündet wurde, waren wir zunächst komplett sprachlos. In unseren Erinnerungen läuft ab diesem Zeitpunkt alles in Zeitlupe ab. Nun können wir uns voller Stolz Champions nennen. <br> Robot Game: 2; Robot Design: 2; Forschung: 5; Grundwerte: 9',
	[{src: '../assets/seasons/21-22/Paderborn-Sieger.JPG'}, {src: '../assets/seasons/21-22/Paderborn-Jury.png'},
	{src: '../assets/seasons/21-22/Paderborn-Forschung.JPG'}, {src: '../assets/seasons/21-22/Paderborn-RobotGame.JPG'}, {src: '../assets/seasons/21-22/Paderborn-Siegerehrung.JPG'}],
)
/*20/21*/
CreateBlogElement('20/21-1', '',
	'Aufgrund von Corona konnten wir leider an keinem Wettbewerb teilnehmen und die FLL musste für uns in diesem Jahr ausfallen.',
	[], false, true)