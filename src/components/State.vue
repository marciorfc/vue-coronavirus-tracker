<template>
    <div>
        <h1>{{ id }}</h1>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                default: 'CE'
            },
        },
        mounted() {
             console.log(this.id)
        }
    }
</script>

<style scoped>

</style>