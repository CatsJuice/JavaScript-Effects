export default {
    data() {
        return {

        }
    },
    methods: {
        uploadImg(event) {
            const size = event.target.files[0].size // 字节； / 1024 = KB ; /1024/1024 = MB

            let formData = new FormData();
            formData.append(encodeURI(event.target.files[0].name), event.target.files[0]);
            this.$axios({
                method: "post",
                url: `${this.$server_root}/galary/upload`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log(res)
                if (res.data.status === 0) {
                    this.getGalaryList()
                } else {
                    this.$notify({
                        position: "top-left",
                        type: "error",
                        title: "上传失败",
                        message: res.data.msg
                    })
                    if (res.data.status === 100) {
                        this.$router.replace({ path: "/signin" })
                    }
                }
            })
        },

        deleteBg(id) {
            this.$axios({
                method: "get",
                url: `${this.$server_root}/galary/delete`,
                params: {
                    id
                }
            }).then(res => {
                if (res.data.status === 0) this.getGalaryList()
                else {
                    this.$notify({
                        position: "top-left",
                        type: "error",
                        title: "删除失败",
                        message: res.data.msg
                    })
                }
            })
        }
    }
}