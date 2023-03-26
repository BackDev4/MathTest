<template>
    <div>
        <b-table striped hover :items="items"/>
    </div>
</template>

<script>
export default {
    name: "Main",
    data() {
        return {
            items: [
                { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                { age: 38, first_name: 'Jami', last_name: 'Carney' }
            ],
            content: [],
            activeLink: this.$route.path.split('/')[2]
        }
    },
    methods: {
        async setContent() {
            try {
                const {data} = await axios.get(`/api/${this.activeLink}`)
                this.content = data.data
            } catch (e) {
                console.error(e)
            }
        }
    },
    computed: {
        getContent() {
            switch (this.activeLink) {
                case 'quiz':
                    return this.content.map(item => {
                        return new Object({
                            'Тема': item.title,
                            '': 'Редактировать',
                            ' ': ''
                        })
                    })
            }
        }
    },
    mounted() {
        this.setContent()
    }
}
</script>

<style scoped>

</style>
