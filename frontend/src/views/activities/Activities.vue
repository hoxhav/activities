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
        Activity: () => import('@/components/activities/Activity'),
        AddActivity: () => import('@/components/activities/AddActivity')
    },

    mounted() {
        this.$store.commit("utils/setLoading", false);
    }

}
</script>

<style scoped>

</style>