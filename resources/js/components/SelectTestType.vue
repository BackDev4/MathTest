<template>
    <form @submit.prevent="selectType">
        <h1>Выберите тип теста:</h1>
        <div>
            <label for="">
                <h3>Вопрос - Ответ</h3>
                <input type="radio" name="test" value="questions" v-model="typeTest">
            </label>
            <label for="">
                <h3>С вариантами ответа</h3>
                <input type="radio" name="test" value="test" v-model="typeTest">
            </label>
        </div>
        <button class="btn pri">Продолжить</button>
    </form>
</template>

<script>
export default {
    name: "SelectTestType",
    data() {
        return {
            typeTest: null,
        }
    },
    methods: {
        selectType() {
            this.$emit('select-type', this.typeTest)
        }
    }
}
</script>

<style scoped>
h3 {
    margin-bottom: 10px;
}
</style>
