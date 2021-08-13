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
      data: []
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
    },
    hidedata:{
      name : "hide data",
      data : []
    },
    typechart:{
      name : "typechart",
      data : "Barchart"
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
    FETCH_HIDE_DATA(state, hidedata){
      state.hidedata.data = hidedata;
    },
    FETCH_TYPECHART(state, typechart){
      state.typechart.data = typechart;
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

    getGroups({commit, getters}) {
      var user = getters.users;
      return new Promise( (resolve, reject) => {
        axios.get(`/user/${user[0].name}/groups`)
        .then( response => {
          commit("FETCH_GROUPS",response.data.result);
          commit("FETCH_BOOLNIVEAU", false)
          resolve(response.data.result);
        }).catch(error => {
          console.log(`Error retrieving groups : ` + error.response.data.message);
          reject(error);
        })
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
        axisdata.forEach(element => {
          if (element.id == parentID){
            element.children[0].children = []
            element.children[0].children.push({
              id : element.children[0].id,
              name : element.children[0].name
            })
            response.data.result.forEach(el => {
              console.log(el.axis[0]);
              if (!element.children[0].children.find( o => o.name === el.axis[0].label)){
                  element.children[0].children.push({
                  id : el.axis[0].label,
                  name : el.axis[0].label
                })
              }
            })
          }
        });

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
    },
    getHideData({commit, getters}, {cacher, name, id}){
      var tab = getters.hidedata
      var c = 0
      tab.forEach(el => {
        if (el.id == id){
          el.cacher = cacher
          c = c+1
        }
      })
      if (c == 0){
        tab.push({
          cacher : cacher,
          name : name,
          id : id
        })
      }
      commit("FETCH_HIDE_DATA", tab)
    },
    getTypechart({commit}, chart){
      commit("FETCH_TYPECHART", chart)
    },
    getUser({commit}, user){
      //console.log(user);
      var vartemp = [{
        name : user
      }]
      //console.log(vartemp);
      commit("FETCH_USERS", vartemp)
    },





    addUserToGroup({state},{userLogin,group}) {

      var data ={
        userLogin: userLogin,
        groupID : group.id
      };   


      return new Promise( (resolve,reject) => {
        axios.post(`/user/group/add`,data,{})
        .then(response => {
          if (response.data.status === 'success') {      
            state.groups.data.push(group.name);            
            resolve (`L'utilisateur ${userLogin} a été ajouté au groupe ${group.name}.`);
          }
        })
        .catch( error => {
          if (error.response) {
            console.log(`Error adding user ${userLogin} to ${group.name}  : `+ error.response.data.message)
          }                 
          reject(`Erreur lors de l'ajout de ${userLogin} à ${group.name}.`);        
        })
      });
    },


    removeUserFromGroup({state},{userLogin,group}) {
      var data ={
          userLogin: userLogin,
          groupID : group.id
      };   
      
      return new Promise( (resolve,reject) => {
        axios.post(`/user/group/remove`,data,{})
        .then(response => {
          if (state.groups.data.indexOf(group.name) != -1) {
            state.groups.data.splice(state.groups.data.indexOf(group.name),1)
          }
          if (response.data.status === 'success') {
            resolve (`L'utilisateur ${userLogin} a été retiré du groupe ${group.name}.`);

          }
             
        })
        .catch( error => {
          if (error.response) {
            console.log(`Erreur lors du retrait de l'utilisateur ${userLogin} du groupe ${group.name}  : ` + error.response.data.message);
          }               
          reject(`Erreur lors du retrait de l'utilisateur ${userLogin} du groupe ${group.name}.`);        
        })
      });
    },       

    addUser({state},data) {
      return new Promise( (resolve,reject) => {
        state.userLogin = data.login;
        axios.post("/user/create",data,{})
        .then(response => {
          if (response.data.status === 'success') {
            resolve(`L'utilisateur ${data.login} a été crée.`);
          }
        })
        .catch( error => {
          if (error.response) {
            console.log(`Error adding user ${data.login} : ${error.response.data.message}`);
          } else {
            console.log(`Error adding user ${data.login} : ${error}`);
          }
          reject(`Erreur lors de la création de l'utilisateur ${data.login}.`);
        })
      })
    },    

    getUserGroups({state},{userLogin}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/user/${userLogin}/groups`)
        .then(response => {
          if (response.data.status == "success") {
            var groups = [];
            response.data.result.forEach(el => groups.push(el.name));
            state.userLogin = userLogin;
          }
          resolve(response.data.result);
        })
        .catch( error => {
          if (error.response) {
            if (error.response.data.message.includes("User not found.")) {
              reject("User not found.");
            }

          } else {
            console.log("Unable to retrieve groups : " + error);
          }
          reject(error);
        })

      });
    },

    getAllGroups({commit}) {
      return new Promise( (resolve, reject) => {
        axios.get("/groups")
        .then(response => {
          if (response.data.status == "success") {
            commit("SET_GROUPS", []);
          }
          resolve(response.data.result);
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve groups message : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve groups : " + error);
          }
          reject(error);
        })

      });
    },




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
    }, 
    hidedata: state => {
      return state.hidedata.data;
    }, 
    typechart: state => {
      return state.typechart.data;
    }
  },
  modules: {
  }
})
