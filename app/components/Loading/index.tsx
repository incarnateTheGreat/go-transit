import "./loading.css";

import { cn } from "~/utils";

type LoadingProps = {
  variant?: "small";
};

export default function Loading({ variant }: LoadingProps) {
  return (
    <span
      className={cn("loader", {
        small: variant,
      })}
    />
  );
}
