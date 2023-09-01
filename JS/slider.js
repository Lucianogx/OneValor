const carousel = document.querySelector(".caroucel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".broad-card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, starScrollLeft;

// Captura o número de cards que podem caber no Carrossel ao mesmo tempo
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);


// Insere cópias dos últimos cards atrás do Carrossel para o escroll infinito
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insere cópias dos primeiros cards no final do Carrossel para o efeito infinito
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Adicionado um listeners para o arrow buttons do rolamento do carrosel esquerdo e direito
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Memoriza a posição inicial do cursor e a posição do scroll do carrosel
    startX = e.pageX;
    starScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // Se dragging é "false", retorna daqui
    // Atualiza a posição do scroll baseado no movimento do cursor
    carousel.scrollLeft = starScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const InfinityScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2* carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
        
    }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", InfinityScroll)
