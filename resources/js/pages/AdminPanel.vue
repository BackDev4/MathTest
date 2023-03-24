<template>
    <SideBar/>
    <div class="container" style="padding-top: 20px">
        <Main/>
    </div>
</template>

<script>

import Main from "../components/admin/Main.vue"
import SideBar from "../components/admin/SideBar.vue";

export default {
    name: "AdminPanel",
    components: {
        Main,
        SideBar,
    }
}
</script>

<style scoped>

</style>
