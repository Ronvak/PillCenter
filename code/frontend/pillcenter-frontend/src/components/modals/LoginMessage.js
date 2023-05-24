import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

function LoginSuccess() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("כניסתך למערכת הושלמה בהצלחה!", { variant: "success" });
  }, []);

  return null; // No need to render anything
}

export default function LoginMessage() {
  return (
    <SnackbarProvider maxSnack={3}>
      <LoginSuccess />
    </SnackbarProvider>
  );
}
