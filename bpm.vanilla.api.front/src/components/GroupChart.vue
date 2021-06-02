<script>
import { Pie } from "vue-chartjs";
import {mapState} from 'vuex'

export default {
    extends: Pie,
    name: 'GroupChart',
    computed: {
        ...mapState(['groups']),
        chartData() {
            var labels = []
            var data = [];
            
            this.groups.data.forEach(el => {
                labels.push(el.name);
                data.push(el.contain.length);
            });
            var backgroundColor = ['rgb(255, 99, 132)','rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)','rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)']
            
            return { 
                labels : labels, 
                datasets: [{
                    data: data, 
                    backgroundColor: backgroundColor
                }] 
            };
        },
        groupData() {
            return this.$store.state.groups.data;
        }
    },        
    mounted() {
        this.renderChart( this.chartData,{ responsive: true, maintainAspectRatio: false})  
    },
    watch : {
        groups :{
            handler :function () {
                this.renderChart( this.chartData,{ responsive: true, maintainAspectRatio: false });
            },
            deep: true
        }
    }

}
</script>
