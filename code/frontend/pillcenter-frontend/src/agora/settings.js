import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
const appId = "d3754641865b422f90f234d5766a4d8a";
const token =
  "006d3754641865b422f90f234d5766a4d8aIADhA/BBal7ooESjHMQELlZS4P9FQWTmUxsSlh2J7Eb6AWTNKL8AAAAAIgC2U5MF12tiZAQAAQBnKGFkAgBnKGFkAwBnKGFkBABnKGFk";
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
