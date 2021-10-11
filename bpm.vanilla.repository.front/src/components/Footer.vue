<template>
  <v-footer  id="dashboard-core-footer" height="60" absolute padless>
    <v-container>
      <v-row
        align="left"
        no-gutters
      >
      
        <v-col class="text-center mb-sm-0 mb-5" cols="auto">
          <v-btn icon color="primary" to="/">
              <v-icon size="24px">mdi-home</v-icon>
          </v-btn>
        </v-col>   

        <v-col class="text-center mb-sm-0 mb-5" cols="auto">
          <v-btn text rounded target="_blank" rel="noopener noreferrer" href="https://semaphore-vanilla.data4citizen.com/vanilla">
            <v-img max-height="24" max-width="90" src="@/assets/vanilla.png"></v-img>
          </v-btn>
        </v-col>  

        <v-col class="text-center mb-sm-0 mb-5" cols="auto">
          <v-btn text class ="ma-0" rounded target="_blank" rel="noopener noreferrer" href="http://www.bpm-conseil.com/fr">
            <v-img max-height="24" max-width="90" src="@/assets/BPMConseil.png"></v-img>
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
    name: 'Footer',

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
