import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api, User } from '../../app/services/auth'
import type { RootState } from "../../store"

type AuthState = {
    user: User | null
    token: string | null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null } as AuthState,
    reducers: {
        tokenReceived: (state, action: PayloadAction<any>) => {
            const { user, acessToken } = action.payload
            state.user = user
            state.token = acessToken
        },
        loggedOut: (state) => {
            state.user = null
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
          api.endpoints.login.matchFulfilled,
          (state, { payload }) => {
            state.token = payload.token
            state.user = payload.user
          }
        )
      },
})

export const { tokenReceived, loggedOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;