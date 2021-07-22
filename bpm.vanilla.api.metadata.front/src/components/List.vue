<template>
  <v-col
    class="d-flex"
  >
    <v-layout>
      <v-select
        v-model="metadata"
        :items="this.metadatas.data"
        label="Metadata"
        outlined
        class="mx-2"
        
      ></v-select>
      <v-select
        :disabled="metadata == '' && !loadModel"
        v-model="model"
        :items="this.models.data"
        label="Business model"
        outlined
        :loading="loadModel"
      class="mx-2"
      ></v-select>
      <v-select
        :disabled="model == ''"
        v-model="bPackage"
        :items="this.packages.data"
        label="Business package"
        outlined
        :loading="loadPackages"
        class="mx-2"
      ></v-select>

    </v-layout>
  </v-col>

</template>
<script>
import {mapState, mapActions,mapMutations} from 'vuex'

export default {
  data: () => ({
    metadata : "",
    model : "",
    bPackage : "",
    loadModel : false,
    loadPackages: false,
  }),
  computed: {
      ...mapState(['metadatas','models','packages',"Tables"]),
      
      
  },
  methods : {
    ...mapActions(["getBusinessModels","getBusinessPackages"]),
    ...mapMutations(["SELECT_METADATA","SELECT_MODEL","SELECT_PACKAGE","SET_MODELS","SET_PACKAGES","SET_TABLES"]),
    
    getModels() {
      this.loadModel = true;
      this.model = "";
      this.bPackage = "";



      //this.$store.dispatch("getBusinessModels",this.metadata)
      this.SELECT_METADATA(this.metadata);
      this.SELECT_MODEL("");
      this.SELECT_PACKAGE("");
      this.SET_MODELS([]);
      this.SET_PACKAGES([]);
      this.SET_TABLES([]);
      this.getBusinessModels(this.metadata)
      .then( () => {
        this.loadModel = false;

      }).catch( () => {
        this.loadModel = false;
      })
    },
    getPackages() {
      this.loadPackages = true;
      this.SELECT_MODEL(this.model);
      this.SELECT_PACKAGE("");
      this.SET_PACKAGES([]);
      this.SET_TABLES([]);
      this.getBusinessPackages({metadataName : this.metadata ,modelName : this.model})
      .then( () => {
        this.loadPackages = false;
      }).catch( () => {this.loadPackages = false;});
    }
  },
  watch: {
    metadata: function () {
      if (this.metadata != "") {
        this.getModels();
      }
    },
    model: function() {
      if (this.model != "") {
        this.getPackages();
      }
    },
    bPackage : function() {
      if (this.bPackage != "") {
        this.SELECT_PACKAGE(this.bPackage);
      }

    }  
  },

}
</script>
<style scoped>
  .d-flex {
    padding-bottom : 0px;
    margin-bottom : 0px
  }
</style>