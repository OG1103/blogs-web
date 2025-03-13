import React, { useEffect } from "react";

type TMetaTagsProps = {
  title?: string;
  description?: string;
}

const MetaTags: React.FC<TMetaTagsProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${title} | Share Your Thoughts` : "Share Your Thoughts";
  }, [title]);

  return (
    <head>
      <meta name="description" content={description || "A blogging platform to share your thoughts with the world."} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
  );
};

export default MetaTags;
