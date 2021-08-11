<template>
  <v-app class="contenu">
    <v-layout>
      <v-col>
        <list />
        <treeview />
      </v-col>
    </v-layout>
  </v-app>
</template>

<script>
import List from '../components/List.vue'
import Treeview from '../components/Treeview.vue'

  export default {
    name: 'Home',

    components: {
      List,
      Treeview
      },
  }
</script>
<style>
  .contenu {
    padding-bottom : 0px;
    margin-bottom : 0px
  }
  .layout{
    max-height: 50%;
  }
  .v-application--wrap {
    flex: 1 1 auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    min-height: 87vh;
    max-width: 100%;
    position: relative;
}
</style>