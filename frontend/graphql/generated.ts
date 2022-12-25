import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CreateJobInput = {
  address: Scalars['String'];
  available: Scalars['Boolean'];
  contact: Scalars['Float'];
  end: Scalars['String'];
  experience: Scalars['String'];
  extraInfo: Scalars['String'];
  sampleCharges: Scalars['String'];
  start: Scalars['String'];
  type: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GlobalResponse = {
  __typename?: 'GlobalResponse';
  errors?: Maybe<Array<Error>>;
  status: Scalars['String'];
};

export type Job = {
  __typename?: 'Job';
  address: Scalars['String'];
  available: Scalars['Boolean'];
  contact: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  end: Scalars['DateTime'];
  experience: Scalars['String'];
  extraInfo: Scalars['String'];
  id: Scalars['String'];
  league: Scalars['String'];
  points: Scalars['Float'];
  sampleCharges: Scalars['String'];
  start: Scalars['DateTime'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type JobResponse = {
  __typename?: 'JobResponse';
  errors?: Maybe<Array<Error>>;
  job?: Maybe<Job>;
  status: Scalars['String'];
};

export type JobsResponse = {
  __typename?: 'JobsResponse';
  errors?: Maybe<Array<Error>>;
  jobs?: Maybe<Array<Job>>;
  status: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createJob: JobResponse;
  login: UserResponse;
  logout: GlobalResponse;
  register: UserResponse;
};


export type MutationCreateJobArgs = {
  input: CreateJobInput;
};


export type MutationLoginArgs = {
  nameOrEmail: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  description?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  gender: Scalars['String'];
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getJob: JobResponse;
  getJobByType: JobsResponse;
  me: UserResponse;
};


export type QueryGetJobArgs = {
  id: Scalars['String'];
};


export type QueryGetJobByTypeArgs = {
  type: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['String'];
  jobs: Array<Job>;
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<Error>>;
  status: Scalars['String'];
  user?: Maybe<User>;
};

export type FErrorFragment = { __typename?: 'Error', field: string, message: string };

export type FJobFragment = { __typename?: 'Job', id: string, type: string, address: string, contact: number, experience: string, available: boolean, points: number, league: string, start: any, end: any, sampleCharges: string, extraInfo: string };

export type FUserFragment = { __typename?: 'User', id: string, name: string, email: string, gender: string, createdAt: any, location?: string | null, description?: string | null };

export type CreateJobMutationVariables = Exact<{
  input: CreateJobInput;
}>;


export type CreateJobMutation = { __typename?: 'Mutation', createJob: { __typename?: 'JobResponse', status: string, errors?: Array<{ __typename?: 'Error', field: string, message: string }> | null, job?: { __typename?: 'Job', id: string, type: string, address: string, contact: number, experience: string, available: boolean, points: number, league: string, start: any, end: any, sampleCharges: string, extraInfo: string } | null } };

export type LoginMutationVariables = Exact<{
  nameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', status: string, errors?: Array<{ __typename?: 'Error', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, name: string, email: string, gender: string, createdAt: any, location?: string | null, description?: string | null, jobs: Array<{ __typename?: 'Job', id: string, type: string, address: string, contact: number, experience: string, available: boolean, points: number, league: string, start: any, end: any, sampleCharges: string, extraInfo: string }> } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'GlobalResponse', status: string, errors?: Array<{ __typename?: 'Error', field: string, message: string }> | null } };

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  gender: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  location?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', status: string, errors?: Array<{ __typename?: 'Error', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, name: string, email: string, gender: string, createdAt: any, location?: string | null, description?: string | null, jobs: Array<{ __typename?: 'Job', id: string, type: string, address: string, contact: number, experience: string, available: boolean, points: number, league: string, start: any, end: any, sampleCharges: string, extraInfo: string }> } | null } };

export type GetJobQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetJobQuery = { __typename?: 'Query', getJob: { __typename?: 'JobResponse', status: string, errors?: Array<{ __typename?: 'Error', field: string, message: string }> | null, job?: { __typename?: 'Job', id: string, type: string, address: string, contact: number, experience: string, available: boolean, points: number, league: string, start: any, end: any, sampleCharges: string, extraInfo: string, user: { __typename?: 'User', id: string, name: string, email: string, gender: string, createdAt: any, location?: string | null, description?: string | null } } | null } };

export type GetJobByTypeQueryVariables = Exact<{
  type: Scalars['String'];
}>;


export type GetJobByTypeQuery = { __typename?: 'Query', getJobByType: { __typename?: 'JobsResponse', status: string, errors?: Array<{ __typename?: 'Error', field: string, message: string }> | null, jobs?: Array<{ __typename?: 'Job', id: string, type: string, address: string, contact: number, experience: string, available: boolean, points: number, league: string, start: any, end: any, sampleCharges: string, extraInfo: string, user: { __typename?: 'User', id: string, name: string, email: string, gender: string, createdAt: any, location?: string | null, description?: string | null } }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserResponse', status: string, errors?: Array<{ __typename?: 'Error', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, name: string, email: string, gender: string, createdAt: any, location?: string | null, description?: string | null, jobs: Array<{ __typename?: 'Job', id: string, type: string, address: string, contact: number, experience: string, available: boolean, points: number, league: string, start: any, end: any, sampleCharges: string, extraInfo: string }> } | null } };

export const FErrorFragmentDoc = gql`
    fragment FError on Error {
  field
  message
}
    `;
export const FJobFragmentDoc = gql`
    fragment FJob on Job {
  id
  type
  address
  contact
  experience
  available
  points
  league
  start
  end
  sampleCharges
  extraInfo
}
    `;
export const FUserFragmentDoc = gql`
    fragment FUser on User {
  id
  name
  email
  gender
  createdAt
  location
  description
}
    `;
export const CreateJobDocument = gql`
    mutation CreateJob($input: CreateJobInput!) {
  createJob(input: $input) {
    status
    errors {
      ...FError
    }
    job {
      ...FJob
    }
  }
}
    ${FErrorFragmentDoc}
${FJobFragmentDoc}`;
export type CreateJobMutationFn = Apollo.MutationFunction<CreateJobMutation, CreateJobMutationVariables>;

/**
 * __useCreateJobMutation__
 *
 * To run a mutation, you first call `useCreateJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJobMutation, { data, loading, error }] = useCreateJobMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateJobMutation(baseOptions?: Apollo.MutationHookOptions<CreateJobMutation, CreateJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJobMutation, CreateJobMutationVariables>(CreateJobDocument, options);
      }
export type CreateJobMutationHookResult = ReturnType<typeof useCreateJobMutation>;
export type CreateJobMutationResult = Apollo.MutationResult<CreateJobMutation>;
export type CreateJobMutationOptions = Apollo.BaseMutationOptions<CreateJobMutation, CreateJobMutationVariables>;
export const LoginDocument = gql`
    mutation Login($nameOrEmail: String!, $password: String!) {
  login(nameOrEmail: $nameOrEmail, password: $password) {
    status
    errors {
      ...FError
    }
    user {
      ...FUser
      jobs {
        ...FJob
      }
    }
  }
}
    ${FErrorFragmentDoc}
${FUserFragmentDoc}
${FJobFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      nameOrEmail: // value for 'nameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    status
    errors {
      ...FError
    }
  }
}
    ${FErrorFragmentDoc}`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $gender: String!, $email: String!, $password: String!, $location: String, $description: String) {
  register(
    name: $name
    gender: $gender
    email: $email
    password: $password
    location: $location
    description: $description
  ) {
    status
    errors {
      ...FError
    }
    user {
      ...FUser
      jobs {
        ...FJob
      }
    }
  }
}
    ${FErrorFragmentDoc}
${FUserFragmentDoc}
${FJobFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      gender: // value for 'gender'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      location: // value for 'location'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetJobDocument = gql`
    query GetJob($id: String!) {
  getJob(id: $id) {
    status
    errors {
      ...FError
    }
    job {
      ...FJob
      user {
        ...FUser
      }
    }
  }
}
    ${FErrorFragmentDoc}
${FJobFragmentDoc}
${FUserFragmentDoc}`;

/**
 * __useGetJobQuery__
 *
 * To run a query within a React component, call `useGetJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetJobQuery(baseOptions: Apollo.QueryHookOptions<GetJobQuery, GetJobQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJobQuery, GetJobQueryVariables>(GetJobDocument, options);
      }
export function useGetJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJobQuery, GetJobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJobQuery, GetJobQueryVariables>(GetJobDocument, options);
        }
export type GetJobQueryHookResult = ReturnType<typeof useGetJobQuery>;
export type GetJobLazyQueryHookResult = ReturnType<typeof useGetJobLazyQuery>;
export type GetJobQueryResult = Apollo.QueryResult<GetJobQuery, GetJobQueryVariables>;
export const GetJobByTypeDocument = gql`
    query GetJobByType($type: String!) {
  getJobByType(type: $type) {
    status
    errors {
      ...FError
    }
    jobs {
      ...FJob
      user {
        ...FUser
      }
    }
  }
}
    ${FErrorFragmentDoc}
${FJobFragmentDoc}
${FUserFragmentDoc}`;

/**
 * __useGetJobByTypeQuery__
 *
 * To run a query within a React component, call `useGetJobByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobByTypeQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetJobByTypeQuery(baseOptions: Apollo.QueryHookOptions<GetJobByTypeQuery, GetJobByTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJobByTypeQuery, GetJobByTypeQueryVariables>(GetJobByTypeDocument, options);
      }
export function useGetJobByTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJobByTypeQuery, GetJobByTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJobByTypeQuery, GetJobByTypeQueryVariables>(GetJobByTypeDocument, options);
        }
export type GetJobByTypeQueryHookResult = ReturnType<typeof useGetJobByTypeQuery>;
export type GetJobByTypeLazyQueryHookResult = ReturnType<typeof useGetJobByTypeLazyQuery>;
export type GetJobByTypeQueryResult = Apollo.QueryResult<GetJobByTypeQuery, GetJobByTypeQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    status
    errors {
      ...FError
    }
    user {
      ...FUser
      jobs {
        ...FJob
      }
    }
  }
}
    ${FErrorFragmentDoc}
${FUserFragmentDoc}
${FJobFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;