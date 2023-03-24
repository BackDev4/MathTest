<template>
    <div class="card">

    </div>
</template>

<script>
export default {
    name: "Users",
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
