const carousel_s = document.querySelector(".cards-wrapper");
const arrowBtns_s = document.querySelectorAll(".slide-content i");
const firstCardWidth_s = carousel_s.querySelector(".plans-cards").offsetWidth;
const carouselChildrens_s = [...carousel_s.children];

let isDragging_s = false, startX_s, starScrollLeft_s;

// Captura o número de cards que podem caber no Carrossel ao mesmo tempo
let cardPerView_s = Math.round(carousel_s.offsetWidth / firstCardWidth_s);

// Adiciona listeners para o arrow buttons do rolamento do carrosel esquerdo e direito
arrowBtns_s.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel_s.scrollLeft += btn.id === "left" ? -firstCardWidth_s : firstCardWidth_s;
    })
});

const dragStart_s = (e) => {
    isDragging = true;
    carousel_s.classList.add("dragging_s");
    // Memoriza a posição inicial do cursor e a posição do scroll do carrosel
    startX = e.pageX;
    starScrollLeft_s = carousel_s.scrollLeft;
}

const dragging_s = (e) => {
    if(!isDragging) return; // Se isDragging é "false", retorna daqui
    // Atualiza a posição do scroll baseado no movimento do cursor
    carousel_s.scrollLeft = starScrollLeft_s - (e.pageX - startX);
}

const dragStop_s = () => {
    isDragging = false;
    carousel_s.classList.remove("dragging_s");
}

const InfinityScroll_s = () => {
    if (carousel_s.scrollLeft === 0) {
        carousel_s.classList.add("no-transition");
        carousel_s.scrollLeft = carousel_s.scrollWidth - (2* carousel_s.offsetWidth);
        carousel_s.classList.remove("no-transition");
    } else if(Math.ceil(carousel_s.scrollLeft) === carousel_s.scrollWidth - carousel_s.offsetWidth){
        carousel_s.classList.add("no-transition");
        carousel_s.scrollLeft = carousel_s.offsetWidth;
        carousel_s.classList.remove("no-transition");
        
    }
}

carousel_s.addEventListener("mousedown", dragStart);
carousel_s.addEventListener("mousemove", dragging);
carousel_s.addEventListener("scroll", InfinityScroll);
document.addEventListener("mouseup", dragStop);