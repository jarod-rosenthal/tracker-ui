const { ControllerClient } = require('proto-tracker-controller-web/Tracker-controllerServiceClientPb')
const { GetConfigReq, GetEventsReq, GetVideoEventsReq, SetConfigReq, SensorReportReq, GetContainerListReq, GetContainerLogReq, LoginReq, Config, CameraConfig, StorageConfig, IssueCommandReq } = require('proto-tracker-controller-web/tracker-controller_pb')
import settings from '../../plugins/settings'

// var client = new ControllerClient("http://" + location.hostname + ":9090")
var client = new ControllerClient(settings.controllerServer)

const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => { });
if (settings.environment == "DEV") {
  enableDevTools([
    client,
  ])
}

/* eslint-disable */
export default {
    namespaced: true,
    state: {
		SetConfigResp: {},
		GetConfigResp: {},
        IsConfigured: false,
        IsAuthenticated: false,
		GetEventsResp: {},
        GetVideoEventsResp: {},
        LoginResp: {},
        IssueCommandResp: {},
        GetSensorReportResp: {},
        GetContainerListResp: {},
        PackageVersion: process.env.VUE_APP_VERSION || '0'
    },
    getters: {
        appVersion: (state) => {
            return state.packageVersion
        }
    },
    mutations: {
        SetConfigResp(store, SetConfigResp) {
            store.SetConfigResp = SetConfigResp 
        },
        GetConfigResp(store, GetConfigResp) {
            store.GetConfigResp = GetConfigResp 
        },
        GetEventsResp(store, GetEventsResp) {
            store.GetEventsResp = GetEventsResp 
        },
        GetVideoEventsResp(store, GetVideoEventsResp) {
            store.GetVideoEventsResp = GetVideoEventsResp;
        },
		IsConfigured(store, IsConfigured) {
			store.IsConfigured = IsConfigured;
        },
        LoginResp(store, LoginResp) {
            store.LoginResp = LoginResp;
        },
        IsAuthenticated(store, IsAuthenticated) {
            store.IsAuthenticated = IsAuthenticated;
        },
        IssueCommandResp(store, IssueCommandResp) {
            store.IssueCommandResp = IssueCommandResp;
        },
        GetSensorReportResp(store, GetSensorReportResp) {
            store.GetSensorReportResp = GetSensorReportResp;
        },
        GetContainerListResp(store, GetContainerListResp) {
            store.GetContainerListResp = GetContainerListResp;
        },
        GetContainerLogResp(store, GetContainerLogResp) {
            store.GetContainerLogResp = GetContainerLogResp;
        }
    },
    actions: {
        IssueCommand(store, obj) {
            var request = new IssueCommandReq();
            var authToken = localStorage.getItem("authtoken");
            request.setCommand(obj.command);
            request.setAuthtoken(authToken);
            var metadata = {};
            client.issueCommand(request, metadata, function(err, response) {
                if (err) {
                    
                } else {
                    var res = response.toObject();
                    store.commit('IssueCommandResp', res);
                }
            })

        },
        SetConfig(store, obj) {
            var request = new SetConfigReq()
			var config = new Config()
			config.setConfigured(obj.configured ?? true)
            config.setUuid(obj.uuid)
            config.setUsername(obj.username);
			config.setHostname(obj.hostname)
			config.setNodename(obj.nodename)
			config.setPassword(obj.password)
			config.setPasswordagain(obj.passwordagain)

			for (var i = 0; i < obj.cameraList.length; i++) {
				var cameraConfig = new CameraConfig();
				var c = obj.cameraList[i]

				cameraConfig.setName(c.name);
				cameraConfig.setLocation(c.location);
                cameraConfig.setUri(c.uri);
                cameraConfig.setUsername(c.username);
                cameraConfig.setPassword(c.password);
                cameraConfig.setEnabled(c.enabled);
                cameraConfig.setType(c.type);
				config.addCamera(cameraConfig);
			}

			for (var i = 0; i < obj.storageList.length; i++) {
				var storageConfig = new StorageConfig();
				var s = obj.storageList[i]

				storageConfig.setName(s.name)
				storageConfig.setLocation(s.location)

				config.addStorage(storageConfig)
			}

			request.setConfig(config)

            var metadata = {}
            client.setConfig(request, metadata, function(err, response) {
                if (err) {
                    store.commit('SetConfigResp', null)
                } else {
                    var res = response.toObject()
                    store.commit('SetConfigResp', res)
                }
            })
        },
        AutoLogin(store) {
            var authToken = localStorage.getItem("authtoken");
            if(authToken === undefined  || authToken === null || authToken === "") {
                store.dispatch("GetConfig");
                return;
            }

            var request = new LoginReq();
            request.setAuthtoken(authToken);
            var metadata = {};
            client.login(request, metadata, function(err, response) {
                if(err) {
                    store.commit('LoginResp', null);
                    return;
                } else {
                    var res = response.toObject()
                    store.commit('LoginResp', res);
                    store.commit('IsAuthenticated', res.success);
                    store.dispatch("GetConfig");
                }
            });
        },
        Login(store, obj) {
            var request = new LoginReq();
            request.setUsername(obj.username);
            request.setPassword(obj.password);
            request.setAuthtoken("");
            var metadata = {};
            client.login(request, metadata, function(err, response) {
                
                if(err) {
                    store.commit('LoginResp', null);
                } else {
                    var res = response.toObject()
                    store.commit('LoginResp', res);
                    store.commit('IsAuthenticated', res.success);
                    localStorage.setItem("authtoken", res.authtoken);
                    store.dispatch("GetConfig");
                    console.log(res);
                }
            });
        },
        Logout(store) {
            store.commit('LoginResp', null);
            store.commit('IsAuthenticated', false)
            localStorage.removeItem("authtoken");
            this.$router.push('home')
        },        
        GetConfig(store) {
            var request = new GetConfigReq()
            var metadata = {}

            client.getConfig(request, metadata, function(err, response) {
                if (err) {
                    store.commit('GetConfigResp', null)
                } else {
                    var res = response.toObject()
                    console.log(res);
                    store.commit('GetConfigResp', res)
					store.commit('IsConfigured', res.config.configured)
                }
            })
		},
        GetEvents(store, obj) {
            var request = new GetEventsReq()
            var metadata = {}
			var limit = obj['limit']
			var page = obj['page']

			request.setLimit(limit)
			request.setPage(page)

            client.getEvents(request, metadata, function(err, response) {
                if (err) {
                    store.commit('GetEventsResp', null);
                } else {
                    var res = response.toObject();
                    /* eslint-disable */
                    console.log(res);
                    store.commit('GetEventsResp', res);
                }
            })
		},
        GetSensorReport(store, obj) {
            var request = new SensorReportReq()
            var metadata = {}

            client.getSensorReport(request, metadata, function(err, response) {
                if (err) {
                    store.commit('GetSensorReportResp', null);
                } else {
                    var res = response.toObject()
                    /* eslint-disable */
                    console.log("GetSensorReport", res);
                    store.commit('GetSensorReportResp', res);
                }
            })
        },
        getProducts({commit}, type) {
            return axios.get(`/api/products/${type}`)
                .then(res => {
                    let products = res.data;
                    commit('SET_PRODUCTS', {products, type})
                }).catch(err => {
                console.log(err);
            })
        },        
        async GetContainerList(store, obj) {
            var request = new GetContainerListReq();
            var metadata = {}

            try {
                var response = await client.getContainerList(request, metadata);
                var res = response.toObject()
                /* eslint-disable */
                console.log("GetContainerList", res);
                store.commit('GetContainerListResp', res);
            } catch (err) {
                store.commit('GetContainerListResp', null);
            }
        },
        async GetContainerLog(store, obj) {
            var request = new GetContainerLogReq();
            request.setContainerid(obj.containerid);
            var metadata = {}
            try {
                var response = await client.getContainerLog(request, metadata)
                var res = response.toObject()
                /* eslint-disable */
                console.log("GetContainerLog", res);
                store.commit('GetContainerLogResp', res);
            } catch(err) {
                store.commit('GetContainerLogResp', null);
            }
        },
        GetVideoEvents(store, obj) {
            var request = new GetVideoEventsReq()
            var metadata = {}
			var limit = obj['limit']
			var page = obj['page']

			request.setLimit(limit)
			request.setPage(page)

            client.getVideoEvents(request, metadata, function(err, response) {
                if (err) {
                    store.commit('GetVideoEventsResp', null)
                } else {
                    var res = response.toObject()
                    /* eslint-disable */
                    console.log(res)
                    store.commit('GetVideoEventsResp', res)
                }
            })
		},
	},
}



