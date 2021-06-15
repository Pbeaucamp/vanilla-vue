<template>
  <div>
    <organization-chart :datasource="this.$store.state.groups_chart.data" :zoom="true" :pan="true"></organization-chart>
  </div>
</template>
<script>

import {mapState} from 'vuex';
import OrganizationChart from 'vue-organization-chart';
import 'vue-organization-chart/dist/orgchart.css';

export default {
    components:{
        OrganizationChart
    },
    computed: {
        ...mapState(['groups_chart'])
    }
}
</script>
<style>
.orgchart .node .title {
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #3F51B5;
    color: #fff;
    border-radius: 4px 4px 0 0;
}
.orgchart .title {
    font-size: 0.75rem !important;
    font-weight: 500;
    line-height: 2rem;
    letter-spacing: 0.0125em !important;
    font-family: "Roboto", sans-serif !important;
}
.orgchart .node .content {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 20px;
    font-size: 11px;
    line-height: 18px;
    border: 1px solid #3F51B5;
    border-radius: 0 0 4px 4px;
    text-align: center;
    background-color: #fff;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>