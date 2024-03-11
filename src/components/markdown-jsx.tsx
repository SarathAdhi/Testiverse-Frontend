import Markdown from "markdown-to-jsx";

type Props = {
  children: string;
};

const MarkdownJSX = ({ children }: Props) => {
  return (
    <Markdown
      options={{
        overrides: {
          h1: {
            component: "p",
            props: {
              className: "text-lg",
            },
          },
          h2: {
            component: "p",
            props: {
              className: "text-lg",
            },
          },
          h3: {
            component: "p",
            props: {
              className: "text-lg",
            },
          },
          h4: {
            component: "p",
            props: {
              className: "text-lg",
            },
          },
          h5: {
            component: "p",
            props: {
              className: "text-lg",
            },
          },
          h6: {
            component: "p",
            props: {
              className: "text-lg",
            },
          },
          span: {
            component: "p",
            props: {
              className: "text-lg",
            },
          },
          p: {
            component: "p",
            props: {
              className: "text-lg",
            },
          },
        },
      }}
    >
      {children}
    </Markdown>
  );
};

export default MarkdownJSX;
