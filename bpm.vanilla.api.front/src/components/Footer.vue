<template>
  <v-footer id="dashboard-core-footer" absolute padless>
    <v-container>
      <v-row
        align="center"
        no-gutters
      >
      
        <v-col class="text-center mb-sm-0 mb-5" cols="auto">
          <v-btn v-show="$store.state.bottom_redirect_btn.visible" @click="$store.dispatch('clickBottomBtn')" icon color="primary" > <!-- :to="this.$store.state.bottom_redirect_btn.link"-->
            <v-icon size="24px">mdi-step-backward</v-icon>
          </v-btn>
        </v-col>

        <v-col class="text-center mb-sm-0 mb-5" cols="auto">
          <v-btn icon color="primary" to="/">
              <v-icon size="24px">mdi-home</v-icon>
          </v-btn>
        </v-col>   

        <v-col class="text-center mb-sm-0 mb-5" cols="auto">
          <v-btn icon color="primary" target="_blank" rel="noopener noreferrer" href="http://www.bpm-conseil.com/fr">
            <v-avatar size="24">
              <img src="@/assets/icon_vanilla.png"> 
            </v-avatar>
          </v-btn>
        </v-col>              



        <v-spacer class="hidden-sm-and-down" />

        <v-col
          cols="12"
          md="auto"
        >
          <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
            Copyright &copy; BPM-Conseil, 2013 - {{ new Date().getFullYear() }}.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'DashboardCoreFooter',

  }
</script>

<style lang="sass">
  #dashboard-core-footer
    a
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase
</style>
