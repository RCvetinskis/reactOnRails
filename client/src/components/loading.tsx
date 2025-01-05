import { cn } from "../lib/utils";

type Props = {
  className?: string;
};
const Loading = ({ className }: Props) => {
  return (
    <div className="flex items-center justify-center w-full ">
      <div
        className={cn(
          "animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-200 dark:border-blue-700",
          className
        )}
      ></div>
    </div>
  );
};

export default Loading;
