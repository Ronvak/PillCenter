import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
export const appId = "Agora_App_ID";
const token = "Agora_Token";
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
export const CustomerId = "Agora_Customer_ID";
export const secret = "Agora_Secret";
