// import React from "react";
// import Places from "google-places-web";

// import type {
//   LinksFunction,
//   LoaderFunction,
//   MetaFunction,
// } from "@remix-run/node";

// import type { ActionFunction } from "@remix-run/node";
// import { json } from "@remix-run/node";
// import {
//   Form,
//   Link,
//   useActionData,
//   useLoaderData,
//   useTransition,
// } from "@remix-run/react";

// import { getProgress } from "~/models/progress.server";
// import { Button, Input, Text } from "@chakra-ui/react";

// Places.apiKey = "your-api-key";

// type LoaderData = {
//   progress: Awaited<ReturnType<typeof getProgress>>;
// };

// type ActionData = {
//   correct: boolean;
// };

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const guess = formData.get("guess");
//   const location = formData.get("location");

//   const correct =
//     guess?.toString().toLowerCase() === location?.toString().toLowerCase();

//   return json<ActionData>({ correct });
// };

// export const loader: LoaderFunction = async ({ request }) => {
//   const progress = await getProgress();
//   return json<LoaderData>({ progress });
// };

// export default function Index() {
//   const transition = useTransition();
//   console.log(
//     "🚀 ~ file: index.tsx ~ line 40 ~ Index ~ transition",
//     transition
//   );
//   const actionData = useActionData();
//   const data = useLoaderData() as LoaderData;
//   // const user = useUser();
//   const guessRef = React.useRef<HTMLInputElement>(null);

//   const { progress } = data;
//   const { locations, currentStep } = progress ?? {};

//   const clue = locations?.[currentStep ?? 0]?.clue ?? "";
//   const locationName = locations?.[currentStep ?? 0]?.name ?? "";

//   return (
//     <div className="flex h-full min-h-screen flex-col">
//       <main className="flex h-full flex-col items-center justify-center">
//         <Text textStyle="body24" textAlign="center">
//           {clue}
//         </Text>
//         <Form method="post">
//           <input
//             type="text"
//             id="location"
//             name="location"
//             value={locationName}
//             readOnly
//             hidden
//           />
//           <Input
//             ref={guessRef}
//             id="guess"
//             required
//             autoFocus={true}
//             name="guess"
//             className="mt-4 w-full rounded border border-gray-500 px-2 py-1 text-lg"
//           />
//           <Button mt="2" w="full" variant="ghost" type="submit">
//             Guess!
//           </Button>
//         </Form>
//       </main>
//     </div>
//   );
// }
import { useEffect } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import Countdown from "react-countdown";
import { Button } from "@chakra-ui/react";
const { start } = require("~/components/animatedText");

export const loader: LoaderFunction = async ({ request }) => {
  return null;
};

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    start();
  }, []);

  return (
    <main>
      <svg
        className="circles"
        width="100%"
        height="100%"
        viewBox="0 0 1400 1400"
      >
        <path
          id="circle-1"
          d="M250,700.5A450.5,450.5 0 1 11151,700.5A450.5,450.5 0 1 1250,700.5"
        />
        <path
          id="circle-2"
          d="M382,700.5A318.5,318.5 0 1 11019,700.5A318.5,318.5 0 1 1382,700.5"
        />
        <path
          id="circle-3"
          d="M487,700.5A213.5,213.5 0 1 1914,700.5A213.5,213.5 0 1 1487,700.5"
        />
        <path
          id="circle-4"
          d="M567.5,700.5A133,133 0 1 1833.5,700.5A133,133 0 1 1567.5,700.5"
        />
        <text className="circles__text circles__text--1">
          <textPath
            className="circles__text-path"
            xlinkHref="#circle-1"
            aria-label=""
            textLength="2830"
          >
            t The Hunt&nbsp; 05/07&nbsp; The Hunt&nbsp; The Hunt&nbsp; The Hun
          </textPath>
        </text>
        <text className="circles__text circles__text--2">
          <textPath
            className="circles__text-path"
            xlinkHref="#circle-2"
            aria-label=""
            textLength="2001"
          >
            nt The Hunt&nbsp; The Hunt&nbsp; 05/07&nbsp; The Hu
          </textPath>
        </text>
        <text className="circles__text circles__text--3">
          <textPath
            className="circles__text-path"
            xlinkHref="#circle-3"
            aria-label=""
            textLength="1341"
          >
            unt 05/07&nbsp; The Hunt&nbsp; The H
          </textPath>
        </text>
        <text className="circles__text circles__text--4">
          <textPath
            className="circles__text-path"
            xlinkHref="#circle-4"
            aria-label=""
            textLength="836"
          >
            Hunt The Hunt&nbsp; 05/07&nbsp; The
          </textPath>
        </text>
      </svg>
      {/* <div className="content"></div> */}
      <Button
        bg="#d6ae7c"
        color="#000"
        borderRadius={99}
        height="100px"
        width="100px"
      >
        <Countdown className="enter__text" date="2022-05-07T17:00:00" />
        {/* <span className="enter__text">Enter</span> */}
      </Button>
    </main>
  );
}
