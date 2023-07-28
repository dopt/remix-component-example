import type { V2_MetaFunction } from "@remix-run/node";

import { type ReactNode } from "react";
import { DoptProvider } from "@dopt/react";
import TourItem, { useTourItem } from "@dopt/react-tour";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <DoptProvider
      userId="SOME_USER_ID"
      apiKey="YOUR_BLOCKS_API_KEY"
      flowVersions={{ "YOUR_FLOW_ID": 0 }}
    >
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1>Welcome to Remix</h1>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/blog"
              rel="noreferrer"
            >
              15m Quickstart Blog Tutorial
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/jokes"
              rel="noreferrer"
            >
              Deep Dive Jokes App Tutorial
            </a>
          </li>
          <li>
            <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
              Remix Docs
            </a>
          </li>
        </ul>

        <DoptTourStep>
          <button>I'm a button with a tour attached</button>
        </DoptTourStep>
      </div>
    </DoptProvider>
  );
}

function DoptTourStep({ children }: { children: ReactNode }) {
  const tourItem = useTourItem("YOUR_TOUR_BLOCK_ID");

  if (!tourItem) {
    return children;
  }

  return (
    <TourItem.Root active={tourItem.active}>
      <TourItem.Anchor>{children}</TourItem.Anchor>
      <TourItem.Popover position="right">
        <TourItem.Content>
          <TourItem.Header>
            <TourItem.Title>{tourItem.title}</TourItem.Title>
            <TourItem.DismissIcon onClick={tourItem.tour.dismiss} />
          </TourItem.Header>
          <TourItem.Body>{tourItem.body}</TourItem.Body>
          <TourItem.Footer>
            <TourItem.BackButton>{tourItem.backLabel}</TourItem.BackButton>
            <TourItem.NextButton onClick={tourItem.next}>
              {tourItem.nextLabel}
            </TourItem.NextButton>
          </TourItem.Footer>
          <TourItem.Progress
            count={tourItem.tour.size}
            index={tourItem.index}
          />
        </TourItem.Content>
      </TourItem.Popover>
    </TourItem.Root>
  );
}
