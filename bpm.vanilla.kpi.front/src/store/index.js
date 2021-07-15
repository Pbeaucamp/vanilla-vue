import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '../config.json'

axios.defaults.baseURL=config.baseURL;
axios.defaults.headers.common['X-Gravitee-Api-Key'] = "f3510842-ef9b-4ee7-8877-4d59b5d63907";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: {
      name: 'Utilisateurs',
      data: [{'name' : 'system'}]
    },
    groups: {
      name: 'Groupes',
      data: []
    },
    observatories: {
      name: 'Observatoires',
      data: []
    },
    themes: {
      name: 'Themes',
      data: []
    },
    kpi: {
      name: 'KPI',
      data: []
    },
    axis: {
      name: 'axes',
      data: []
    },
    axisvalues: {
      name: 'axesvalues',
      data: []
    },
    temp:{
      name: "temporaire",
      data: []
    },
    childrenid:{
      name: "childrenID",
      data: []
    }, 
    kpioraxis:{
      name: "KPI or axis",
      data: "KPI"
    }, 
    tabvalueoneyear:{
      name: "Tab value one year",
      data: []
    },
    boolniveau:{
      name : "boolniveau",
      data : false
    },
    tabniveau:{
      name : "tabniveau",
      data : []
    }
  },
  mutations: {
    FETCH_USERS(state, users) {
      state.users.data = users;
    },
    FETCH_GROUPS(state, groups) {
      state.groups.data = groups;
    },    
    FETCH_OBSERVATORIES(state, observatories) {
      state.observatories.data = observatories;
    },
    FETCH_THEMES(state, themes) {
      state.themes.data = themes;
    },    
    FETCH_KPI(state, kpi) {
      state.kpi.data = kpi;
    },
    FETCH_AXIS(state, axis) {
      state.axis.data = axis;
    },
    FETCH_AXIS_VALUES(state, axisvalues) {
      state.axisvalues.data = axisvalues;
    },
    FETCH_TEMP(state, temp){
      state.temp.data = temp;
    },
    FETCH_CHILDRENID(state, childrenid){
      state.childrenid.data = childrenid;
    },
    FETCH_KPI_OR_AXIS(state, kpioraxis){
      state.kpioraxis.data = kpioraxis;
    },
    FETCH_TAB_VALUE_ONE_YEAR(state,tabvalueoneyear){
      state.tabvalueoneyear.data = tabvalueoneyear;
    },
    FETCH_BOOLNIVEAU(state, boolniveau){
      state.boolniveau.data = boolniveau;
    },
    FETCH_TABNIVEAU(state, tabniveau){
      state.tabniveau.data = tabniveau;
    },
  },
  actions: {
    getObservatories({commit}, group) {
      var obsdata = [];
        axios.get(`/group/${group}/observatories`)
        .then( response => {
          response.data.result.forEach(elements => {
            if (!obsdata.some(e => e.id == elements.id)){
              obsdata.push(elements)
            }
          });
        }).catch(error => {
            console.log(`Error retrieving repositories : ` + error.response.data.message);
        })
      commit("FETCH_OBSERVATORIES",obsdata);
      commit("FETCH_AXIS", [])
      commit("FETCH_BOOLNIVEAU", false)
    },

    async getGroups({commit, getters}) {
      var user = getters.users;
      await axios.get(`/user/${user[0].name}/groups`)
      .then( response => {
        commit("FETCH_GROUPS",response.data.result);
        commit("FETCH_BOOLNIVEAU", false)
      }).catch(error => {
          console.log(`Error retrieving groups : ` + error.response.data.message);
      })
    },

    getTheme({commit}, group) {
      var thedata = [];
      axios.get(`/group/${group}/themes`)
        .then( response => {
          response.data.result.forEach(elements => {
            if (!thedata.some(e => e.id == elements.id)){
              thedata.push(elements)
            }
          });
        }).catch(error => {
            console.log(`Error retrieving repositories : ` + error.response.data.message);
        })
      commit("FETCH_THEMES",thedata);
      commit("FETCH_AXIS", [])
      commit("FETCH_BOOLNIVEAU", false)
    },

    getThemeByObs({commit, getters}, obs) {
      var observs = getters.observatories;
      var TrueObs = observs.filter(e => e.name == obs)
      var thedata = [];
      if (!(TrueObs[0] === undefined)){
        axios.get(`/observatory/${TrueObs[0].id}/themes`)
          .then( response => {
            response.data.result.forEach(elements => {
              if (!thedata.some(e => e.id == elements.id)){
                thedata.push(elements)
              }
            });
          }).catch(error => {
              console.log(`Error retrieving repositories : ` + error.response.data.message);
          })
        commit("FETCH_THEMES",thedata);
        commit("FETCH_BOOLNIVEAU", false)
        commit("FETCH_AXIS", [])
      }
    },
    
    getKPI({commit}, {group, theme, themes}) {

      return new Promise( (resolve,reject) => {

      var KPIdata = [];
      var thetheme = themes.filter(e => e.name == theme);
      thetheme.forEach(element => {
        for (let index = 0; index < element.metrics.length; index++) {
          if (!KPIdata.some(e => e.kpiID == element.metrics[index].kpiID)){
            KPIdata.push(element.metrics[index])
          }
        }
      });
      
      var promiseArray = [];

      KPIdata.forEach(el => {
        el.result = []
        promiseArray.push(axios.get(`/group/${group}/kpi/${el.kpiID}/values`)      
          .then(response => {
          el.result.push(response.data.result)
        }).catch(error => {
            console.log(`Error retrieving KPI : ` + error.response.data.message);
        })
        )
      })

      Promise.all(promiseArray).then( () => {
        KPIdata.forEach(e => {
          e.result[0].sort(function (a,b){
            return new Date(b.date) - new Date(a.date)
          })
        });

        
        console.log(KPIdata);
        commit("FETCH_KPI",KPIdata);
        commit("FETCH_KPI_OR_AXIS","KPI")
        commit("FETCH_BOOLNIVEAU", false)
        commit("FETCH_AXIS", [])
        resolve()
      }).catch( () => { reject() })
      })
    },

    getTabValueOneYear({commit,getters},{kpiID, date}){
      var parsedate = date.split("-")
      var gooddate = "01-12-"+parsedate[0]
      var temp = getters.temp;
      return new Promise( (resolve,reject) => {
      var KPIdataa = [];
      var thetheme = temp.themes.filter(e => e.name == temp.theme);
      thetheme.forEach(element => {
        for (let index = 0; index < element.metrics.length; index++) {
          if (!KPIdataa.some(e => e.kpiID == element.metrics[index].kpiID) & (element.metrics[index].kpiID == kpiID)){
            KPIdataa.push(element.metrics[index])
          }
        }
      });
      var promiseArray = [];

      KPIdataa.forEach(el => {
        el.result = []
          promiseArray.push(axios.get(`/group/${temp.group}/kpi/${el.kpiID}/values?date=${gooddate}`)      
          .then(response => {
          el.result.push(response.data.result)
        }).catch(error => {
            console.log(`Error retrieving KPI : ` + error.response.data.message);
        })
        )

      })

      Promise.all(promiseArray).then( () => {
        KPIdataa.forEach(e => {
            e.result.sort(function (a,b){
              return new Date(a.date) - new Date(b.date)
            })
        });

        commit("FETCH_TAB_VALUE_ONE_YEAR",KPIdataa);
        commit("FETCH_BOOLNIVEAU", false)
        resolve()
      }).catch( () => { reject() })
      })
    },

    getOneKPI({commit, getters}, {kpiID, date}) {
      var parsedate = date.split("-")
      var newdate = parsedate[2] + "-" + parsedate[1] + "-" + parsedate[0]
      var temp = getters.temp;
      return new Promise( (resolve,reject) => {
      var KPIdata = [];
      var thetheme = temp.themes.filter(e => e.name == temp.theme);
      thetheme.forEach(element => {
        for (let index = 0; index < element.metrics.length; index++) {
          if (!KPIdata.some(e => e.kpiID == element.metrics[index].kpiID) & (element.metrics[index].kpiID == kpiID)){
            KPIdata.push(element.metrics[index])
          }
        }
      });
      
      var promiseArray = [];

      KPIdata.forEach(el => {
        el.result = []
        promiseArray.push(axios.get(`/group/${temp.group}/kpi/${el.kpiID}/value?date=${newdate}`)      
          .then(response => {
          el.result.push(response.data.result)
        }).catch(error => {
            console.log(`Error retrieving KPI : ` + error.response.data.message);
        })
        )
      })

      Promise.all(promiseArray).then( () => {
        KPIdata.forEach(e => {
          var tem = e.result[0];
          e.result[0] = [];
          e.result[0].push(tem);
        });
        console.log(KPIdata);
        commit("FETCH_KPI",KPIdata);
        commit("FETCH_KPI_OR_AXIS","KPI")
        commit("FETCH_BOOLNIVEAU", false)
        resolve()
      }).catch( () => { reject() })
      })
    },

    resetKPI({getters}){
      var temp = getters.temp;
      var data = {
        group : temp.group,
        theme : temp.theme,
        themes : temp.themes,
      }
      this.dispatch('getKPI', data)
    },

    tempData({commit}, data){
      commit("FETCH_TEMP", data)
    },

    getKPIDate({commit, getters},date) {
      var parsedate = date.split("-")

      var newdate1 = parsedate[2] + "-" + parsedate[1] + "-" + parsedate[0]

      var temp = getters.temp;

      return new Promise( (resolve,reject) => {

      var KPIdata = [];
      var thetheme = temp.themes.filter(e => e.name == temp.theme);
      thetheme.forEach(element => {
        for (let index = 0; index < element.metrics.length; index++) {
          if (!KPIdata.some(e => e.kpiID == element.metrics[index].kpiID)){
            KPIdata.push(element.metrics[index])
          }
        }
      });
      
      var promiseArray = [];

      KPIdata.forEach(el => {
        el.result = []
        promiseArray.push(axios.get(`/group/${temp.group}/kpi/${el.kpiID}/value?date=${newdate1}`)      
          .then(response => {
          el.result.push(response.data.result)
        }).catch(error => {
            console.log(`Error retrieving KPI : ` + error.response.data.message);
        })
        )
      })
      Promise.all(promiseArray).then( () => {
        KPIdata.forEach(e => {
          var tem = e.result[0];
          e.result[0] = [];
          e.result[0].push(tem);
          })
        commit("FETCH_KPI",KPIdata);
        commit("FETCH_KPI_OR_AXIS","KPI")
        commit("FETCH_BOOLNIVEAU", false)
        commit("FETCH_AXIS", [])
        resolve()
      }).catch( () => { reject() })
      })
    },

    async getallAxis({commit}) {
      await axios.get(`/axis`)
      .then( response => {
        commit("FETCH_AXIS",response.data.result);
        commit("FETCH_BOOLNIVEAU", false)
      }).catch(error => {
          console.log(`Error retrieving axis : ` + error.response.data.message);
      })
    },
    
    getAxis({commit} , id) {
      axios.get(`/kpi/${id}/axis`)
      .then( response => {
        commit("FETCH_AXIS",response.data.result);
        commit("FETCH_BOOLNIVEAU", false)
      }).catch(error => {
          console.log(`Error retrieving axis : ` + error.response.data.message);
      })
    },
    
    getAxisValue({commit, getters}, {kpiID, childrenID, date}){
      var temp = getters.temp;
      commit("FETCH_CHILDRENID", childrenID)
      var parsedate = date.split("-")
      var newdate = parsedate[2] + "-" + parsedate[1] + "-" + parsedate[0]
      var axistemp = getters.axis;
      var parentID
      axistemp.forEach(element => {
        element.children.forEach(el => {
          if (el.id == childrenID){
            parentID = element.id
          }
        })
      });
      axios.get(`/group/${temp.group}/kpi/${kpiID}/axis/${parentID}/value?date=${newdate}`)
      .then( response => {
        console.log("hello ", response.data.result);
        this.commit("FETCH_AXIS_VALUES", response.data.result);
        var axisdata = getters.axis;
        axisdata[0].children[0].children = []
        axisdata[0].children[0].children.push({
          id : axisdata[0].children[0].id,
          name : axisdata[0].children[0].name
        })
        response.data.result.forEach(el => {
          console.log(el.axis[0]);
          if (!axisdata[0].children[0].children.find( o => o.name === el.axis[0].label)){
            axisdata[0].children[0].children.push({
              id : el.axis[0].label,
              name : el.axis[0].label
            })
          }
        })
        console.log(axisdata);
        commit("FETCH_KPI_OR_AXIS","AXIS")
        commit("FETCH_BOOLNIVEAU", false)
      }).catch(error => {
        console.log(`Error retrieving axis values : ` + error.response.data.message);
      })
    },
    niveaudeux({commit}, id){
      console.log(id);
      commit("FETCH_BOOLNIVEAU", true)
    },
    getTabNiveau({commit,getters}, id){
      var tab = getters.axisvalues
      var temp = []
      console.log("ici ", tab);
      tab.forEach(el => {
        if (el.axis[0].label == id){
          console.log(el.axis[0].label);
          console.log(el.axis[1].label);
          temp.push(el)
        }
      }),
      commit("FETCH_TABNIVEAU", temp)
      console.log(this.state.tabniveau);
    }
  },

  getters : {
    users: state => {
      return state.users.data;
    },
    groups: state => {
      return state.groups.data;
    },
    observatories: state => {
      return state.observatories.data;
    },    
    themes: state => {
      return state.themes.data;
    },
    kpi: state => {
      return state.kpi.data;
    },
    axis: state => {
      return state.axis.data;
    },
    axisvalues: state => {
      return state.axisvalues.data;
    },
    temp: state => {
      return state.temp.data;
    },
    childrenid: state => {
      return state.childrenid.data;
    },
    kpioraxis: state => {
      return state.kpioraxis.data;
    },
    tabvalueoneyear: state => {
      return state.tabvalueoneyear.data;
    }, 
    boolniveau: state => {
      return state.boolniveau.data;
    }, 
    tabniveau: state => {
      return state.tabniveau.data;
    }
  },
  modules: {
  }
})
