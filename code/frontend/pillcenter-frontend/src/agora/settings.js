import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
const appId = "d3754641865b422f90f234d5766a4d8a";
const token =
  "007eJxTYOj9/PYfr0HaxrAQRWWVqtJNr1raHoZ5/FRJmHHwy7tTtncVGFKMzU1NzEwMLcxMk0yMjNIsDdKMjE1STM3NzBJNUiwSraVjU7w1Y1PC5i9hYmRgZGABYhBgApPMYJIFSuYmZuYxMAAAsLYfbQ==";
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
