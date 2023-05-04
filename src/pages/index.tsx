import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

import relativetime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
// import { LoadingPage } from "~/components/loading";

dayjs.extend(relativetime);

const CreatePostWizard = () => {

  const { user } = useUser();

  const [input,setInput] = useState("");

  const ctx = api.useContext();

  const { mutate , isLoading: isPosting} = api.posts.create.useMutation({ 
    onSuccess: ()=>{setInput(""),
    void ctx.posts.getAll.invalidate();
  }});

  if (!user) return null;
  console.log(user);

  return (
    <div className="flex gap-3">
      <Image
        src={user.profileImageUrl}
        alt="Profile-Image"
        className="h-12 w-12 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="Type some emojis!"
        className="bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        disabled = {isPosting}
      />
      <button onClick={()=>mutate({content:input})}>Post</button>
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        src={author.profileImageUrl}
        className="h-12 w-12 rounded-full"
        alt={`@${author.username}`}
        width={56}
        height={56}
      // placeholder="blur"
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <span>{`@${author.username}`}</span>
          <span className="font-thin ">{`~ ${dayjs(
            post.createdAt
          ).fromNow()}`}</span>
        </div>
        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <div></div>;
  if (!data) return <div>Something went rong</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  api.posts.getAll.useQuery();

  if (!userLoaded) {
    <div>User not loaded </div>;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl ">
          <div className="flex border-b border-slate-400 p-4">
            {!isSignedIn && (
              <div className="flex justify-center">
                {" "}
                <SignInButton />{" "}
              </div>
            )}
            {isSignedIn && <CreatePostWizard />}
          </div>
          <Feed />
        </div>
      </main>
    </>
  );
};

export default Home;
