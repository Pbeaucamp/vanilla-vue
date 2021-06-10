import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import config from '../config.json'

axios.defaults.baseURL=config.baseURL;
axios.defaults.headers.common['X-Gravitee-Api-Key'] = "f3510842-ef9b-4ee7-8877-4d59b5d63907";
//X-Gravitee-Api-Key

//console.log("Config baseURL = "+config.baseURL);

//console.log("Axios default = "+ JSON.stringify(axios.defaults));

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: {
      name: 'Utilisateurs',
      data: [],
      icon: 'mdi-account-box-multiple',
      path: '/users'
    },
    groups: {
      name: 'Groupes',
      data: [],
      icon: 'mdi-account-group',
      path: '/groups'
    },
    repositories: {
      name: 'Référentiels',
      data: [],
      icon: 'mdi-database',
      path: '/repositories'
    },
    snackbars: {
      id: 0,
      data : []
    },
    bottom_redirect_btn : {
      visible : false,
      link : '',
    }
  },
  mutations: {
    FETCH_USERS(state, users) {
      state.users.data = users;
    },
    FETCH_GROUPS(state, groups) {
      state.groups.data = groups;
    },
    FETCH_REPOSITORIES(state, repositories) {
      state.repositories.data = repositories;
    },
    ADD_SNACKBAR(state, snackbar) {
      state.snackbars.data.push(snackbar);
    },
    REMOVE_SNACKBAR(state, indexOfsnackbar) {
      state.snackbars.data.splice(indexOfsnackbar,1);  
    },
    SET_BOTTOM_REDIRECT_BTN(state, btn) {
      state.bottom_redirect_btn = btn;
    }


  },
  actions: {
    setBottomBtn({commit}, btn) {
      commit("SET_BOTTOM_REDIRECT_BTN", btn);
    },
    clickBottomBtn({commit,state}) {
      if ( state.bottom_redirect_btn.link != '') {
        router.push(state.bottom_redirect_btn.link);
        commit("SET_BOTTOM_REDIRECT_BTN", {visible: false, link: ''});
      }
    },
    addSnackbar({state,commit, dispatch},snackbar) {
      snackbar.id = state.snackbars.id;
      state.snackbars.id++;

      commit("ADD_SNACKBAR",snackbar);
      setTimeout( function(dispatch) {dispatch('removeSnackbar',snackbar)}, 5000, dispatch); // Le timeout est de 5s, au bout de 5sc on retire le snackbar de la list
    },
    removeSnackbar({state,commit},snackbar) {
      var indexOfSnackbar = state.snackbars.data.indexOf(snackbar);
      if (indexOfSnackbar != -1) {
        commit("REMOVE_SNACKBAR",indexOfSnackbar);
      }   
    },

    loadData({commit},name) {
      return new Promise( (resolve,reject) => {
        axios.get("/"+name)
        .then(response => {
          if (name === 'groups' || name === 'repositories') {
            response.data.result.forEach(element => {
              element["contain"] = []; // Pour mettre les logins des utilisateur appartenant au groupes ou au référentiels 
            });
          }
          commit("FETCH_"+name.toUpperCase(),response.data.result);
          resolve(name+" fetched");
        })
        .catch(error => {
          if (error.response) {
            console.log("Error fetching "+name+" from API : "+ error.response.data.message);
          } else {
            console.log("Error fetching "+name+" from API : "+ error);
          }

          reject("error fetching "+name+" from API");
        })
      });
    },

    addUserTo({getters, commit},{dataType,userLogin,name}) {

      var data ={
          userLogin: userLogin,
      };   
      data[`${dataType}Name`] = name;

      return new Promise( (resolve,reject) => {
        axios.post(`/user/${dataType}/add`,data,{})
        .then(response => {
          if (response.data.status === 'success') {
            switch(dataType) {
              case 'group': 
                var groups = getters.groups;
                if(groups.find(group => group.name === name).contain.indexOf(userLogin) === -1) { // Si l'utilisateur n'est pas déjà dans contain
                  groups.find(group => group.name === name).contain.push(userLogin);
                  commit("FETCH_GROUPS",groups);
                }
                resolve (`L'utilisateur ${userLogin} a été ajouté au groupe ${name}.`);
                break;
              case 'repository' :
                var repositories = getters.repositories;
                if (repositories.find(repo => repo.name === name).contain.indexOf(userLogin) === -1 ) { // Si l'utilisateur n'est pas déjà dans contain
                  repositories.find(repo => repo.name === name).contain.push(userLogin);
                  commit("FETCH_REPOSITORIES",repositories);
                }
                resolve(`L'utilisateur ${userLogin} a été ajouté au référentiel ${name}.`);
                break;
            }
          } else {
            return "Erreur";
          }          
        })
        .catch( error => {
          if (error.response) {
              console.log(`Error adding user ${userLogin} to ${name}  : `+ error.response.data.message)
          }                 
          reject(`Erreur lors de l'ajout de ${userLogin} à ${name}.`);        
        })
      });
    },


    removeUserFrom({getters, commit},{dataType,userLogin,name}) {
      var data ={
          userLogin: userLogin,
      };   
      data[`${dataType}Name`] = name;
      return new Promise( (resolve,reject) => {
        axios.post(`/user/${dataType}/remove`,data,{})
        .then(response => {
          if (response.data.status === 'success') {
            switch(dataType) {
              case 'group': 
                var groups = getters.groups;
                var indexOfUser = groups.find(group => group.name === name).contain.indexOf(userLogin);
                if ( indexOfUser != -1) { // Si l'utilisateur est dans le groupe 
                  groups.find(group =>  group.name === name).contain.splice(indexOfUser,1);
                  commit("FETCH_GROUPS",groups);
                }
                resolve (`L'utilisateur ${userLogin} a été retiré du groupe ${name}.`);
                break;
              case 'repository' :
                resolve(`Impossible de retirer un utilisateur d'un référentiel`);
                break;
            }
          } else {
            return "Erreur";
          }          
        })
        .catch( error => {
          if (error.response) {
              console.log(`Error removing user ${userLogin} from ${name}  : ` + error.response.data.message);
          }                  
          reject(`Erreur lors du retrait de l'utilisateur ${userLogin} du groupe ${name}.`);        
        })
      });
    },    

    getUserGroups({commit,getters},login) {
      axios.get(`/user/${login}/groups`)
      .then( response => {
        var groups = getters.groups;
        groups.forEach( group => { // Pour chaque groupe dans le data store 
          if (response.data.result.find(gr => gr.id === group.id) != undefined) { // Si l'utilisateur login appartient au groupe : group 
            if (group.contain.indexOf(login) === -1 ) { // Si l'utilisatteur n'est pas dans contain on l'ajoute
              group.contain.push(login) 
            }
          } else { // Sinon 
            var indexOfLogin = group.contain.indexOf(login);
            if (indexOfLogin !==-1) { // S'il est dans le groupe alors qu'il ne doit pas y être, on le retire 
              group.contain.splice(indexOfLogin,1);
            }
          }
        })
        commit("FETCH_GROUPS",groups);
      }).catch(error => {
          console.log(`Error retrieving ${login}'s groups : ` + error.response.data.message);
      })
    },

    getUserRepositories({commit,getters},login) {
      axios.get(`/user/${login}/repositories`)
      .then( response => {
        var repositories = getters.repositories;

        repositories.forEach( repo => { // Pour chaque repo dans le data store 
          if (response.data.result.find(re => re.id === repo.id) != undefined) { // Si l'utilisateur login appartient au repository : repo 
            if (repo.contain.indexOf(login) === -1 ) { // Si l'utilisatteur n'est pas dans contain on l'ajoute
              repo.contain.push(login) 
            }
          } else { // Sinon 
            var indexOfLogin = repo.contain.indexOf(login);
            if (indexOfLogin !==-1) { // S'il est dans le groupe alors qu'il ne doit pas y être, on le retire 
              repo.contain.splice(indexOfLogin,1);
            }
          }
        })
        commit("FETCH_REPOSITORIES",repositories);


      }).catch( error => {
        if (error.response) {
          console.log(`Error retrieving ${login}'s repositories : ` + error.response.data.message);
        } else {
          console.log(`Error retrieving ${login}'s repositories : ` + error);
        }
          
      })
    },

    removeUser({getters, commit},login) {
      return new Promise( (resolve,reject) => {
        axios.delete(`/user/${login}/remove`)
        .then(response => {
          
          if (response.data.status == "success") {
            var users = getters.users;
            var groups = getters.groups;
            var repositories = getters.repositories;

            // On retire l'utilisateur de chaque groupe
            groups.forEach(group => {
              var indexOfuser = group.contain.indexOf(login);
              if (group.contain.indexOf(login) != -1) {
                group.contain.splice(indexOfuser,1);
              }
            })

            // De même pour les référentiels 
            repositories.forEach( repo => {
              var indexOfuser = repo.contain.indexOf(login);
              if (repo.contain.indexOf(login) != -1) {
                repo.contain.splice(indexOfuser,1);
              }
            })

            // On retire l'utilisateur de la liste d'utilisateurs local. 
            var index = users.indexOf(users.find(user => user.login == login));
            if (index != -1 ) {
              users.splice(index,1);
            }
            commit("FETCH_USERS",users);
            commit("FETCH_GROUPS",groups);
            commit("FETCH_REPOSITORIES",repositories);
            resolve(`L'utilisateur ${login} a été supprimé avec succès.`);
          }
        })
        .catch( error => {
          if (error.response) {
            console.log(`Error deleting ${login} : ${error.response.data.message}`);
          } else {
            console.log(`Error deleting ${login} : ${error}`);
          }
          reject(`Erreur lors de la suppression de l'utilisateur ${login}.`);
        })

      })

    },

    removeGroup({getters, commit},name) {
      return new Promise( (resolve,reject) => {
        axios.delete(`/group/${name}/remove`)
        .then(response => { 
          if (response.data.status === "success") { 
            var groups = getters.groups;
            var indexOfGroup = groups.indexOf(groups.find(gr => gr.name === name))
            groups.splice(indexOfGroup, 1);
            commit("FETCH_GROUPS",groups);
            resolve(`Le groupe ${name} a été supprimé avec succès.`)
          }
        })
        .catch( error => {
          if (error.response) {
            console.log(`Error deleting ${name} : ${error.response.data.message}`);
          } else {
            console.log(`Error deleting ${name} : ${error}`);
          }
          reject(`Erreur lors de la suppression du groupe ${name}.`);
        })
        
      })
    },

    addGroup({dispatch,state},name) {
      return new Promise( (resolve,reject) => {
        axios.post(`/group/${name}/create`)
        .then(response => {
          if (response.data.status === "success") {
            dispatch('loadData','groups').then( () => {
              state.users.data.forEach(user => {
                dispatch('getUserGroups',user.login);
              });
            });  

            resolve(`Le groupe ${name} a été crée.`) 
          }
        })
        .catch( error => {
          if (error.response) {
            console.log(`Error deleting ${name} : ${error.response.data.message}`);
          } else {
            console.log(`Error deleting ${name} : ${error}`);
          }
          reject(`Erreur lors de la création du groupe ${name}.`);
        })
      });
    },

    addUser({dispatch},data) {
      return new Promise( (resolve,reject) => {

        axios.post("/user/create",data,{})
        .then(response => {
          if (response.data.status === 'success') {
            dispatch('loadData','users');
            resolve(`L'utilisateur ${data.login} a été crée.`);
          }
        })
        .catch( error => {
          if (error.response) {
            console.log(`Error deleting ${data.login} : ${error.response.data.message}`);
          } else {
            console.log(`Error deleting ${data.login} : ${error}`);
          }
          reject(`Erreur lors de la création de l'utilisateur ${data.login}.`);
        })
      })
    },

    changeUserPassword({dispatch},{login, password}) {
      return new Promise( (resolve,reject) => {
        
        axios.put(`/user/${login}/password`, { password: password}, {})
        .then( response => {
          if (response.data.status === "success") {
            dispatch('loadData','users');
            resolve(`Le mot de passe de l'utilisateur ${login} a été mis à jour.`);
          }
        })
        .catch( error => {
          if (error.response) {
            console.log(`Error updating ${login} password : ${error.response.data.message}`);
          } else {
            console.log(`Error updating ${login} password : ${error}`);
          }
          reject(`Erreur lors de la modification du mot de passe de l'utilisateur ${login}.`);
        })
      });
    }

  
  },
  getters : {
    users: state => {
      return state.users.data;
    },
    groups: state => {
      return state.groups.data;
    },
    repositories: state => {
      return state.repositories.data;
    }
  },
  modules: {
  }
})
