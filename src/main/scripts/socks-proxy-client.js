/*
 * Copyright 2016-2017 The Reaktivity Project
 *
 * The Reaktivity Project licenses this file to you under the Apache License,
 * version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
var InetAddress = Java.type('java.net.InetAddress');
var HashMap = Java.type('java.util.HashMap');

var address = InetAddress.getByName("127.0.0.1");

var tcpOutSource = tcpController.routeClient("socks", 0, "127.0.0.1", 1080, null).get();
var socksSource = socksController.routeClient("tcp", 0, "tcp", tcpOutSource, "forward", "localhost:10000").get();
var tcpInSource = tcpController.routeServer("any", 8080, "socks", socksSource, address).get();
print("Socks proxy bound to localhost:8080");


var tcpSshOutSource = tcpController.routeClient("socks", 0, "127.0.0.1", 1082, null).get();
var socksSshSource = socksController.routeClient("tcp", 0, "tcp", tcpSshOutSource, "forward", "localhost:10000").get();
var tcpSshInSource = tcpController.routeServer("any", 8081, "socks", socksSshSource, address).get();
print("Socks proxy bound to localhost:8081");
