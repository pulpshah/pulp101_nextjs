import { PropsWithChildren } from "react";

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-start justify-center pt-3 pb-10 w-full mx-auto blog-content">
      {children}
    </div>
  );
}
