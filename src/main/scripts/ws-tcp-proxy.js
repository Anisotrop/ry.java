/*
 * Copyright 2016-2017 Kaazing Corporation. All rights reserved.
 */
var InetAddress = Java.type('java.net.InetAddress');
var HashMap = Java.type('java.util.HashMap');


var headers = new HashMap();
headers.put("upgrade", "websocket");
headers.put(":authority", "localhost:8080");

var port = 8080;
var address = InetAddress.getByName("127.0.0.1");

tcpController.routeClient("ws", 0, "127.0.0.1", 1050, null)
    .thenCompose(function (tcpOutputRef) {
        return wsController.routeServer("http", 0, "tcp", tcpOutputRef, null);
    })
    .thenCompose(function (wsInputRef) {
        return httpController.routeServer("tcp", 0, "ws", wsInputRef, headers);
    })
    .thenCompose(function (httpInputRef) {
        return tcpController.routeServer("any", port, "http", httpInputRef, address);
    })
    .thenAccept(function () {
        print("WS proxy bound to localhost:8080");
    });
