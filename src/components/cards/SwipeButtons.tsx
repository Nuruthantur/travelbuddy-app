import { SwipeButtonProps } from "@/types";

export type CardProps = {
  data: CardData;
  active: boolean;
  removeCard: (id: number, action: "right" | "left") => void;
};

export type SwipeButtonProps = {
  exit: (value: SetStateAction<number>) => void;
  removeCard: (id: number, action: "right" | "left") => void;
  id: number;
};

export default function SwipeButton({
  exit,
  removeCard,
  id,
}: SwipeButtonProps) {
  const handleSwipe = (action: "left" | "right") => {
    if (action === "left") {
      exit(-200);
    } else if (action === "right") {
      exit(200);
    }
    removeCard(id, action);
  };
  return (
    <div className="flex items-center space-x-8 absolute top-10">
      <button
        onClick={() => handleSwipe("left")}
        className="px-3 py-2 bg-teal-800 text-textGrey font-semibold rounded-md">
        Left
      </button>
      <button
        onClick={() => handleSwipe("right")}
        className="px-3 py-2 bg-teal-800 text-textGrey font-semibold rounded-md">
        Right
      </button>
    </div>
  );
}
