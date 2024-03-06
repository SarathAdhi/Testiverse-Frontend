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
          },
          h2: {
            component: "p",
          },
          h3: {
            component: "p",
          },
          h4: {
            component: "p",
          },
          h5: {
            component: "p",
          },
          h6: {
            component: "p",
          },
          span: {
            component: "span",
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
