'use strict'
/**
 * Компонент карусели картинок набора
 */
const VCarouselImages = {
    name: 'v-carousel-images',
    props: ['images'],
    data: () =>({
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
        prevImage(){
            if (this.activeImage > 0){
                this.activeImage -=1;
            }
        },
        nextImage(){
            if (this.activeImage < this.images.length - 1){
                this.activeImage +=1;
            }
        },
        prevBtnClass(){
            return this.activeImage > 0 ? "v-carousel-image__left v-carousel-image__left__active" : "v-carousel-image__left";
        },
        nextBtnClass(){
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
        sizeBlockClass(){
            return this.size.sizename === this.activeSize ? "v-carousel-sizes-block__sizename v-carousel-sizes-block__sizename__active" : "v-carousel-sizes-block__sizename";
        },
        setActiveSize(){
            this.$emit('setActiveSize',  this.size.sizename);
        }
    },
};

/**
 * Компонент блока "размеры"
 */
const VCarouselSizes = {
    name: 'v-carousel-sizes',
    props: ['sizes'],
    components: {
        vCarouselSizesBlock
    },
    data: () =>({
        activeSize: "M",
    }),
    template: `<div class="v-carousel-sizes">
                <v-carousel-sizes-block v-for="size in sizes" :size="size" :activeSize="activeSize" @setActiveSize = "setActiveSize" :key="size.sizename" />
            </div>`,
    methods:{
        setActiveSize(sizeName){
            this.activeSize = sizeName;
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
        VCarouselDescriptionListItem
    },
    data: () =>({
        descriptionOpened: false,
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
                        <v-carousel-sizes :sizes="card.sizes" />
                    </div>
                        <input type="button" class="v-carousel-item__button" value="Заказать"></input>
                    
                </div>`,
    methods:{
        prettify(num) {
            var n = num.toString();
            return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
        },
        changeOpened(){
            this.descriptionOpened = !this.descriptionOpened;
            console.log('descriptionOpened', this.descriptionOpened);
        }
    },
    computed:{
        descriptionClass(){
            return this.descriptionOpened ? "v-carousel-description" : "v-carousel-description v-carousel-description__hidden";
        },
        detailsClass(){
            return this.descriptionOpened ? "v-carousel-item__name__details" : "v-carousel-item__name__details v-carousel-item__name__details__rotated";
        }
    }

};

/**
 * Компонент карусели "Арт-наборы"
 */
const VCarousel = {
    name: 'v-carousel',
    props:['artSetsData'], 
    components: {
        VCarouselItem,
    },
    data: () =>({
        activePage: 0,
    }),
    template: `<div class="v-carousel">
        <div class="v-carousel-inner" @wheel="scrollHandle">
            <v-carousel-item v-for="card in pageItems" :card = "card" :key="card.id" />
        </div>
        <div :class="btnLeftClass()" @click="scrollLeft"><p>&lt;</p></div>
        <div :class="btnRightClass()" @click = "scrollRight"><p>&gt;</p></div>
        <div class = "v-carousel-nav">
            <div v-for="ni in this.pageCount" :class="navItemClass(ni)" @click="setActivePage(ni)"></div>
        </div>
    </div>`,
    methods: {
        scrollLeft(){
            if (this.activePage > 0){
                this.activePage -= 1;
            }
        },
        scrollRight(){
            if (this.activePage <  this.pageCount - 1){
               this.activePage += 1;
            }
        },
        navItemClass(itemId){
            return this.activePage === (itemId - 1) ? "v-carousel-nav-item v-carousel-nav-item__active" : "v-carousel-nav-item";
        },
        btnLeftClass(){
            return this.activePage > 0 ? "v-carousel-btn__left v-carousel-btn__left__active": "v-carousel-btn__left";
        },
        btnRightClass(){
            return this.activePage < (this.pageCount - 1) ? "v-carousel-btn__right v-carousel-btn__right__active": "v-carousel-btn__right";
        },
        setActivePage(navitemId){
            this.activePage = navitemId - 1;
        },
        scrollHandle(event){
            event.preventDefault();
            if (event.deltaY > 0){
                this.scrollRight();
            } else if (event.deltaY < 0){
                this.scrollLeft();
            }
        }

    },
    computed: {
        isDesctop(){
            return screen.width > 767 ? true : false
        },
        pageItems(){
            let itemsCount = this.isDesctop ? 3 : 1;
            return this.artSetsData.slice(this.activePage * itemsCount, this.activePage * itemsCount + itemsCount)
        },
        pageCount(){
            return this.isDesctop ? Math.ceil(this.artSetsData.length / 3) : this.artSetsData.length;
            
        },
        
    }
};

const app = new Vue({
    el: '#app',
    data:{
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
    components:{
        VCarousel,
    },
    methods:{
        
    },
    // computed:{
    //     isDesctop(){
    //         return screen.width > 767 ? true : false;
    //     }
    // }
});