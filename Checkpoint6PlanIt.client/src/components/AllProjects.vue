<template>
    <div class="col-md-5">
        <router-link :to="{ name: 'ProjectPage', params: { projectId: project.id } }">
        <h3>PROJECT.NAME</h3>
        </router-link>
    </div>
    <div class="col-md-5">
        PROJECT MEMBERS
    </div>
    <div class="col-md-2">
        PROJECT DATE
    </div>
</template>


<script>
export default {
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>