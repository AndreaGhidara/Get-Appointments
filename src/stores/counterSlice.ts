import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface counterSlice {
    value: number
};

const initialState: counterSlice = {
    value: 0
};

const counerSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<{ value: number }>) => {
            state.value += action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, () => {
            console.log('pending');
            
        }).addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
            state.value += action.payload
        })
    }
});

export const incrementAsync = createAsyncThunk(
    'counter/incrementAsync',
    async (amount: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return amount
    }
)

export const { increment, decrement, incrementByAmount } = counerSlice.actions
export default counerSlice.reducer;