import {CircularProgress, IconButton, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useEffect, useState} from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {decodeMessage, encodeMessage} from "../../slices/messageThunk.ts";

const Form = () => {
    const dispatch = useAppDispatch();
    const { fetchLoading, encodedMessage, decodedMessage } = useAppSelector((state) => state.crypt);
    const [decodedMessageInput, setDecodedMessageInput] = useState("");
    const [encodedMessageInput, setEncodedMessageInput] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        if (encodedMessage) setEncodedMessageInput(encodedMessage);
        if (decodedMessage) setDecodedMessageInput(decodedMessage);
    }, [encodedMessage, decodedMessage]);

    const handleEncode = async () => {
        if (!password) {
            alert("Password is required");
            return;
        }
        if (decodedMessageInput) {
            try {
                await dispatch(encodeMessage({ password, message: decodedMessageInput })).unwrap();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleDecode = async () => {
        if (!password) {
            alert("Password is required");
            return;
        }
        if (encodedMessageInput) {
            try {
                await dispatch(decodeMessage({ password, message: encodedMessageInput })).unwrap();
            } catch (e) {
                console.error(e);
            }
        }
    };


    return (
        <>
            <form>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mx: "auto",
                        width: "60%",
                        border: "3px solid #001f3d",
                        borderRadius: "10px",
                        p: 4,
                    }}
                >

                    <Grid size={12}>
                        <TextField
                            value={decodedMessageInput}
                            onChange={(e) => setDecodedMessageInput(e.target.value)}
                            multiline
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            id="decoded"
                            label="Decoded"
                            variant="outlined"
                            name="decoded"
                        />
                    </Grid>


                    <Grid size={8}>
                        <TextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            id="password"
                            label="Password"
                            variant="outlined"
                            name="password"
                            required
                        />
                    </Grid>


                    <Grid size={4} container alignItems="center">
                        <IconButton
                            type="button"
                            onClick={handleEncode}
                            disabled={fetchLoading}
                            aria-label="Encode Message"
                        >
                            {fetchLoading ? <CircularProgress size={24} /> : <ArrowDownwardIcon />}
                            E
                        </IconButton>

                        <IconButton
                            type="button"
                            onClick={handleDecode}
                            disabled={fetchLoading}
                            aria-label="Decode Message"
                        >
                            {fetchLoading ? <CircularProgress size={24} /> : <ArrowUpwardIcon />}
                            D
                        </IconButton>
                    </Grid>


                    <Grid size={12}>
                        <TextField
                            value={encodedMessageInput}
                            onChange={(e) => setEncodedMessageInput(e.target.value)}
                            multiline
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            id="encode"
                            label="Encoded"
                            variant="outlined"
                            name="encode"
                        />
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default Form;
