const { RtcTokenBuilder, RtcRole } = require("agora-token");

const generateRtcToken = () => {
  // Rtc Examples
  const appId = "d3754641865b422f90f234d5766a4d8a";
  const appCertificate = "086e46eb10be41a5b00982c16279b6e6";
  const channelName = "main";
  const uid = 0;
  const userAccount = "test_user_id";
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // Build token with uid
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );
  console.log("Token With Integer Number Uid: " + token);

  return token;
};
generateRtcToken();
