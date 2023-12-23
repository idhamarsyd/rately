import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface CommentProps {
  data: string;
  type: "positive" | "negative" | "neutral";
}

export function Comment({ data, type }: CommentProps) {
  const getSVGForType = () => {
    switch (type) {
      case "positive":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#00DFA2"
            viewBox="0 0 256 256"
          >
            <path d="M178.39,158c-11,19.06-29.39,30-50.39,30s-39.36-10.93-50.39-30a12,12,0,0,1,20.78-12c3.89,6.73,12.91,18,29.61,18s25.72-11.28,29.61-18a12,12,0,1,1,20.78,12ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128ZM92,124a16,16,0,1,0-16-16A16,16,0,0,0,92,124Zm72-32a16,16,0,1,0,16,16A16,16,0,0,0,164,92Z"></path>
          </svg>
        );
      case "negative":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#F94C10"
            viewBox="0 0 256 256"
          >
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212ZM76,108a16,16,0,1,1,16,16A16,16,0,0,1,76,108Zm104,0a16,16,0,1,1-16-16A16,16,0,0,1,180,108Zm-3.26,57a12,12,0,0,1-19.48,14,36,36,0,0,0-58.52,0,12,12,0,0,1-19.48-14,60,60,0,0,1,97.48,0Z"></path>
          </svg>
        );
      case "neutral":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#F8DE22"
            viewBox="0 0 256 256"
          >
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm52-52a12,12,0,0,1-12,12H88a12,12,0,0,1,0-24h80A12,12,0,0,1,180,160ZM76,108a16,16,0,1,1,16,16A16,16,0,0,1,76,108Zm104,0a16,16,0,1,1-16-16A16,16,0,0,1,180,108Z"></path>
          </svg>
        );
      default:
        return null; // Return null or a default SVG if the type is not recognized
    }
  };
  return (
    <div className="flex">
      <Avatar className="h-9 w-9">
        <AvatarFallback>{getSVGForType()}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-5">{data}</p>
        {/* <p className="text-sm text-muted-foreground">@laacolee</p> */}
      </div>
    </div>
  );
}
