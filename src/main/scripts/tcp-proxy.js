/*
 * Copyright 2016-2017 Kaazing Corporation. All rights reserved.
 */
var InetAddress = Java.type('java.net.InetAddress');

var inPort = 9090;
var outPort = 10000;

var address = InetAddress.getByName("127.0.0.1");
tcpController.routeClient("tcp", 0, "127.0.0.1", outPort, null)
    .thenCompose(function (tcpOutputRef) {
        return tcpController.routeServer("any", inPort, "tcp", tcpOutputRef, address);
    }).thenAccept(function () {
        print("TCP proxy bound to localhost:" + inPort);
    });

