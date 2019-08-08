
const vm = new Vue({
    el: "#app",
    data: {
        y: '0000',
        m: '00',
        d: '00',
        h1: '0',
        h2: '0',
        m1: '0',
        m2: '0',
        s1: '0',
        s2: '0',


        style_h1: '',
        style_h2: '',
        style_m1: '',
        style_m2: '',
        style_s1: '',
        style_s2: '',

        interval: null,

        lunbo: [],
        current_lunbo: 0,
        left: 0,
        temp_left: "",
        is_mobile: '',
        words_color: "#fff",

        // 触摸
        touchStart_X: undefined,
        touchMove_X: undefined,
        touchEnd_X: undefined,
        screenWidth: 0,
        move_x: 0,

        // 设置
        show_setting: false,
        file: '',

        // 搜索
        search_extend: false,
        search_content: '',
        search_placeholder: '',
    },
    methods: {
        switch_bg(id) {
            // console.log(id);
            this.current_lunbo = id;
            // this.move_x = 0;
            // if (id == 0 || id == 1 || id == 3)
            //     this.words_color = "#fff"
            // else
            //     this.words_color = "#000"
        },
        handleTouchStart(e) {
            // e.preventDefault();
            // console.log(`TOUCH_START: ${e.touches[0].clientX}`);
            this.touchStart_X = e.touches[0].clientX;
            this.temp_left = this.left
        },
        handleTouchMove(e) {
            // e.preventDefault();
            // console.log(`TOUCH_MOVE: ${e.touches[0].clientX}`);
            this.touchMove_X = e.touches[0].clientX;
            offset = this.touchMove_X - this.touchStart_X;

            // this.move_x = offset
            document.querySelector('.lunbo').style.transform = `translateX(${offset}px)`;
            // console.log(this.left);

        },
        handleTouchtouchend(e) {
            // console.log(`TOUCH_END: ${this.touchMove_X}`);
            offset = this.touchMove_X - this.touchStart_X;
            if (Math.abs(offset / this.screenWidth) > 0.2) {
                if (offset > 0) {
                    // this.current_lunbo = this.current_lunbo - 1 < 0 ? 0 : this.current_lunbo - 1;
                    let i = 0
                    this.lunbo.forEach((item, index) => {
                        if (this.current_lunbo == item.id) {
                            if (index - 1 > 0) i = index - 1
                            return false
                        }
                    });
                    this.current_lunbo = this.lunbo[i]['id']
                } else if (offset < 0) {
                    let i = this.lunbo.length - 1
                    this.lunbo.forEach((item, index) => {
                        if (this.current_lunbo == item.id) {
                            if (index + 1 < this.lunbo.length) {
                                i = index + 1;
                            }
                            return false
                        }
                    });
                    this.current_lunbo = this.lunbo[i]['id']

                    // console.log(this.current_lunbo)
                }
            }
            // this.move_x = 0
            this.touchStart_X = undefined
            this.touchMove_X = undefined
            this.touchEnd_X = undefined
            document.querySelector('.lunbo').style.transform = `translateX(0px)`;
        },
        updateLunboImg() {
            init_data = [
                { id: 0, color: 'light', src: "./img/a.jpg" },
                { id: 1, color: 'light', src: "./img/b.jpg" },
                { id: 2, color: 'light', src: "./img/c.jpg" },
                { id: 3, color: 'light', src: "./img/d.jpg" }
            ]
            // this.lunbo = JSON.parse(localStorage.getItem('catsjuice_lunbo_img') || init_data);
            if (localStorage.getItem('catsjuice_lunbo_img') && JSON.parse(localStorage.getItem('catsjuice_lunbo_img')).length > 0) {
                // console.log(localStorage.getItem('catsjuice_lunbo_img'))
                this.lunbo = JSON.parse(localStorage.getItem('catsjuice_lunbo_img'));

            } else {
                localStorage.setItem('catsjuice_lunbo_img', JSON.stringify(init_data));
                this.updateLunboImg();
            }
        },
        switch_setting() {
            this.show_setting = !this.show_setting
        },
        delete_img(id) {
            localStorage.setItem('catsjuice_lunbo_img', JSON.stringify(
                JSON.parse(localStorage.getItem('catsjuice_lunbo_img') || '[]').filter(item => item.id != id)
            ));
            this.updateLunboImg();
        },
        click_select_file() {
            this.$refs.file_select.click();
        },
        add_img(event) {
            // console.log(this.file)
            // this.updateLunboImg();
            this.file = event.target.files[0];
            // console.log(this.file)
            var formData = new FormData();
            formData.append('file', this.file);
            this.$http.post('https://catsjuice.cn/clock/api/upload.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(function (res) {
                    // document.write(res.body);
                    console.log(res.body)
                    if (res.body.img_receiver_result == 1) {
                        window.alert('上传失败, 文件可能过大');
                        return
                    }
                    let url = res.body.file_path;
                    lunbo = JSON.parse(localStorage.getItem('catsjuice_lunbo_img'));
                    new_item = {
                        id: `${Date.now()}_${Math.ceil(Math.random() * 1000)}`,
                        color: 'light',
                        src: url
                    }
                    lunbo.push(new_item);
                    localStorage.setItem('catsjuice_lunbo_img', JSON.stringify(lunbo));

                    if (res.body.status === 0) {
                        // window.alert('上传成功');
                        // setTimeout( () => { this.updateLunboImg()}, 2000);
                        this.updateLunboImg();
                    } else {
                        window.alert('上传失败');
                    }

                }, function (res) {
                    console.log(res.status);
                });

            // lunbo = JSON.parse(localStorage.getItem('catsjuice_lunbo_img'));
            // new_item = {
            //     id: `${Date.now()}_${Math.random}`,
            //     src: this.file
            // }
            // lunbo.push(new_item);
            // localStorage.setItem('catsjuice_lunbo_img', JSON.stringify(lunbo));
            // this.updateLunboImg();
        },
        search_hover() {
            this.search_extend = true
        },
        search_blur() {
            if (!this.search_content.length > 0) {
                this.search_extend = false
            }
        },
        do_search() {
            if (!this.search_content.length > 0) return
            // console.log(this.search_content)
            keywords = this.search_content.split(' ')
            console.log(keywords)
            str = keywords.join("%20")
            window.open('http://www.baidu.com/s??ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=' + str)
        },
        switch_color(id) {
            lunbo = JSON.parse(localStorage.getItem('catsjuice_lunbo_img'));
            let temp = []
            lunbo.forEach((item) => {
                let dic = item
                if (item.id == id){
                    if (item.color && item.color=="light"){
                        dic['color'] = 'dark'
                    } else {
                        dic['color'] = 'light'
                    }
                }
                temp.push(dic)
            })
            localStorage.setItem('catsjuice_lunbo_img', JSON.stringify(temp));
            this.updateLunboImg();
            this.update_word_color();
        },
        update_word_color() {
            this.lunbo.forEach( item=> {
                if (item.id == this.current_lunbo)
                    this.words_color = item.color=='dark'?'#000':'#fff'
            })
        }
    },
    mounted() {
        this.intervalL = setInterval(() => {
            datetime = new Date();
            this.y = datetime.getFullYear();
            this.m = (datetime.getMonth() + 1).toString().padStart(2, "0");
            this.d = datetime.getDate().toString().padStart(2, "0");
            var hh = datetime.getHours().toString().padStart(2, "0");
            var mm = datetime.getMinutes().toString().padStart(2, "0");
            var ss = datetime.getSeconds().toString().padStart(2, "0");

            // this.last_h1 = this.h1
            // this.last_h2 = this.h2
            // this.last_m1 = this.m1
            // this.last_m2 = this.m2
            // this.last_s1 = this.s1
            // this.last_s2 = this.s2
            // console.log(`${hh}:${mm}:${ss}`)
            if (this.h1 != hh.substring(0, 1)) {
                this.style_h1 = 'active';
                this.h1 = hh.substring(0, 1);
                setTimeout(() => { this.style_h1 = '' }, 800);
            }
            if (this.h2 != hh.substring(1)) {
                this.style_h2 = 'active';
                this.h2 = hh.substring(1);
                setTimeout(() => { this.style_h2 = '' }, 800);
            }
            if (this.m1 != mm.substring(0, 1)) {
                this.style_m1 = 'active';
                this.m1 = mm.substring(0, 1);
                setTimeout(() => { this.style_m1 = '' }, 800);
            }
            if (this.m2 != mm.substring(1)) {
                this.style_m2 = 'active';
                this.m2 = mm.substring(1);
                setTimeout(() => { this.style_m2 = '' }, 800);
            }
            if (this.s1 != ss.substring(0, 1)) {
                this.style_s1 = 'active';
                this.s1 = ss.substring(0, 1);
                setTimeout(() => { this.style_s1 = '' }, 800);
            }
            this.style_s2 = 'active';
            this.s2 = ss.substring(1);
            setTimeout(() => { this.style_s2 = '' }, 800);

            // console.log(`${this.h1}${this.h2}:${this.m1}${this.m2}:${this.s1}${this.s2}`)

        }, 1000)
        this.left = this.current_lunbo * 100 == 0 ? "0" : this.current_lunbo * -100;
        // console.log(navigator.userAgent)
        ua = navigator.userAgent;
        mobile = ["iPhone", "iPod", "Android"];
        this.is_mobile = mobile.some(item => ua.indexOf(item) > -1);

        //var target = document.querySelector(".lunbo");
        window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        window.addEventListener('touchend', this.handleTouchtouchend, { passive: false });

        // 
        window.onresize = () => {
            return (() => {
                this.screenWidth = document.body.clientWidth
            })()
        }
        this.screenWidth = document.body.clientWidth;
        this.updateLunboImg();
        this.update_word_color();
    },
    watch: {
        current_lunbo(id) {
            this.lunbo.forEach((item, index) => {
                if (item.id == id){
                    this.left = index * -100;
                    this.words_color = item.color=='dark'?'#000':'#fff'
                }
            })

        },
        show_setting(flag) {
            if (flag) {
                this.$refs.main.style.top = '30vh'
                window.removeEventListener('touchstart', this.handleTouchStart);
                window.removeEventListener('touchmove', this.handleTouchMove);
                window.removeEventListener('touchend', this.handleTouchtouchend);
            }
            else {
                this.$refs.main.style.top = '50vh'
                window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
                window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
                window.addEventListener('touchend', this.handleTouchtouchend, { passive: false });

            }
        },
        search_extend(flag) {
            if (flag) {
                this.$refs.main.style.top = '40vh'
                this.search_placeholder = '在此搜索'
            }
            else {
                this.$refs.main.style.top = '50vh'
                this.search_placeholder = ''
                this.$refs.search_input.blur()
            }
        }
    }
})
