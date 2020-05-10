'use strict'

const artSets = [
    {
        id: 1,
        picture: ["./img/artSet_img.png", "./img/artSet_img.png", "./img/artSet_img.png"],
        name: "Название",
        price: 1200,
        sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
        currentSize: 30
    },
    {
        id: 2,
        picture: ["./img/artSet_img.png", "./img/artSet_img.png", "./img/artSet_img.png"],
        name: "Название 2",
        price: 1200,
        sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
        currentSize: 30
    },
    {
        id: 3,
        picture: ["./img/artSet_img.png", "./img/artSet_img.png", "./img/artSet_img.png"],
        name: "Название 3",
        price: 1200,
        sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
        currentSize: 30
    },
    {
        id: 4,
        picture: ["./img/artSet_img.png", "./img/artSet_img.png", "./img/artSet_img.png"],
        name: "Название 4",
        price: 1200,
        sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
        currentSize: 30
    }
];

let artSets_activePage = 0;

function prettify(num) {
    var n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
}

function artSets_scrollHandle(event){
    console.log(event);
}

let artSet_code = ``;
for (let i = artSets_activePage * 3; i < (artSets_activePage + 1) * 3; i++) {
    let artSet_code_item = `<div class="artSets-item" >`;
    let artSet_i = artSets[i];
    let artSet_price_str = prettify(artSet_i.price);
    artSet_code_item += `<div class="artSets-item__imgBlock">
                        <div class="artSets-item__imgBtn">&lt;</div>
                        <img src="${artSet_i.picture[0]}" alt="Set ${i} picture" class="artSets-item__img">
                        <div class="artSets-item__imgBtn">&gt;</div>
                    </div>
                    <h3 class="artSets-item__h3">${artSet_i.name}</h3>
                    <p class="artSets-item__price">${artSet_price_str}<span class="artSets-item__currency"> руб.</span></p>
                    <p class="artSets-size__caption">Размер</p>
                    <div class="artSets-sizes">`;
    artSet_i.sizes.forEach(element => {
        let sizesClassName = "artSets-sizes__name";
        if (element.size === artSet_i.currentSize){
            sizesClassName = "artSets-sizes__name artSets-sizes__name__active"; 
        }
        console.log(sizesClassName);
        artSet_code_item += `<div class="artSets-sizes-block">
                            <a href="#name${artSet_i.id+element.sizename}" class="${sizesClassName}" id="name${artSet_i.id+element.sizename}">${element.sizename}</a>
                            <div class="artSets-sizes__size">${element.size} см</div>
                        </div>`;
    });
    artSet_code_item += `</div>
                    <div class="artSets-btn__block">
                    <a class="artSets-btn">Заказать</a>
                    </div>
                    </div>`;
    artSet_code += artSet_code_item;
}

let carouselPages_code = "";

for (let j = 0; j < artSets.length / 3; j++){
    let pageClass = "artSets-carousel-pages";
    if (j === artSets_activePage){
        pageClass += " artSets-carousel__activePage";
    }
    carouselPages_code += `<div class="${pageClass}" id=${j}></div>`;
}

document.querySelector(".artSets-carousel").innerHTML = artSet_code;
document.querySelector(".artSets-carouselScroll").innerHTML = carouselPages_code;
document.querySelector(".artSets-carouselBlock").addEventListener('scroll', event => {artSets_scrollHandle(event)})