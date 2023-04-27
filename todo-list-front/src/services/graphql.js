import { request, gql } from "graphql-request";

export const GET_TODOS = gql`
query todos{
    name
      description
        due_date
        is_done
  }
}
`;
