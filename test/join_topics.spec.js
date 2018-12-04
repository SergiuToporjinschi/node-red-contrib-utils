var should = require("should");
var helper = require("node-red-node-test-helper");
var joinNode = require("../src/join-topics.js");

helper.init(require.resolve('node-red'));

describe('join-topics Node', function () {
    var flow = [{
        "id": "joinTopics",
        "type": "join-topics",
        "name": "Join",
        "topics": [{
            "topic": "a",
            "mandatory": false
        }, {
            "topic": "b",
            "mandatory": true
        }, {
            "topic": "c",
            "mandatory": false
        }],
        "wires": [["debug"]]
    }, {
        "id": "debug",
        "type": "helper",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "wires": []
    }];

    before(function (done) {
        helper.startServer(done);
    });

    after(function (done) {
        helper.stopServer(done);
    });

    afterEach(function () {
        helper.unload();
    });

    it('should be loaded', function (done) {
        var flow = [{ id: "n1", type: "join-topics", name: "join-topics" }];
        helper.load(joinNode, flow, function () {
            var n1 = helper.getNode("n1");
            n1.should.have.property('name', 'join-topics');
            done();
        });
    });

    it('Should output single mandatory field', function (done) {
        helper.load(joinNode, flow, function () {
            var debug = helper.getNode("debug");
            var joinTopics = helper.getNode("joinTopics");
            debug.on('input', function (msg) {
                msg.should.have.property('payload', { b: 2 });
                done();
            });
            joinTopics.emit("input", { payload: 2, topic: "b" });
        });
    });

    it('Should output the last value of single mandatory field', function (done) {
        flow[0].topics[0].mandatory = true;
        helper.load(joinNode, flow, function () {
            var debug = helper.getNode("debug");
            var joinTopics = helper.getNode("joinTopics");
            debug.on('input', function (msg) {
                msg.should.have.property('payload', { b: 2, a: 1 });
                done();
            });
            joinTopics.emit("input", { payload: 1, topic: "b" });
            joinTopics.emit("input", { payload: 2, topic: "b" });
            joinTopics.emit("input", { payload: 1, topic: "a" });
        });
    });

    it('Should output two mandatory fields', function (done) {
        helper.load(joinNode, flow, function () {
            var debug = helper.getNode("debug");
            var joinTopics = helper.getNode("joinTopics");

            debug.on('input', function (msg) {
                msg.should.have.property('payload', { b: 2, a: 1 });
                done();
            });
            joinTopics.emit("input", { payload: 1, topic: "a" });
            joinTopics.emit("input", { payload: 2, topic: "b" });
        });
    });

    it('Should output two mandatory and first is sent twice', function (done) {
        helper.load(joinNode, flow, function () {
            var debug = helper.getNode("debug");
            var joinTopics = helper.getNode("joinTopics");

            debug.on('input', function (msg) {
                msg.should.have.property('payload', { b: 2, a: 1 });
                done();
            });
            joinTopics.emit("input", { payload: 1, topic: "a" });
            joinTopics.emit("input", { payload: 2, topic: "b" });
            joinTopics.emit("input", { payload: 3, topic: "c" });
        });
    });
    it('Should output all optionals, no mandatory fields', function (done) {
        flow[0].topics[0].mandatory = false;
        flow[0].topics[1].mandatory = false;
        flow[0].topics[2].mandatory = false;
        helper.load(joinNode, flow, function () {
            var debug = helper.getNode("debug");
            var joinTopics = helper.getNode("joinTopics");
            debug.on('input', function (msg) {
                msg.should.have.property('payload', { a: 2, b: 1, c: 1 });
                done();
            });
            joinTopics.emit("input", { payload: 1, topic: "a" });
            joinTopics.emit("input", { payload: 2, topic: "a" });
            joinTopics.emit("input", { payload: 1, topic: "b" });
            joinTopics.emit("input", { payload: 1, topic: "c" });
        });
    });
});