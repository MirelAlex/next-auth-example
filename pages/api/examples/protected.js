// This is an example of to protect an API route
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    res.send({
      body: {
        content:
          "This is protected content. You can access this content because you are signed in.",
        img: "https://lh3.googleusercontent.com/proxy/YeRYM0teNWZNSLfS4_HIBzKpujMfM23t8jpto2zpc-Mw5cZPgo-hP-PK_Zy67aNpUBuDMWkvnIL0zRBKYES7IzgIpwUxix2zleqgu9GTZsGV8mpKvv5jWjBo0cEMpyzNT6AJIZotpBJrCkS4Gvd3A0tP",
      },
    });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};
