<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
components: {
AppHeader,
},
};
</script>
<template>
  <div class="component1">
<AppHeader />
</div>
<div class="container mt-3 pt-3 component2">
<router-view />
</div>

</template>
<style>

</style>