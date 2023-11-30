/*-------------------------------------
				Navbar			
-------------------------------------*/
let lastScrollTop = 0;
navbar = document.getElementsByClassName("navbar")[0];

window.addEventListener("scroll", function() {
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