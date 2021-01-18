<template>

    <v-container>

        <AddActivity/>

        <Activity/>

    </v-container>

</template>

<script>

import AddActivity from "@/components/activities/AddActivity";

import Activity from "@/components/activities/Activity";

export default {

    name: "Activities",

    components: {Activity, AddActivity},

}
</script>

<style scoped>

</style>