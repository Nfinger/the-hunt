import React from "react";
import Places from "google-places-web";

import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";

import { getProgress } from "~/models/progress.server";
import { Button, Input, Text } from "@chakra-ui/react";

Places.apiKey = "your-api-key";

type LoaderData = {
  progress: Awaited<ReturnType<typeof getProgress>>;
};

type ActionData = {
  correct: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const guess = formData.get("guess");
  const location = formData.get("location");

  const correct =
    guess?.toString().toLowerCase() === location?.toString().toLowerCase();

  return json<ActionData>({ correct });
};

export const loader: LoaderFunction = async ({ request }) => {
  const progress = await getProgress();
  return json<LoaderData>({ progress });
};

export default function Index() {
  const transition = useTransition();
  console.log(
    "🚀 ~ file: index.tsx ~ line 40 ~ Index ~ transition",
    transition
  );
  const actionData = useActionData();
  const data = useLoaderData() as LoaderData;
  // const user = useUser();
  const guessRef = React.useRef<HTMLInputElement>(null);

  const { progress } = data;
  const { locations, currentStep } = progress ?? {};

  const clue = locations?.[currentStep ?? 0]?.clue ?? "";
  const locationName = locations?.[currentStep ?? 0]?.name ?? "";

  return (
    <div className="flex h-full min-h-screen flex-col">
      <main className="flex h-full flex-col items-center justify-center">
        <Text textStyle="body24" textAlign="center">
          {clue}
        </Text>
        <Form method="post">
          <input
            type="text"
            id="location"
            name="location"
            value={locationName}
            readOnly
            hidden
          />
          <Input
            ref={guessRef}
            id="guess"
            required
            autoFocus={true}
            name="guess"
            className="mt-4 w-full rounded border border-gray-500 px-2 py-1 text-lg"
          />
          <Button mt="2" w="full" variant="ghost" type="submit">
            Guess!
          </Button>
        </Form>
      </main>
    </div>
  );
}
