<template>
    <Header/>
    <div class="container">
        <div class="card">

        </div>
    </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
    name: "Users",
    components: {Header},
    data() {
        return {
            users: []
        }
    },
    methods: {
        async getUsers() {
            try {
                const {data} = await axios.get('/api/users')
                this.users = data.data
            } catch (e) {
                console.error(e)
            }
        }
    },
    mounted() {
        this.getUsers()
    }
}
</script>

<style scoped lang="scss">

</style>
