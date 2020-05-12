const { ControllerClient } = require('proto-tracker-controller-web/Tracker-controllerServiceClientPb')
const { GetConfigReq, GetEventsReq, GetVideoEventsReq, SetConfigReq, Config, CameraConfig, StorageConfig } = require('proto-tracker-controller-web/tracker-controller_pb')
import settings from '../../plugins/settings'

// var client = new ControllerClient("http://" + location.hostname + ":9090")
var client = new ControllerClient(settings.controllerServer)

/* eslint-disable */
export default {
    namespaced: true,
    state: {
		SetConfigResp: {},
		GetConfigResp: {},
		IsConfigured: false,
		GetEventsResp: {},
		GetVideoEventsResp: {},
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
            store.GetVideoEventsResp = GetVideoEventsResp 
        },
		IsConfigured(store, IsConfigured) {
			store.IsConfigured = IsConfigured
		}
    },
    actions: {
        SetConfig(store, obj) {
            var request = new SetConfigReq()
			var config = new Config()
			config.setConfigured(true)
			config.setUuid(obj.uuid)
			config.setHostname(obj.hostname)
			config.setNodename(obj.node_name)
			config.setPassword(obj.password)
			config.setPasswordagain(obj.password_again)

			for (var i = 0; i < obj.camera.length; i++) {
				var cameraConfig = new CameraConfig();
				var c = obj.camera[i]

				cameraConfig.setName(c.name)
				cameraConfig.setLocation(c.location)
                cameraConfig.setUri(c.uri)
                cameraConfig.setUsername(c.username)
                cameraConfig.setPassword(c.password)
                cameraConfig.setEnabled(c.enabled)
				config.addCamera(cameraConfig)
			}

			for (var i = 0; i < obj.storage.length; i++) {
				var storageConfig = new StorageConfig();
				var s = obj.storage[i]

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
        GetConfig(store) {
            var request = new GetConfigReq()
            var metadata = {}

            client.getConfig(request, metadata, function(err, response) {
                if (err) {
                    store.commit('GetConfigResp', null)
                } else {
                    var res = response.toObject()
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
                    store.commit('GetEventsResp', null)
                } else {
                    var res = response.toObject()
                    /* eslint-disable */
                    console.log(res)
                    store.commit('GetEventsResp', res)
                }
            })
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



