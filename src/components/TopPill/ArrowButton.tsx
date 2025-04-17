export default function ArrowButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
    return (
        <div
        className={`fixed top-1/2 right-[27%] transform -translate-y-1/2 z-[60] cursor-pointer  ${
          isOpen ? "" : ""
        } transition-transform`}
        onClick={onClick}
      >
        <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full shadow-md">
          <span className="text-white text-lg font-bold">&gt;&gt;</span>
        </div>
      </div>
    );
  }
  