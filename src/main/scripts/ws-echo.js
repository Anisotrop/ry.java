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

var wsSource = wsController.routeServer("http", 0, "ws", 0, "echo").get();
var httpSource = httpController.routeServer("tcp", 0, "ws", wsSource, headers).get(); 
var tcpSource = tcpController.routeServer("any", port, "http", httpSource, address).get();

print("WS echo bound to localhost:8080");

