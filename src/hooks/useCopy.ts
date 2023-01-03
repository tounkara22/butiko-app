import { useQuery } from "@apollo/client";
import { GET_COPY } from "../apollo-client/queries";

const useCopy = () => {
  const { data } = useQuery(GET_COPY);
  const { copy } = data;
  return { copy };
};

export default useCopy;
