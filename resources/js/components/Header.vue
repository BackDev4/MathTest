<template>
    <b-navbar toggleable="lg" type="dark" variant="white">
        <b-navbar-brand href="#">Тесты</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item @click="$router.push('/themes')">Темы</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">


                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>Админ панель</em>
                    </template>
                    <b-dropdown-item @click="$router.push('/home')">Панель</b-dropdown-item>
                    <b-dropdown-item @click="goToAuth">Авторизация</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <hr style="margin-top: 0;">
</template>

<script>
export default {
    name: "Header",
    methods: {
        goToAuth() {
            window.location.replace('/login')
        }
    }
}
</script>

<style scoped>
>>> .navbar-collapse {
    padding: .5rem 0;
    flex-grow: unset;
}

>>> .form-control-sm {
    margin-bottom: 0;
}
</style>
