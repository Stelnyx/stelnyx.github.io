import { Fragment } from "react";

interface PkgNameProps {
  text: string;
  className?: string;
}

export function PkgName({ text, className }: PkgNameProps) {
  const parts = text.split("@");
  if (parts.length < 2) {
    return <span className={className}>{text}</span>;
  }
  return (
    <span className={className} data-cf-no-email="true">
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <span data-cf-skip>{"@"}</span>}
          {part}
        </Fragment>
      ))}
    </span>
  );
}
