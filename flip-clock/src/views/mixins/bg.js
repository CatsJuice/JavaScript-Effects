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
        },
        activePageIndex() {
            return this.$store.state.activePageIndex
        },
        imgs() {
            const { publicList, privateList } = this.$store.state
            return publicList.concat(privateList)
        }
    },
    watch: {
        activePageIndex(index) {
            this.swiper.slideTo(index, 1000, false)
        }
    },
    methods: {
        callback(val) {
            console.log(val)
        }
    },
    mounted() {

    }
}