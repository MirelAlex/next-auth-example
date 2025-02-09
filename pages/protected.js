import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";

export default function Page() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  const [img, setImg] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected");
      const json = await res.json();
      // console.log(json.body.img);
      if (json) {
        setContent(json.body.content);
        setImg(json.body.img);
      }
    };
    fetchData();
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }
  // console.log(body);
  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>{content || "\u00a0"}</strong>
      </p>
      <img src={img} alt="image"></img>
    </Layout>
  );
}
