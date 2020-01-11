<template>
    <div>
        <header>Sign IN</header>
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
export default {
    mounted() {
        this.checkLoginStatus()
    },
    methods: {
        checkLoginStatus() {
            
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    width: calc(100% - 50px);
    height: 44px;
    line-height: 44px;
    margin: 13px 0;
    padding-left: 15px;
    font-family: 'ubuntu-medium';
    
    font-weight: bold;
    font-size: 1.4rem;
    color: #34495E;
    border-left: 10px solid #34495E;
}
</style>