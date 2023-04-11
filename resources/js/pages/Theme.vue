<template>
    <Header/>
    <div class="container">
        <div class="card">
            <h1 v-html="theme?.title"/>
            <br>
            <p v-html="theme?.description"/>
<!--            <hr>-->
<!--            <h3>Вопросы без варианта ответа:</h3>-->
<!--            <div-->
<!--                class="questions"-->
<!--                v-for="(question, idx) in theme?.content?.no_options"-->
<!--                :key="idx"-->
<!--            >-->
<!--                <h5>Вопрос №{{idx + 1}}</h5>-->

<!--                <p class="question">{{ question.question }}</p>-->
<!--                <b-form-input/>-->
<!--            </div>-->
<!--            <hr>-->
<!--            <h3>Вопросы с одним вариантом ответа:</h3>-->
<!--            <div-->
<!--                class="questions"-->
<!--                v-for="(item, idx) in theme?.content?.one_answer"-->
<!--                :key="idx"-->
<!--            >-->
<!--                <h5>{{item?.name}}</h5>-->
<!--                <div-->
<!--                    v-for="(question, idx2) in item?.content"-->
<!--                    :key="idx2"-->
<!--                >-->
<!--                    <b-form-group>-->
<!--                        <b-form-radio :name="`radio${idx}`">{{ question.question }}</b-form-radio>-->
<!--                    </b-form-group>-->
<!--&lt;!&ndash;                    <p class="question">{{ question.question }}</p>&ndash;&gt;-->
<!--                </div>-->
<!--            </div>-->
<!--            <hr>-->
<!--            <h3>Вопросы с несколькими вариантами ответа:</h3>-->
<!--            <div-->
<!--                class="questions"-->
<!--                v-for="(item, idx) in theme?.content?.multiple_answers"-->
<!--                :key="idx"-->
<!--            >-->
<!--                <h5>{{ item?.name }}</h5>-->
<!--                <div-->
<!--                    class="question"-->
<!--                    v-for="(question, idx2) in item?.content"-->
<!--                    :key="idx2"-->
<!--                >-->
<!--                    <b-form-checkbox :name="`radio${idx}`">{{ question.question }}</b-form-checkbox>-->
<!--                </div>-->
<!--            </div>-->
            <br>
            <b-button
                style="margin-left: auto;"
                variant="outline-primary"
                v-html="getTextButton"
                @click="buttonAction"
            />
        </div>
    </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
    name: "Theme",
    components: {Header},
    data() {
        return {
            theme: null
        }
    },
    methods: {
        async getTheme() {
            try {
                const {data} = await axios.get(`/api/quiz/${this.getThemeId}`)
                this.theme = data.data
            } catch (e) {
                console.error(e)
            }
        },
        buttonAction() {
            this.theme?.content[0] === null ? this.$router.push(`/themes/change/${this.theme.id}`) : this.$router.push(`/test/${this.theme.id}`)
        }
    },
    computed: {
        getThemeId() {
            return +this.$route.params.id
        },
        getTextButton() {
            return this.theme?.content[0] === null ? 'Добавить вопросы' : 'Пройти тест'
        }
    },
    mounted() {
        this.getTheme()
    }
}
</script>

<style scoped lang="scss">
.questions {
    margin-top: 10px;
    padding-left: 25px;

    & ::v-deep(fieldset.mb-3) {
        margin-bottom: 10px !important;
    }
}

.question {
    margin-bottom: 10px;
    padding-left: 10px;
}
</style>
