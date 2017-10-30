/*
 * Copyright 2016-2017 Kaazing Corporation. All rights reserved.
 */
var InetAddress = Java.type('java.net.InetAddress');
var HashMap = Java.type('java.util.HashMap');

var address = InetAddress.getByName("127.0.0.1");

var tcpOutSource = tcpController.routeClient("socks", 0, "127.0.0.1", 1080, null).get();
var socksSource = socksController.routeClient("tcp", 0, "tcp", tcpOutSource, "localhost:10000").get();
var tcpInSource = tcpController.routeServer("any", 8080, "socks", socksSource, address).get();
print("Socks proxy bound to localhost:8080");


var tcpSshOutSource = tcpController.routeClient("socks", 0, "127.0.0.1", 1082, null).get();
var socksSshSource = socksController.routeClient("tcp", 0, "tcp", tcpSshOutSource, "localhost:10000").get();
var tcpSshInSource = tcpController.routeServer("any", 8081, "socks", socksSshSource, address).get();
print("Socks proxy bound to localhost:8081");
