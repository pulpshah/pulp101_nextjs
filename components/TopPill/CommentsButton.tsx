import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Threads from "./Threads";
import { Comment } from "./types";

export default function CommentsButton({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandComments, setExpandComments] = useState(false);
  const [disableScroll, setDisableScroll] = useState(false);

  const handleDisableScroll = (disable: boolean) => setDisableScroll(disable);

  const pathname = usePathname();
  const slug = pathname?.split("/").pop();
  const handleDockLineClick = () => {
    setExpandComments((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen && slug) {
        setLoading(true);
        try {
          const response = await fetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
          });

          const data = await response.json();
          if (response.ok) {
            setComments(data as Comment[]); // Ensure the response matches the `Comment` type
          } else {
            console.error("Error fetching comments:", data.error);
          }
        } catch (error) {
          console.error("Error fetching comments:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [isOpen, slug]);

  return (
    <>
    <div className="flex flex-col items-center">
      <button onClick={onClick} className="flex items-center justify-center w-8 h-8">
        <Image
           src={isOpen ? "/icons/comments-filled-icon.svg" : "/icons/comments-icon.svg"}
          alt="Comments"
          width={24}
          height={24}
        />
      </button>
      </div>
    </>
  );
}
