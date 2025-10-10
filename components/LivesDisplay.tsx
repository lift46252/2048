import React from "react";
import { InfiniteLivesView } from "./InfiniteLivesView";
import { RegularLivesView } from "./RegularLivesView";

interface LivesDisplayProps {
  infiniteUntil?: Date;
}

export const LivesDisplay: React.FC<LivesDisplayProps> = ({
  infiniteUntil,
}) => {
  if (infiniteUntil) {
    return <InfiniteLivesView infiniteUntil={infiniteUntil} />;
  }

  return <RegularLivesView />;
};
