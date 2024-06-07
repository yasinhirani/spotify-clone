function NextIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6 17L14 12L6 7V17Z" fill="currentColor" />
      <path d="M18 7H15V12V17H18V7Z" fill="currentColor" />
    </svg>
  );
}

export default NextIcon