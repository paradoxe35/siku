//@ts-check
import { createEntityAdapter, createAsyncThunk, createSlice, unwrapResult  } from '@reduxjs/toolkit'

const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, { getState, requestId }) => {
      // @ts-ignore
      const { currentRequestId, loading } = getState().users
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return
      }
    //   const response = await userAPI.fetchById(userId)
    //   return response.data
    }
  )
  
  const usersSlice = createSlice({
    name: 'users',
    initialState: {
      entities: [],
      loading: 'idle',
      currentRequestId: undefined,
      error: null
    },
    reducers: {},
    extraReducers: {
      // @ts-ignore
      [fetchUserById.pending]: (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
          state.currentRequestId = action.meta.requestId
        }
      },
      // @ts-ignore
      [fetchUserById.fulfilled]: (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle'
          state.entities.push(action.payload)
          state.currentRequestId = undefined
        }
      },
      // @ts-ignore
      [fetchUserById.rejected]: (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle'
          state.error = action.error
          state.currentRequestId = undefined
        }
      }
    }
  })
  
//   const UsersComponent = () => {
//     const { users, loading, error } = useSelector(state => state.users)
//     const dispatch = useDispatch()
  
//     const fetchOneUser = async userId => {
//       try {
//         const resultAction = await dispatch(fetchUserById(userId))
//         const user = unwrapResult(resultAction)
//         showToast('success', `Fetched ${user.name}`)
//       } catch (err) {
//         showToast('error', `Fetch failed: ${err.message}`)
//       }
//     }
  
    // render UI here
//   }

const eventsAdapter = createEntityAdapter({
    selectId: event => event.id,
    sortComparer: (a, b) => a.title.localeCompare(b.title)
})

const eventsSlice = createSlice({
    name: 'events',
    initialState: eventsAdapter.getInitialState({
        loading: 'idle'
    }),
    reducers: {
        eventAdded: eventsAdapter.addOne,
        eventUpdated: eventsAdapter.updateOne,
        eventsLoading(state, action) {
            if (state.loading === 'idle' && !state.ids.length) {
                state.loading = 'pending'
            }
        },
        eventsReceived(state, action) {
            if (state.loading === 'pending') {
                eventsAdapter.setAll(state, action.payload)
                state.loading = 'idle'
            }
        },
        eventRemoved: eventsAdapter.removeOne
    }
})

export const { eventAdded, eventUpdated, eventRemoved } = eventsSlice.actions

export default eventsSlice.reducer
