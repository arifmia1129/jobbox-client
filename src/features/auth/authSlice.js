import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import auth from "../../firebase/firebase.config"

const initialState = {
    email: "",
    isLoading: true,
    isError: false,
    error: ""
}

export const createUser = createAsyncThunk(
    "auth/createUser", async ({ email, password }) => {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        return data.user.email;
    }
)
export const loginUser = createAsyncThunk(
    "auth/loginUser", async ({ email, password }) => {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data.user.email;
    }
)
export const googleLogin = createAsyncThunk(
    "auth/googleLogin", async () => {
        const provider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth, provider);
        return data.user.email;
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.email = "";
        },
        setUser: (state, { payload }) => {
            state.email = payload;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
                state.email = "";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.email = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.email = "";
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
                state.email = "";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.email = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.email = "";
            })
            .addCase(googleLogin.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
                state.email = "";
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.email = action.payload;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.email = "";
            })
    }
})


export const { logOut, setUser } = authSlice.actions;

export default authSlice.reducer;