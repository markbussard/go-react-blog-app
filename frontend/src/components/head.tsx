import { memo } from "react";
import { Helmet } from "react-helmet-async";

export type HeadProps = {
  title?: string;
  description?: string;
};

const HeadComponent = (props: HeadProps) => {
  return (
    <Helmet title={props.title} defaultTitle="Go-React Blog App">
      <meta name="description" content={props.description} />
    </Helmet>
  );
};

export const Head = memo(HeadComponent);
