<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
export default {
components: {
AppHeader,
AppFooter,
},
};
</script>
<template>
  <div class="component1">
<AppHeader />
</div>
<div class="space"></div>
<div class="container component2" >
  
<router-view />
</div>
<div class="component1" >
<AppFooter />
</div>
</template>
<style>

</style>