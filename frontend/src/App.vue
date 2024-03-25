<template>
  <NavigationBarComponent/>

  <main class="form-signin">
    <router-view/>
  </main>
</template>

<script>
import NavigationBarComponent from "@/components/NavigationBarComponent";

export default {
  components: {NavigationBarComponent}
}
</script>
