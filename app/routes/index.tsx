import React from "react";
import type { LoaderFunction } from "@remix-run/node";

import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";

import { Button, Flex, Input, Text, HStack } from "@chakra-ui/react";
import Webcam from "react-webcam";

import { getProgress, updateProgress } from "~/models/progress.server";
import {
  getLocations,
  updateHasVisited,
  updateCorrectGuess,
} from "~/models/location.server";
import { QrCode } from "~/components/qrCode";
import { Steps } from "~/components/Steps";
import type { Location } from "@prisma/client";
import { isBefore } from "date-fns";
import CountdownPage from "~/components/Countdown";
import { uploadUserImage } from "~/models/user.server";
import { getUser } from "~/session.server";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  progress: Awaited<ReturnType<typeof getProgress>>;
  locations: Awaited<ReturnType<typeof getLocations>>;
};

type ActionData = {
  correct: boolean;
  index?: number;
};

const getQRPosition = (index: number) => {
  let position = "";
  switch (index) {
    case 0:
      position = "top-left";
      break;
    case 1:
      position = "top-right";
      break;
    case 2:
      position = "bottom-left";
      break;
    case 3:
      position = "bottom-right";
      break;
    default:
      position = "top-left";
      break;
  }
  return position;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const locationId = formData.get("locationId");
  const guess = formData.get("guess");
  const location = formData.get("location");
  const index = formData.get("index");
  const photo = formData.get("photo");
  const hasBeenVisited = formData.get("hasBeenVisited");

  if (hasBeenVisited) {
    await updateHasVisited(locationId as string);
    await uploadUserImage(
      userId as string,
      parseInt(index as string),
      photo as string
    );
    await updateProgress(parseInt(index as string) + 1);
    return json<ActionData>({
      correct: true,
      index: parseInt(index as string) + 1,
    });
  } else {
    const correct =
      guess?.toString().toLowerCase() === location?.toString().toLowerCase();

    if (correct) {
      await updateCorrectGuess(locationId as string);
    }
    return json<ActionData>({ correct });
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const progress = await getProgress();
  const locations = await getLocations();
  return json<LoaderData>({ user, progress, locations });
};

export default function Index() {
  const data = useLoaderData() as LoaderData;
  const actionData = useActionData() as ActionData;
  const transition = useTransition();

  const { user, locations, progress } = data;

  const [activeIndex, setActiveIndex] = React.useState(
    progress?.currentStep ?? 0
  );
  const [locationPhoto, setLocationPhoto] = React.useState(
    user?.images[activeIndex]
  );
  const ref = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (transition.state == "submitting") {
      ref.current && ref.current.reset();
    }
    if (actionData?.index) {
      setActiveIndex(actionData.index);
      setLocationPhoto("");
    }
  }, [transition]);

  if (!progress || !locations) return null;

  if (isBefore(new Date(), new Date("2022-05-07T17:00:00"))) {
    return <CountdownPage />;
  }

  const handleClick = (index: number) => {
    const currentStep = progress?.currentStep ?? 0;
    if (index <= currentStep) {
      setActiveIndex(index);
      setLocationPhoto(user?.images[index]);
    }
  };

  const videoConstraints = {
    facingMode: "user",
  };

  const buildContent = (location: Location) => {
    const { id, clue, name, boldWord, hasBeenGuessed } = location;

    let content = (
      <>
        <Text textStyle="body24" textAlign="center">
          {clue.split(" ").map((word) =>
            word === boldWord ? (
              <Text as="span" textStyle="bold" color="#d6ae7c">
                {word}{" "}
              </Text>
            ) : (
              `${word} `
            )
          )}
        </Text>
        <Form method="post" ref={ref}>
          <input
            type="text"
            id="userId"
            name="userId"
            value={user?.id}
            readOnly
            hidden
          />
          <input
            type="text"
            id="locationId"
            name="locationId"
            value={id}
            readOnly
            hidden
          />
          <input
            type="text"
            id="location"
            name="location"
            value={name}
            readOnly
            hidden
          />
          <Input
            my={4}
            id="guess"
            required
            isInvalid={actionData?.correct === false}
            errorBorderColor={actionData?.correct === false ? "crimson" : ""}
            autoFocus={true}
            name="guess"
          />
          {actionData?.correct === false && (
            <Text mb={4} textAlign="center" color="crimson">
              Guess again you fool!
            </Text>
          )}
          <Button
            mt="2"
            w="full"
            variant="ghost"
            type="submit"
            colorScheme={actionData?.correct === false ? "red" : ""}
          >
            Guess!
          </Button>
        </Form>
      </>
    );

    if (hasBeenGuessed) {
      content = locationPhoto ? (
        <Form method="post" ref={ref}>
          <img src={locationPhoto} />
          <input
            type="text"
            id="userId"
            name="userId"
            value={user?.id}
            readOnly
            hidden
          />
          <input
            type="text"
            id="locationId"
            name="locationId"
            value={id}
            readOnly
            hidden
          />
          <input
            type="text"
            id="photo"
            name="photo"
            value={locationPhoto}
            readOnly
            hidden
          />
          <input
            type="text"
            id="hasBeenVisited"
            name="hasBeenVisited"
            value="true"
            readOnly
            hidden
          />
          <input
            type="text"
            id="index"
            name="index"
            value={activeIndex}
            readOnly
            hidden
          />
          <HStack spacing={10} justify="center" mt="4">
            <Button onClick={() => setLocationPhoto("")}>Retake?</Button>
            <Button type="submit">Continue</Button>
          </HStack>
        </Form>
      ) : (
        <>
          <Text textStyle="body24" textAlign="center">
            Congratulations! You've guessed the location!
          </Text>
          <Text textStyle="body24" textAlign="center">
            Take a photo of the location to remember your visit!
          </Text>
          <Webcam
            audio={false}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }) => (
              <Button
                mt="4"
                onClick={() => {
                  const imageSrc = getScreenshot();
                  setLocationPhoto(imageSrc ?? "");
                }}
              >
                Capture photo
              </Button>
            )}
          </Webcam>
        </>
      );
    }
    return content;
  };

  return (
    <Flex flexDirection="column" justify="center" align="center">
      <QrCode position={getQRPosition(activeIndex)} />
      <Steps onClick={handleClick} currentStep={progress.currentStep} />
      {progress.currentStep < locations.length ? (
        buildContent(locations[activeIndex])
      ) : (
        <>
          <Text textStyle="body24" textAlign="center">
            Alright I concede!
          </Text>
          <Text textStyle="body24" textAlign="center">
            You win! I'm not a sore loser
          </Text>
          <br />
          <Text textStyle="body24" textAlign="center">
            I totally wouldn't do something petty like make you solve where were
            going to dinner...
          </Text>
          <br />
          <br />
          <Text textStyle="body24" textAlign="center">
            Yeah I would, I totally did.
          </Text>
        </>
      )}
    </Flex>
  );
}
