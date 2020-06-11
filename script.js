'use strict'

/**
 *
 */
const OrderDialog = {
    name: 'order-dialog',
    props: ['name', 'price', 'selectedsize', 'sizes', 'picture'],
    data: () => ({
        delivery: false,
        orderSize: "M",
        orderName: null,
        orderEmail: null,
        orderPhone: null,
        orderAddress: null,
        orderNotAccepted: true,
        phoneRegExp: /^\+*\d{1}\(?\d{3}\)?\d{3}-*\d{2}-*\d{2}$/,
    }),
    template: `<div class="orderDialogBck" @keydown.27="closeOrderDialog">
                    <div v-if="orderNotAccepted" class="orderDialog">
                        
                        <div class="orderDialog-heading">
                        Заполните заявку
                        
                        <button class="close-btn" @click="closeOrderDialog">X</button>
                        </div>
                        <div class="orderDialog-form">
                           
                            <div class="orderDialog-data">
                                <label for="ordername" class="orderDialog-data-label">ФИО</label>
                                <input class="orderDialog-data-item" type="text" name="ordername" id="ordername" v-model="orderName" placeholder="Ваше имя">

                                <label for="orderphone" class="orderDialog-data-label">Телефон*</label>
                                <input required :class="phoneClass()" type="tel" name="orderphone" id="orderphone" v-model="orderPhone" placeholder="+7 (___) ___ __ __">

                                <label for="orderemail" class="orderDialog-data-label">Почта</label>
                                <input class="orderDialog-data-item" type="email" name="orderemail" id="orderemail" v-model="orderEmail" placeholder="pochta@mail.ru">

                            </div>
                            <div class="orderDialog-data-label orderDialog-data-label__order">
                            Заказ
                            </div>
                            <div class="orderDialog-order">
                                <div class="orderDialog-order-img">
                                <img :src="picture[0]" alt="ArtSet picture" class="orderDialog-order-img__first">
                                </div>
                                <div class="orderDialog-order-details">
                                    <table class="orderDialog-order-table">
                                        <tr>
                                            <td>Название:</td>
                                            <td>{{name}}</td>
                                        </tr>
                                        <tr>
                                            <td>Размер:</td>
                                            <td>{{this.orderSize}}</td>
                                        </tr>
                                        <tr>
                                            <td>Цена:</td>
                                            <td>{{this.prettify(price)}} руб.</td>
                                        </tr>
                                    </table>
                                    
                                </div>
                            </div>
                            
                            <div class="orderDialog__required">* - обязательное поле заполнения</div>
                            <button type="submit" :class="orderBtnClass()" :disabled="!allowConfirm" @click="confirmOrder">Отправить</button>
                            
                        </div>
                    </div>
                    <div v-else class="orderDialog__accepted">
                       <div class="orderDialog__accepted__text">Ваш заказ принят!</div>
                       <div class="orderDialog__accepted__text">Скоро мы с Вами свяжемся</div>
                       <div class="orderDialog__accepted__close" @click="closeOrderDialog"></div>
                    </div>
                </div>`,
    mounted() {
        this.orderSize = this.selectedsize;
    },
    methods: {
        isValidPhone(myPhone) {
            if (myPhone) {
                return this.phoneRegExp.test(myPhone.replace(/\s/g, ''));
            } else {
                return false;
            }
        },
        closeOrderDialog() {
            this.$emit('closeOrderDialog')
        },
        prettify(num) {
            var n = num.toString();
            return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
        },
        orderBtnClass() {
            return this.allowConfirm ? "contactUs-btn" : "contactUs-btn disabled-btn";
        },
        phoneClass() {
            return this.allowConfirm ? "orderDialog-data-item" : "orderDialog-data-item error";
        },
        confirmOrder() {

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
        allowConfirm() {
            if (this.isValidPhone(this.orderPhone)) {
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
                                <v-carousel-description-list-item v-for="(description, idx) in card.descriptions" :description="description" :key="getDescKey(idx)" />
                            </ul>
                        </div>
                    
                        <div class="v-carousel-item__price">{{this.prettify(cardPrice)}} руб.</div>
                        <div class="v-carousel-item__sizeTitle">Размер</div>
                        <v-carousel-sizes :sizes="card.sizes" :activesize="activeSize" @changesize="changeSize"/>
                    </div>
                        <input type="button" class="v-carousel-item__button" value="Заказать" @click="openOrderDialog"></input>
                        <order-dialog v-if="this.orderDialogOpened" :name="card.name" :price="cardPrice" :selectedsize="activeSize" :sizes="card.sizes" :picture="card.picture" @closeOrderDialog="closeOrderDialog" />
                </div>`,
    methods: {
        changeSize(newSize) {
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
        openOrderDialog() {
            this.orderDialogOpened = true;
        },
        getDescKey(idx) {
            return "desc" + this.card.id + idx.toString();
        }
    },
    computed: {
        descriptionClass() {
            return this.descriptionOpened ? "v-carousel-description" : "v-carousel-description v-carousel-description__hidden";
        },
        detailsClass() {
            return this.descriptionOpened ? "v-carousel-item__name__details" : "v-carousel-item__name__details v-carousel-item__name__details__rotated";
        },
        cardPrice() {
            if (this.activeSize === "S") {
                return 700;
            } else if (this.activeSize === "M") {
                return 1500;
            } else {
                return 2500;
            }
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
                picture: ["./img/set_1.jpg", "./img/photo_1.jpg"],
                name: "Море",
                descriptions: ["Холст на подрамнике", "Краски", "Перчатки, защитная пленка", "Инструкция"],
                price: 1100,
                sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
                currentSize: 30
            },
            {
                id: 2,
                picture: ["./img/set_2.jpg", "./img/photo_2.jpg"],
                name: "Мрамор",
                descriptions: ["Холст на подрамнике", "Краски", "Перчатки, защитная пленка", "Инструкция"],
                price: 1200,
                sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
                currentSize: 30
            },
            {
                id: 3,
                picture: ["./img/set_3.jpg", "./img/photo_3.jpg"],
                name: "Изумруд",
                descriptions: ["Холст на подрамнике", "Краски", "Перчатки, защитная пленка", "Инструкция"],
                price: 1300,
                sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
                currentSize: 30
            },
            {
                id: 4,
                picture: ["./img/photo_4.jpg", "./img/set_4.jpg"],
                name: "Срез дерева",
                descriptions: ["Холст на подрамнике", "Краски", "Перчатки, защитная пленка", "Инструкция"],
                price: 1400,
                sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
                currentSize: 30
            },
            {
                id: 5,
                picture: ["./img/photo_5.jpg", "./img/set_5.jpg"],
                name: "Океан",
                descriptions: ["Холст на подрамнике", "Краски", "Перчатки, защитная пленка", "Инструкция"],
                price: 1500,
                sizes: [{sizename: "S", size: 30}, {sizename: "M", size: 40}, {sizename: "L", size: 50}],
                currentSize: 30
            },
            {
                id: 6,
                picture: ["./img/photo_6.jpg", "./img/set_6.jpg"],
                name: "Венера",
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


/*FORM-----------------------------------------------------------------------------------------------------------START*/


let hiddenFormContainer = document.querySelector('.contactUs');
let hiddenForm = document.querySelector('.contactUs-form');
let confirm = document.querySelector('.confirm');

let closeButton = document.querySelector(".close-btn");
let confirmCloseButton = document.querySelector(".confirm-close-btn");

closeButton.addEventListener('click', function () {
    hiddenFormContainerClose();
}, false);

confirmCloseButton.addEventListener('click', function () {
    hiddenFormContainerClose();
}, false);


/**
 * Поведение формы при отправке
 * */
hiddenForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let valid = formValidate();

    if (valid) {
        formSubmit();
    }

}, false);

/**
 *
 * */
function formSubmit() {
    let formData = new FormData(hiddenForm);

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            formClose();
            confirmOpen();
        }
    }

    request.open('POST', 'php/e-mail.php');
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(formData);
}

/**
 * Закрытие контейнера формы
 * */
function hiddenFormContainerClose() {
    formClose()
    confirmClose()
    hiddenFormContainer.style.display = "none";
}

/**
 * Закрытие формы
 * */
function formClose() {
    hiddenForm.style.display = "none";
}

/**
 * Открытие формы
 * */
function formOpen() {
    hiddenFormContainer.style.display = "block";
    hiddenForm.style.display = "block";
}

let openButtons = document.querySelectorAll(".open-contactUs");
openButtons.forEach(element => {
    element.addEventListener('click', formOpen, false);
})

/**
 * Открытие подтверждения об успешной отправке формы
 * */
function confirmOpen() {
    confirm.style.display = "block";
}

/**
 * Открытие подтверждения об успешной отправке формы
 * */
function confirmClose() {
    confirm.style.display = "none";
}


/*__________________FORM-VALIDATION-----------------------------------------------------------------------------------*/


let submitButton = hiddenFormContainer.querySelector('.contactUs-btn');
let requiredText = hiddenFormContainer.querySelector('.required-text');
let phoneField = hiddenFormContainer.querySelector('#phone');
let emailField = hiddenFormContainer.querySelector('#email');

let requiredItems = [phoneField, emailField]; //поля ввода, которые нужно валидировать

/**
 * Обработчики события конкретно на те поля ввода, которые нужно валидировать
 * 1) валидация по событию 'blur'
 * 2) валидация по событию 'input'
 * */
requiredItems.forEach(formField => {
    formField.addEventListener('blur', formValidate, false);
})
requiredItems.forEach(formField => {
    formField.addEventListener('input', formValidate, false);
})

/**
 * Общая функция валидации формы
 * */
function formValidate() {
    let checkPhone = isValidPhone(phoneField.value);
    let checkEmail = isValidEmail(emailField.value);

    clearErrors();

    if (phoneField.value.length === 0) {
        addErrorEmptyField();
    } else if (!checkPhone) {
        addErrorWrongPhone();
    }

    if (!checkEmail) addErrorWrongMail();

    if (checkPhone && checkEmail) return true;
}

/**
 * Валидация поля ввода телефонного номера
 * */
function isValidPhone(phone) {
    return /^\+7\s\([3489][0-9]{2}\)\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}$/.test(phone);
    // return /^((8|\+7)[-\(]?[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(phone); // источник https://habr.com/ru/post/110731/
}

/**
 * Валидация поля ввода электронной почты
 * */
function isValidEmail(mail) {
    // источник https://web.izjum.com/regexp-email-url-phone
    return /^(?! )$|^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,4}$/.test(mail);
}

/**
 * Предварительная очистка классов предупреждения об ошибке со всех элементов
 * */
function clearErrors() {
    phoneField.classList.remove('error');
    emailField.classList.remove('error');
    requiredText.classList.remove('required-red');
    submitButton.classList.remove('btn-empty-field');
    submitButton.classList.remove('btn-error');
    changeBtnValue("Отправить");
}

/**
 * Добавление классов предупреждения об ошибке при пустом поле ввода телефонного номера
 * */
function addErrorEmptyField() {
    phoneField.classList.add('error');
    requiredText.classList.add('required-red');
    submitButton.classList.add('btn-empty-field');
}

/**
 * Добавление классов предупреждения об ошибке при неправильном вводе телефонного номера
 * */
function addErrorWrongPhone() {
    phoneField.classList.add('error');
    submitButton.classList.add('btn-error');
    changeBtnValue("Ошибка");
}

/**
 * Добавление классов предупреждения об ошибке при неправильном вводе электронной почты
 * */
function addErrorWrongMail() {
    emailField.classList.add('error');
    submitButton.classList.add('btn-error');
    changeBtnValue("Ошибка");
}

/**
 * Изменение названия кнопки - submitButton
 * */
function changeBtnValue(buttonValue) {
    if (buttonValue) {
        submitButton.value = buttonValue;
    }
}


/*___________________________маска для ввода телефонного номера_______________________________________________________*/


// https://javascript.ru/forum/dom-window/63870-kak-sdelat-masku-telefona-v-input-c-7-___-bez-jquery-4.html

/**
 * маска для ввода телефонного номера
 * */
window.addEventListener("DOMContentLoaded", function () {
    function setCursorPosition(pos, elem) {
        // elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        /* else if (elem.createTextRange) {
             var range = elem.createTextRange();
             range.collapse(true);
             range.moveEnd("character", pos);
             range.moveStart("character", pos);
             range.select()
         }*/
    }

    function mask(event) {
        if (this.selectionStart < 3) event.preventDefault();

        let matrix = "+7 (___) ___ __ __",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");

        if (def.length >= val.length) val = def;

        this.value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) : a
        });

        i = this.value.indexOf("_");

        if (event.key === "Backspace") i = this.value.lastIndexOf(val.substr(-1)) + 1;

        if (i !== -1) {
            i < 5 && (i = 3);
            this.value = this.value.slice(0, i);
        }

        if (event.type === "blur") {
            if (this.value.length < 5) this.value = ""
        } else setCursorPosition(this.value.length, this);

    }

    let input = document.querySelector("#phone");
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
});


/*___________________________маска для ввода телефонного номера_______________________________________________________*/


/*FORM-------------------------------------------------------------------------------------------------------------END*/
