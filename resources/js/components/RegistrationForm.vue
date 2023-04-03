<template>
    <form class="card">
        <h3>ФИО:</h3>
        <b-form-input v-model="user.fullName"/>
        <br>
        <h3>Группа:</h3>
        <b-form-input v-model="user.group"/>

        <b-button
            style="margin-left: auto;"
            class="mt-2"
            type="submit"
            variant="success"
            :disabled="examination"
            v-html="'Продолжить'"
            @click="goToTest"
        />
    </form>
</template>

<script>
export default {
    name: "RegistrationForm",
    data() {
        return {
            user: {
                fullName: '',
                group: '',
            },
        }
    },
    methods: {
        goToTest() {
            if (!this.examination) this.$emit('set-user', this.user)
        }
    },
    computed: {
        examination() {
            return this.user.fullName.length <= 5 || this.user.group.length <= 2
        }
    }
}
</script>

<style scoped>

</style>
