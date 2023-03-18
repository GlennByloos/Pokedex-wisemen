<template>
  <nav>
    <router-link to="/" style="color: black;">Home</router-link> |
    <!--<router-link :to="{ name: 'about' }">About</router-link> |
    <router-link :to="{ name: 'jobs' }">Jobs</router-link>-->
  </nav>
  <router-view />
</template>

<script>

export default {
  props: ["id"]
  /*name: 'PokémonSpecs',*/
}
</script>