[![npm version](https://img.shields.io/npm/v/node-red-contrib-utils.svg?style=flat-square)](https://www.npmjs.com/package/node-red-contrib-utils?activeTab=versions)
[![npm](https://img.shields.io/npm/dt/node-red-contrib-utils.svg)](https://www.npmjs.com/package/node-red-contrib-utils)
[![npm downloads](https://img.shields.io/npm/dm/node-red-contrib-utils.svg?style=flat-square)](https://www.npmjs.com/package/node-red-contrib-utils)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/badges/shields.svg)](https://github.com/SergiuToporjinschi/node-red-contrib-utils)
[![GitHub last commit](https://img.shields.io/github/last-commit/SergiuToporjinschi/node-red-contrib-utils.svg)](https://github.com/SergiuToporjinschi/node-red-contrib-utils/commits/master)
[![GitHub stars](https://img.shields.io/github/stars/SergiuToporjinschi/node-red-contrib-utils.svg)](https://github.com/SergiuToporjinschi/node-red-contrib-utils/stargazers)
[![GitHub watchers](https://img.shields.io/github/watchers/SergiuToporjinschi/node-red-contrib-utils.svg)](https://github.com/SergiuToporjinschi/node-red-contrib-utils/watchers)
[![GitHub license](https://img.shields.io/github/license/SergiuToporjinschi/node-red-contrib-utils.svg)](https://github.com/SergiuToporjinschi/node-red-contrib-utils/blob/master/LICENSE)

# node-red-contrib-utils
Concatenates multiple messages based on a list of topics;
## Properties
* **Topics** (List of objects)
  List of objects as guidance for concatenation
* **Topic** (String)
  Expected topics
* **Mandatory** (Mandatory/Optional)
  The message will not be emitted through output if one of the mandatory topics is missing
### Inputs
Multiple messages that contains topic and payload
    
### Output
A message with all received topics as key and their payloads as values
If multiple meessages will have the same topic, the last message will be considered
The output message will be emitted when the last mandatory topic arrives. If there are no mandatory topics then will be emitted when all optional topics are received.

## Changelog

### v0.1.0 (December 03, 2018)
* Adding Join by Topics;

## Testing schema
```
[{"id":"e46f3c73.cf7c","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"37c0e705.96c6b8","type":"join-topics","z":"e46f3c73.cf7c","name":"Join","topics":[{"topic":"a","mandatory":false},{"topic":"b","mandatory":true},{"topic":"c","mandatory":false}],"x":410,"y":120,"wires":[["8be67450.049df8"]]},{"id":"bb62ca89.aac188","type":"inject","z":"e46f3c73.cf7c","name":"","topic":"a","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":210,"y":80,"wires":[["37c0e705.96c6b8"]]},{"id":"4b0e0dde.f4f554","type":"inject","z":"e46f3c73.cf7c","name":"","topic":"b","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":210,"y":120,"wires":[["37c0e705.96c6b8"]]},{"id":"8be67450.049df8","type":"debug","z":"e46f3c73.cf7c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":530,"y":120,"wires":[]},{"id":"e28ebc44.1cc6f","type":"inject","z":"e46f3c73.cf7c","name":"","topic":"c","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":210,"y":160,"wires":[["37c0e705.96c6b8"]]},{"id":"3036280f.7b5b78","type":"inject","z":"e46f3c73.cf7c","name":"","topic":"d","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":210,"y":200,"wires":[["37c0e705.96c6b8"]]}]
```
