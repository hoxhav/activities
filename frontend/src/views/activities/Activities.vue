<template>

    <v-container>

        <AddActivity/>

        <Activity/>

    </v-container>

</template>

<script>


export default {

    name: "Activities",

    components: {
        Activity: () => import(/* webpackChunkName: "activity" */'@/components/activities/Activity'),
        AddActivity: () => import(/* webpackChunkName: "addActivity" */'@/components/activities/AddActivity')
    },

}
</script>

<style scoped>

</style>