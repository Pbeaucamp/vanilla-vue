<template>
    <v-container class="pa-0">
        <v-row>

            <v-col :md="breakpointTreeview">
                
                <v-select  class="mx-3 mt-4" return-object v-model="Axe_X" :items="fitleredAxeColumns" item-text="name" label="Axe x"  outlined></v-select>
                <GroupChart :Axe_X="Axe_X" :series="series" :selectedColumns="selectedColumns" v-if="isFilled" />

            </v-col>


            <v-col class="mt-1">
                <v-card flat>

                    <v-card v-for="(item, index) in series" :key="index" flat>
                        <v-container class="mx-2">
                            <v-row>
                                
                                <v-col class="px-2" md="6"> <v-select return-object v-model="item.column" :items="filteredColumns" item-text="name" label="Colonne"  outlined class="mx-2"></v-select> </v-col>
                                <v-col class="px-2" md="4"> <v-select v-model="item.agg" :items="aggregations" item-text="name" label="Aggréagtion"  outlined class="mx-2"></v-select> </v-col>
                                <v-col md="1" class="mt-2 mr-5"> <v-btn icon @click="series.splice(series.indexOf(item),1)" :disabled="index==0" color="red lighten-2"> <v-icon>mdi-close-circle-outline</v-icon> </v-btn> </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                    
                    <v-card-actions class="mt-0">
                        <v-spacer></v-spacer>
                        <v-btn class="mt-0 mx-3" color="primary darken-1" @click="series.push(  {column : {}, agg : 'Compte'} )"> Ajouter une série </v-btn> 
                    </v-card-actions>
                                       
                </v-card>
            </v-col>


        </v-row>
    </v-container>
</template>

<script>
import GroupChart from './GroupChart.vue'
export default {
    name: 'Chart',
    components: {GroupChart},
    props : {
        selectedColumns : Array,
        affTreeview : Boolean,
    },
    data: () => ({
        aggregations : ["Compte","Somme","Moyenne","Compte Distinct","Maximum","Minimum"],
        Axe_X : {},
        series : [ {column : {}, agg : "Compte"} ],
    }), 
    computed : {
        breakpointTreeview() {
            return (this.affTreeview ? 6 : 7);
        },
        isTyped () {
            var isTyped = false;
            for (const el of this.selectedColumns) {
                if (el.type !== "UNDEFINED") {
                    isTyped = true;
                    break;
                }
            }       
            return isTyped;     
        },
        fitleredAxeColumns() {
            /*
            var isTyped = false;
            for (const el of this.selectedColumns) {
                if (el.type !== "UNDEFINED") {
                    isTyped = true;
                    break;
                }
            }
            */
            
            if (this.isTyped) {
                return this.selectedColumns.filter(el => el.type=="DIMENSION");
            }
            return this.selectedColumns;
        },
        filteredColumns() {
            var tmpArray = this.selectedColumns;
            if (this.isTyped) {
                tmpArray = this.selectedColumns.filter( ( el ) => !this.fitleredAxeColumns.includes( el ) );
            }

            //myArray = myArray.filter( ( el ) => !toRemove.includes( el ) );
            
            /*
            for (const serie of this.series) {
                var indexTmp = tmpArray.indexOf(serie.column);
                if (indexTmp != -1 ) {
                    tmpArray.splice(indexTmp,1);
                }
            }
            
            var localSeries = this.series.filter(el => !(Object.keys(el.column).length === 0) );
            console.log("LCOAL SERIES FROM CHART : " + JSON.stringify(localSeries));
            tmpArray = this.selectedColumns.filter( ( el ) => !localSeries.includes( el ) );
            */

            //tmpArray.filter(el => { !(this.series.find( serie => serie.column.id == el.id) ==undefined) } );
            return tmpArray;
            //return this.selectedColumns.filter(el => ( this.series.find( serie => serie.column.id == el.id) == undefined) );
        },
        isFilled() {
            if (Object.keys( this.Axe_X).length === 0 || Object.keys(this.series[0].column).length === 0 ) {
                return false;
            } else {
                return true;
            }
            //return (this.Axe_X); // this.series !== ([ {column : {}, agg : "Compte"} ]) && this.Axe_X == {} 
        }

    }
}
</script>

<style>
</style>