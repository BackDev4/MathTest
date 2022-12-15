<template>
    <div class="card">
        <FormRegistration
            v-if="!testStart"
            @test-start="startTest"
        />

        <SelectTestType
            v-if="!testType && testStart"
            @select-type="selectType"
        />

        <QuestionsTestComponent
            v-if="testType === 'questions'"
            :user="user"
            @form-sent="testFormSent"
        />
    </div>
</template>

<script>

import FormRegistration from "../components/FormRegistration.vue";
import SelectTestType from "../components/SelectTestType.vue";
import QuestionsTestComponent from "../components/QuestionsTestComponent.vue";

export default {
    name: "MainPage",
    components: {
        QuestionsTestComponent,
        SelectTestType,
        FormRegistration
    },
    data() {
        return {
            testStart: false,
            user: null,
            testType: null,
        }
    },
    methods: {
        startTest(start, user) {
            this.testStart = start
            this.user = user
        },
        selectType(type) {
            this.testType = type
        },
        testFormSent() {
            this.testStart = false
            this.user = null
            this.testType = null
        }
    }
}
</script>

<style scoped>

</style>
