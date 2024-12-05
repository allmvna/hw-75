import {createSlice} from "@reduxjs/toolkit";
import {decodeMessage, encodeMessage} from "./messageThunk.ts";

interface Type {
    fetchLoading: boolean;
    encodedMessage: string;
    decodedMessage: string;
}

export const initialState: Type = {
    fetchLoading: false,
    encodedMessage: '',
    decodedMessage: '',
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(encodeMessage.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(encodeMessage.fulfilled, (state, action) => {
                state.fetchLoading = false;
                state.encodedMessage = action.payload;
            })
            .addCase(encodeMessage.rejected, (state) => {
                state.fetchLoading = false;
            })
            .addCase(decodeMessage.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(decodeMessage.fulfilled, (state, action) => {
                state.fetchLoading = false;
                state.decodedMessage = action.payload;
            })
            .addCase(decodeMessage.rejected, (state) => {
                state.fetchLoading = false;
            });
    }
});

export const messageReducer = messageSlice.reducer;