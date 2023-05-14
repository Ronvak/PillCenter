import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
const appId = "d3754641865b422f90f234d5766a4d8a";
const token =
  "006d3754641865b422f90f234d5766a4d8aIAA6eS1wE8od6/F2UE39dkYS0pHKxfBJitTH+S2eB3V1/GTNKL8AAAAAIgBmXI8FQ1liZAQAAQCyFWFkAgCyFWFkAwCyFWFkBACyFWFk";
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
