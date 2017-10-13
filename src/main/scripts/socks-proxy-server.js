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

var tcpOutSource = tcpController.routeClient("socks", 0, "127.0.0.1", 10000, null).get();
var socksSource = socksController.routeServer("tcp", 0, "tcp", tcpOutSource, "localhost:10000").get();
var tcpInSource = tcpController.routeServer("any", 1080, "socks", socksSource, address).get();
print("Socks proxy bound to 127.0.0.1:1080");

var tcpRemoteOutSource = tcpController.routeClient("socks", 0, "10.0.2.15", 10000, null).get();
var socksRemoteSource = socksController.routeServer("tcp", 0, "tcp", tcpRemoteOutSource, "10.0.2.15:10000").get();
var tcpRemoteInSource = tcpController.routeServer("any", 1081, "socks", socksRemoteSource, address).get();
print("Socks proxy bound to 127.0.0.1:1081");
