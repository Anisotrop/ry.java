/*
 * Copyright 2016-2017 Kaazing Corporation. All rights reserved.
 */
var InetAddress = Java.type('java.net.InetAddress');

var port = 8080;
var address = InetAddress.getByName("127.0.0.1");
tcpController.routeServer("any", port, "tcp", 0, address);

print("TCP echo bound to " + address + ":" + port);
