import { useRouter } from "next/router";
import { useEffect } from "react";

const clerkUrl = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;
const accountsUrl = clerkUrl.replace("clerk.", "accounts.");

const redirectToSignUp = ({ ticket, redirectUrl }) => {
  if (!redirectUrl.startsWith("https://")) {
    redirectUrl = window.location.origin + redirectUrl;
  }
  window.location.href = `https://${accountsUrl}/sign-up?__clerk_ticket=${ticket}&redirect_url=${redirectUrl}`;
};

const redirectToSignIn = ({ ticket, redirectUrl }) => {
  if (!redirectUrl.startsWith("https://")) {
    redirectUrl = window.location.origin + redirectUrl;
  }
  window.location.href = `https://${accountsUrl}/sign-in?__clerk_ticket=${ticket}&redirect_url=${redirectUrl}`;
};

export default function InvitationCallback() {
  const router = useRouter();
  useEffect(() => {
    const qs = new URL(window.location.href).searchParams;
    if (qs.get("__clerk_status") === "sign_up") {
      redirectToSignUp({
        ticket: qs.get("__clerk_ticket"),
        redirectUrl: qs.get("final_url"),
      });
    } else if (qs.get("__clerk_status") === "sign_in") {
      redirectToSignIn({
        ticket: qs.get("__clerk_ticket"),
        redirectUrl: qs.get("final_url"),
      });
    } else if (qs.get("__clerk_status") === "complete") {
      router.push(qs.get("final_url"));
    }
  }, []);
  return null;
}
