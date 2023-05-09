import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "d3754641865b422f90f234d5766a4d8a";
const token =
  "007eJxTYAhd+6R3fpn3gb8Ha8+WLGmTsta89WoHswaXVPaCCrUcZQMFhhRjc1MTMxNDCzPTJBMjozRLgzQjY5MUU3Mzs0STFItEeY2olIZARoZJnVGsjAwQCOKzMOQmZuYxMAAA82wdBg==";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
