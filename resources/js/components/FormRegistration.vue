<template>
    <form
        class="form-control"
        @submit.prevent="startTest"
    >
        <label for="">
            <h3>Введите Имя и Фамилию</h3>
            <input type="text" v-model="user.fullName">
        </label>
        <label for="">
            <h3>Введите группу</h3>
            <input type="text" v-model="user.group">
        </label>
        <button
            class="btn primary"
            :disabled="user.fullName.length <= 5 || user.group.length <= 2"
        >
            Начать тест
        </button>
    </form>
</template>

<script>
export default {
    name: "FormRegistration",
    data() {
        return {
            user: {
                fullName: '',
                group: '',
            },
        }
    },
    methods: {
        startTest() {
            this.$emit('test-start', true, this.user)
        },
    },
}
</script>

<style scoped>

</style>
