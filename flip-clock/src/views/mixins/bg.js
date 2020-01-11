export default {
    data() {
        return {
            swiperOption: {
                flipEffect: {
                    rotate: 30,
                    slideShadows: true,
                },
                cubeEffect: {
                    slideShadows: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
                virtual: false
            }
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    methods: {
        callback(val) {
            console.log(val)
        }
    },
    mounted() {
        console.log('this is current swiper instance object', this.swiper)
        this.swiper.slideTo(3, 1000, false)
    }
}