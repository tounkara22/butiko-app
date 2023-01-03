import { gql } from "@apollo/client";

export const GET_COPY = gql`
  query {
    copy @client
  }
`;
