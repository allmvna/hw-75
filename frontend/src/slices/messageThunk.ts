import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../axiosAPI.ts";
import {MessageType} from "../types";

interface MessageResponse {
    encoded: string;
    decoded: string;
}

export const encodeMessage = createAsyncThunk<string, MessageType>(
    'messages/encodeMessage',
    async ({password, message}: MessageType) => {
        const response = await axiosAPI.post<MessageResponse>('/encode', { password, message });
        return response.data.encoded;
    }
);

export const decodeMessage = createAsyncThunk<string, MessageType>(
    'messages/decodeMessage',
    async ({ password, message }: MessageType) => {
        const response = await axiosAPI.post<MessageResponse>('/decode', { password, message });
        return response.data.decoded;
    }
);
