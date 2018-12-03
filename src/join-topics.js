module.exports = function (RED) {
    'use strict';
    function getNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        function getMandatories(topics) {
            var mandatories = [];
            for (var i in topics) {
                if (topics[i].mandatory) { mandatories.push(topics[i].topic); }
            }
            return mandatories;
        }
        function hasllAttributes(mandatories, obj) {
            var haveIt = true;
            for (var i = 0; i < mandatories.length && haveIt; i++) {
                haveIt = obj.hasOwnProperty(mandatories[i]);
            }
            return haveIt;
        }
        function getAllTopics(topics) {
            var allTopicNames = [];
            for (var i in topics) {
                allTopicNames.push(topics[i].topic);
            }
            return allTopicNames;
        }
        node.on('input', function (msg) {
            node.values = node.values || {};
            var mandatories = getMandatories(config.topics);
            var found = false;
            for (var i in config.topics) {
                if (config.topics[i].topic === msg.topic) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return;
            }
            node.values[msg.topic] = msg.payload;
            if ((mandatories.length > 0 && hasllAttributes(mandatories, node.values)) || hasllAttributes(getAllTopics(config.topics), node.values)) {
                node.send({ payload: node.values });
                node.values = {};
            }
        });
    }
    RED.nodes.registerType('join-topics', getNode);
};