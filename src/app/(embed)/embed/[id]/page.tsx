import EmbedContainer from "./(components)/EmbedContainer";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    theme?: string;
  };
};

const ViewEmbededPage = ({ params, searchParams }: Props) => {
  const id = params.id;

  return <EmbedContainer id={id} searchParams={searchParams} />;
};

export default ViewEmbededPage;
