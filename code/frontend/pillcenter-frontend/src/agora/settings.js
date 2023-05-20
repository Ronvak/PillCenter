import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
export const appId = "d3754641865b422f90f234d5766a4d8a";
const token =
  "006d3754641865b422f90f234d5766a4d8aIADhA/BBal7ooESjHMQELlZS4P9FQWTmUxsSlh2J7Eb6AWTNKL8AAAAAIgC2U5MF12tiZAQAAQBnKGFkAgBnKGFkAwBnKGFkBABnKGFk";
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
export const CustomerId = "6c7198b759e44cd5bd58ad747299d1a0";
export const secret = "6e8ec06f42a848e39e4d98a7cb683c87";
