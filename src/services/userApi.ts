import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import hostName from './.node-host'

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${hostName}/user` }),
    endpoints: (builder) => ({}),
})
