'use strict';
const Docker = require('node-docker-api').Docker;
const util = require('util')
let docker = new Docker({ socketPath: '/var/run/docker.sock' });

// List
docker.container.list()
  .then((containers) => {
    containers.forEach((container) => {
      var container_item = {
        "name" : container.data.Names[0].replace('/', ''),
        "running" : container.data.State == 'running'
      }
        if (container_item.running) { console.log("docker container stop " + container_item.name)}
      //console.log(util.inspect(container.data.Mounts))
      container.data.Mounts.forEach((mount) => {
        //console.log(container_item.name)
        if(mount.Type == "volume") {
          //console.log(util.inspect(mount,{showHidden: false, depth: null, colors: true}))
          console.log("docker run --rm --volumes-from "+container_item.name+" -v /docker/backup/:/backup ubuntu tar czvf /backup/"+mount.Name+".tar.gz "+mount.Destination)
        }
      })
        if (container_item.running) { console.log("docker container start " + container_item.name)}
                //container.HostConfig.Mounts.forEach((mount) => {
                //      console.log(mount)
                //})
                //container_item.running = container.State.Running
                //container_item.name = container.Name.replace('/', '')
                //if (container_item.running) { console.log("docker container stop " + container_item.name) }
                //console.log(util.inspect(container,{showHidden: false, depth: null, colors: true}))
        })
  })
