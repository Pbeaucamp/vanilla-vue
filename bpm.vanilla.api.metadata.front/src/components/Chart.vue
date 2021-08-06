<template>
    <v-container>
        <v-card>
            <v-btn class="mt-3 ma-3" @click="series.push(  {column : {}, agg : 'Compte'} )"> Ajouter une série </v-btn>
            <v-card v-for="(item, index) in series" :key="index">

                <v-container>
                    <v-row>
                        <v-select return-object v-model="item.column" :items="selectedColumns" item-text="name" label="Colonne"  outlined class="mx-2"></v-select> 
                        <v-select v-model="item.agg" :items="aggregations" item-text="name" label="Aggréagtion"  outlined class="mx-2"></v-select> 

                    </v-row>
                </v-container>
            </v-card>

            <v-select  class="mx-2 mt-4" return-object v-model="Axe_X" :items="fitleredAxeColumns" item-text="name" label="Axe x"  outlined></v-select>

            <GroupChart :Axe_X="Axe_X" :series="series" :selectedColumns="selectedColumns" v-if="isFilled" />
        </v-card>

    </v-container>
</template>

<script>
import GroupChart from './GroupChart.vue'
export default {
    name: 'Chart',
    components: {GroupChart},
    props : {
        selectedColumns : Array,
    },
    data: () => ({
        aggregations : ["Compte","Somme","Moyenne","Compte Distinct","Maximum","Minimum"],
        Axe_X : {},
        series : [ {column : {}, agg : "Compte"} ],
    }), 
    computed : {
        fitleredAxeColumns() {
            var isTyped = false;
            for (const el of this.selectedColumns) {
                if (el.type !== "UNDEFINED") {
                    isTyped = true;
                    break;
                }
            }
            
            if (isTyped) {
                return this.selectedColumns.filter(el => el.type=="DIMENSION");
            }
            return this.selectedColumns;
        },
        filteredColumns() {
            return this.selectedColumns.filter(el => ( this.series.find( serie => serie.column.id == el.id) == undefined) );
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