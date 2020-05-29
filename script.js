'use strict'

/**
 * 
 */
const OrderDialog = {
    name: 'order-dialog',
    props: ['name', 'price', 'selectedsize', 'sizes'],
    data: () => ({
        delivery: false,
        orderSize: "M",
        orderName: "Ваше имя",
        orderEmail: "pochta@mail.ru",
        orderPhone: "+7 (___) ___ __ __",
        orderAddress: "Адрес доставки",
        orderNotAccepted: true,
        phoneRegExp: /^\+*\d{1}\(?\d{3}\)?\d{3}-*\d{2}-*\d{2}$/,
    }),
    template: `<div class="orderDialogBck">
                    <div v-if="orderNotAccepted" class="orderDialog">
                        
                        <div class="contactUs-heading">
                        Оформление заказа
                        </div>
                        <button class="close-btn" @click="closeOrderDialog">X</button>
                            <div class="orderDialog-form">
                            <div class="v-carousel-item__name">
                            {{name}}
                            </div>
                            <div class="v-carousel-item__price">
                            {{this.prettify(price)}} руб.
                            </div>
                            <div class="v-carousel-item__sizeTitle">
                            Размер: {{this.orderSize}}
                                <div>
                                    Изменить размер:
                                    <select v-model="orderSize" class="orderDialog-select">
                                        <option v-for="size in sizes" v-bind:value="size.sizename">
                                            {{ size.sizename }} ({{ size.size }})
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="orderDialog-data">
                                <div class="v-carousel-item__sizeTitle">Ваши контактные данные:</div>
                                <label for="name" class="orderDialog-data-label">ФИО</label>
                                <input class="orderDialog-data-item" type="text" name="name" id="ordername" v-model="orderName" :placeholder="orderName">

                                <label for="phone" class="orderDialog-data-label">Телефон*</label>
                                <input required :class="phoneClass()" type="tel" name="phone" id="orderphone" v-model="orderPhone" :placeholder="orderPhone">

                                <label for="email" class="orderDialog-data-label">Почта</label>
                                <input class="orderDialog-data-item" type="email" name="email" id="orderemail" v-model="orderEmail" :placeholder="orderEmail">
                            </div>
                            <div class="orderDelivery">
                                
                                <input type="checkbox" class="orderDelivery-checkbox" v-model="delivery" name="deliveryFlag" id="deliveryFlag">
                                <label for="deliveryFlag" class="orderDelivery-checkbox-label">Включить доставку</label>
                                <div v-if="delivery">
                                    <label for="deliveryAddress" class="orderDialog-data-label">Адрес доставки:</label>
                                    <textarea class="orderDialog-data-item orderDialog-data-area" name="deliveryAddress" id="deliveryAddress" rows="4"
                                            v-model="orderAddress" :placeholder="orderAddress"></textarea>
                                </div>
                            </div>
                            <div class="orderDialog__required">* - обязательное поле заполнения</div>
                            <button type="submit" :class="orderBtnClass()" :disabled="!allowConfirm" @click="confirmOrder">Подтвердить заказ</button>
                            
                        </div>
                    </div>
                    <div v-else class="orderDialog__accepted">
                       <div class="v-carousel-item__name">Ваш заказ принят</div>
                       <button class="contactUs-btn" @click="closeOrderDialog">ОК</button>
                    </div>
                </div>`,
    mounted(){
        this.orderSize = this.selectedsize;
    },
    methods: {
        isValidPhone(myPhone) { 
            return this.phoneRegExp.test(myPhone.replace(/\s/g, '')); 
        },
        closeOrderDialog(){
            this.$emit('closeOrderDialog')
        },
        prettify(num) {
            var n = num.toString();
            return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
        },
        orderBtnClass(){
            return this.allowConfirm ? "contactUs-btn" : "contactUs-btn disabled-btn";
        },
        phoneClass(){
            return this.allowConfirm ? "orderDialog-data-item" : "orderDialog-data-item disabled-phone";
        },
        confirmOrder(){
            
            console.log('Ваш заказ:');
            console.log(this.name);
            console.log(this.prettify(this.price) + " руб.");
            console.log(this.orderSize);
            console.log('Ваши данные:');
            console.log(this.orderName);
            console.log(this.orderPhone);
            console.log(this.orderEmail);
            if (delivery) {
                console.log('Доставка по адресу:');
                console.log(this.orderAddress);
            }
            this.orderNotAccepted = false
        }
    },
    computed: {
        allowConfirm(){
            if (this.isValidPhone(this.orderPhone)){
                return true;
            } else {
                return false;
            }
        }
    } 
}
/**
 * Компонент карусели картинок набора
 */
const VCarouselImages = {
    name: 'v-carousel-images',
    props: ['images'],
    data: () => ({
        activeImage: 0,
    }),
    template: `<div class="v-carousel-image">
                <div :class="prevBtnClass()" @click="prevImage">
                    <div class="v-carousel-image__left__top"></div>
                    <div class="v-carousel-image__left__bottom"></div>
                </div>
                <div class="v-carousel-image__img">
                    <img :src="images[this.activeImage]" alt="Set picture" class="v-carousel-image__img__pic">
                </div>
                <div :class="nextBtnClass()" @click="nextImage">
                    <div class="v-carousel-image__right__top"></div>
                    <div class="v-carousel-image__right__bottom"></div>
                </div>
            </div>`,
    methods: {
        prevImage() {
            if (this.activeImage > 0) {
                this.activeImage -= 1;
            }
        },
        nextImage() {
            if (this.activeImage < this.images.length - 1) {
                this.activeImage += 1;
            }
        },
        prevBtnClass() {
            return this.activeImage > 0 ? "v-carousel-image__left v-carousel-image__left__active" : "v-carousel-image__left";
        },
        nextBtnClass() {
            return this.activeImage < this.images.length - 1 ? "v-carousel-image__right v-carousel-image__right__active" : "v-carousel-image__right";
        }
    }
};

/**
 * Компонент блока "размер"
 */
const vCarouselSizesBlock = {
    name: 'v-carousel-sizes-block',
    props: ['size', 'activeSize'],
    template: `<div class="v-carousel-sizes-block" @click="setActiveSize">
                <div :class="sizeBlockClass()">
                    {{size.sizename}}
                </div>
                <div class="v-carousel-sizes-block__sizevalue">
                    {{size.size}} см
                </div>
            </div>`,
    methods: {
        sizeBlockClass() {
            return this.size.sizename === this.activeSize ? "v-carousel-sizes-block__sizename v-carousel-sizes-block__sizename__active" : "v-carousel-sizes-block__sizename";
        },
        setActiveSize() {
            this.$emit('setActiveSize', this.size.sizename);
        }
    },
};

/**
 * Компонент блока "размеры"
 */
const VCarouselSizes = {
    name: 'v-carousel-sizes',
    props: ['sizes', 'activesize'],
    components: {
        vCarouselSizesBlock
    },
    data: () => ({
        // activeSize: "M",
    }),
    template: `<div class="v-carousel-sizes">
                <v-carousel-sizes-block v-for="size in sizes" :size="size" :activeSize="activesize" @setActiveSize = "setActiveSize" :key="size.sizename" />
            </div>`,
    methods: {
        setActiveSize(sizeName) {
            // this.activeSize = sizeName;
            this.$emit('changesize', sizeName);
        }
    }

};

const VCarouselDescriptionListItem = {
    name: 'v-carousel-description-list-item',
    props: ['description'],
    template: `<li class="v-carousel-description-list-item">
                <span>{{description}}</span>
            </li>`
};

/**
 * Компонент блока "карточка товара"
 */
const VCarouselItem = {
    name: 'v-carousel-item',
    props: ['card'],
    components: {
        VCarouselImages,
        VCarouselSizes,
        VCarouselDescriptionListItem,
        OrderDialog
    },
    data: () => ({
        descriptionOpened: false,
        orderDialogOpened: false,
        activeSize: "M",
    }),
    template: `<div class="v-carousel-item">
                    <v-carousel-images :images="card.picture" />
                    <div class="v-carousel-item__descBlock">
                        <div class="v-carousel-item__nameBlock">
                            <div class="v-carousel-item__name">{{card.name}}</div>
                            <div :class="this.detailsClass" @click="changeOpened">
                                <div class="v-carousel-item__name__details__left"></div>
                                <div class="v-carousel-item__name__details__right"></div>
                            </div>
                        </div>
                        <div :class="this.descriptionClass">
                            <div class="v-carousel-description-title">Описание:</div>
                            <ul class="v-carousel-description-list">
                                <v-carousel-description-list-item v-for="description in card.descriptions" :description="description" />
                            </ul>
                        </div>
                    
                        <div class="v-carousel-item__price">{{this.prettify(card.price)}} руб.</div>
                        <div class="v-carousel-item__sizeTitle">Размер</div>
                        <v-carousel-sizes :sizes="card.sizes" :activesize="activeSize" @changesize="changeSize"/>
                    </div>
                        <input type="button" class="v-carousel-item__button" value="Заказать" @click="openOrderDialog"></input>
                        <order-dialog v-if="this.orderDialogOpened" :name="card.name" :price="card.price" :selectedsize="activeSize" :sizes="card.sizes" @closeOrderDialog="closeOrderDialog" />
                </div>`,
    methods: {
        changeSize(newSize){
            this.activeSize = newSize;
        },
        prettify(num) {
            var n = num.toString();
            return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
        },
        changeOpened() {
            this.descriptionOpened = !this.descriptionOpened;
            // console.log('descriptionOpened', this.descriptionOpened);
        },
        closeOrderDialog() {
            this.orderDialogOpened = false;
        },
        openOrderDialog(){
            this.orderDialogOpened = true;
        }
    },
    computed: {
        descriptionClass() {
            return this.descriptionOpened ? "v-carousel-description" : "v-carousel-description v-carousel-description__hidden";
        },
        detailsClass() {
            return this.descriptionOpened ? "v-carousel-item__name__details" : "v-carousel-item__name__details v-carousel-item__name__details__rotated";
        }
    }

};

/**
 * Компонент карусели "Арт-наборы"
 */
const VCarousel = {
    name: 'v-carousel',
    props: ['artSetsData'],
    components: {
        VCarouselItem,
    },
    data: () => ({
        activePage: 0,
    }),
    // @wheel="scrollHandle"
    template: `<div class="v-carousel">
        <div class="v-carousel-inner">
            <v-carousel-item v-for="card in pageItems" :card = "card" :key="card.id" />
        </div>
        <div :class="btnLeftClass()" @click="scrollLeft">
            <div class="v-carousel-btn__left__up"></div>
            <div class="v-carousel-btn__left__down"></div>
        </div>
        <div :class="btnRightClass()" @click = "scrollRight">
            <div class="v-carousel-btn__right__up"></div>
            <div class="v-carousel-btn__right__down"></div>
        </div>
        <div class = "v-carousel-nav">
            <div v-for="ni in this.pageCount" :class="navItemClass(ni)" @click="setActivePage(ni)"></div>
        </div>
    </div>`,
    methods: {
        // innerClass(){
        //     return this.isDesctop ? "v-carousel-inner" : "v-carousel-inner__mobile";
        // }
        scrollLeft() {
            if (this.activePage > 0) {
                this.activePage -= 1;
            }
        },
        scrollRight() {
            if (this.activePage < this.pageCount - 1) {
                this.activePage += 1;
            }
        },
        navItemClass(itemId) {
            if (this.isDesctop) {
                return this.activePage === (itemId - 1) ? "v-carousel-nav-item v-carousel-nav-item__active" : "v-carousel-nav-item";
            } else {
                return "hidden";
            }
        },
        btnLeftClass() {
            return this.isDesctop ? this.activePage > 0 ? "v-carousel-btn__left v-carousel-btn__left__active" : "v-carousel-btn__left" : "hidden";
        },
        btnRightClass() {
            return this.isDesctop ? this.activePage < (this.pageCount - 1) ? "v-carousel-btn__right v-carousel-btn__right__active" : "v-carousel-btn__right" : "hidden";
        },
        setActivePage(navitemId) {
            this.activePage = navitemId - 1;
        },
        scrollHandle(event) {
            event.preventDefault();
            if (event.deltaY > 0) {
                this.scrollRight();
            } else if (event.deltaY < 0) {
                this.scrollLeft();
            }
        }

    },
    computed: {
        isDesctop() {
            return screen.width > 767 ? true : false
        },
        pageItems() {
            let itemsCount = this.isDesctop ? 3 : this.artSetsData.length;
            // let itemsCount = 3;
            return this.artSetsData.slice(this.activePage * itemsCount, this.activePage * itemsCount + itemsCount)
        },
        pageCount() {
            return this.isDesctop ? Math.ceil(this.artSetsData.length / 3) : this.artSetsData.length;

        },

    }
};

const app = new Vue({
    el: '#app',
    data: {
        artSetsData: [
            {
                id: 1,
                picture: ["./img/artSet_img.png", "./img/artSets-logo.png", "./img/artSet_img.png"],
                name: "Название",
                descriptions: ["Холст на подрамнике", "Краски", "Перчатки, защитная пленка", "Инструкция"],
                price: 1100,
                sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
                currentSize: 30
            },
            {
                id: 2,
                picture: ["./img/artSet_img.png", "./img/artSet_img.png", "./img/artSet_img.png"],
                name: "Название 2",
                descriptions: ["Холст на подрамнике", "Краски", "Перчатки, защитная пленка", "Инструкция"],
                price: 1200,
                sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
                currentSize: 30
            },
            {
                id: 3,
                picture: ["./img/artSet_img.png", "./img/artSet_img.png", "./img/artSet_img.png"],
                name: "Название 3",
                descriptions: ["Холст на подрамнике", "Краски", "Перчатки, защитная пленка", "Инструкция"],
                price: 1300,
                sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
                currentSize: 30
            },
            {
                id: 4,
                picture: ["./img/artSet_img.png", "./img/artSet_img.png", "./img/artSet_img.png"],
                name: "Название 4",
                descriptions: ["Холст на подрамнике", "Краски", "Перчатки, защитная пленка", "Инструкция"],
                price: 1400,
                sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
                currentSize: 30
            },
            {
                id: 5,
                picture: ["./img/artSet_img.png", "./img/artSet_img.png", "./img/artSet_img.png"],
                name: "Название 5",
                descriptions: ["Холст на подрамнике", "Краски", "Перчатки, защитная пленка", "Инструкция"],
                price: 1500,
                sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
                currentSize: 30
            },
            {
                id: 6,
                picture: ["./img/artSet_img.png", "./img/artSet_img.png", "./img/artSet_img.png"],
                name: "Название 6",
                descriptions: ["Холст на подрамнике", "Краски", "Перчатки, защитная пленка", "Инструкция"],
                price: 1600,
                sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
                currentSize: 30
            }
        ]

    },
    components: {
        VCarousel,
    },
    methods: {},
    // computed:{
    //     isDesctop(){
    //         return screen.width > 767 ? true : false;
    //     }
    // }
});


window.onload = function () {

    window.onresize = setStyle;

    function setStyle() {
        let elements = [...document.querySelectorAll('.text')];
        let buttons = [...document.querySelectorAll('.check-btn')];
        let lastItems = [...document.querySelectorAll('.lastItem')];

        if (window.matchMedia("(min-width: 576px)").matches) {
            elements.forEach(item => {
                item.style.display = "block";
            });
        } else {
            elements.forEach(item => {
                item.style.display = "none";
            });
            buttons.forEach(button => {
                button.removeAttribute('open');
            });
            lastItems.forEach(lastItem => {
                lastItem.removeAttribute('open');
            });
        }
    }

    document.querySelectorAll(".check-btn").forEach(function (element) {
        element.addEventListener("click", function () {

                let display = this.parentNode.querySelector("p").style.display;

                if (display === "block") {
                    this.parentNode.querySelector("p").style.display = "none";
                    element.removeAttribute('open');
                } else {
                    this.parentNode.querySelector("p").style.display = "block";
                    element.setAttribute('open', 'open');
                }

                let lastItem = this.parentNode.classList.contains("lastItem");

                if (lastItem && !element.parentElement.hasAttribute('open')) {
                    element.parentElement.setAttribute('open', 'open');
                } else if (lastItem && element.parentElement.hasAttribute('open')) {
                    element.parentElement.removeAttribute('open');
                }


            },
            false)
    });
}


/*FORM----------------------------------------------START*/

let hiddenForm = document.querySelector('.contactUs');

function formClose(event) {
    // event.preventDefault();
    hiddenForm.style.display = "none";
}

let closeButton = document.querySelector(".close-btn");
closeButton.addEventListener('click', formClose, false);

function formOpen() {
    hiddenForm.style.display = "block";
}

let openButtons = document.querySelectorAll(".open-contactUs");
openButtons.forEach(element => {
    element.addEventListener('click', formOpen, false);
})


/*FORM-VALIDATION*/


let submitButton = hiddenForm.querySelector('.contactUs-btn');

hiddenForm.addEventListener('submit', function (event) {
    event.preventDefault();
}, false);



/*FORM---------------------------------------------------END*/