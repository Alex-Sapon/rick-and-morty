import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Character, Info, Location, LocationFilter, rmAPI} from '../../../api';
import {RootState} from '../../../components/app/store';
import {getId, isError} from '../../../assets';

const fetchLocations = createAsyncThunk<Info<Location[]>, void, { rejectValue: string }>
('locations/fetchLocations', async (_, {rejectWithValue, getState}) => {
    const {type, name, page, dimension} = (getState() as RootState).locationsPage.filter;

    try {
        return await rmAPI.getLocation({type, name, page, dimension});
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
})

const fetchLocationsItem = createAsyncThunk<Location<Character[]>, string, { rejectValue: string }>
('locations/fetchLocationsItem', async (id, {rejectWithValue}) => {
    try {
        const result = await rmAPI.getLocationItem(id);
        console.log(result)
        if (result.residents.length) {
            const residentsId = result.residents.map(residentsUrl => getId(residentsUrl));
            const residentsRes = await rmAPI.getCharactersItem(residentsId.join(','));

            const residents = Array.isArray(residentsRes) ? residentsRes : [residentsRes];

            return {...result, residents};
        }

        return {...result, residents: []};
    } catch (e) {
        debugger
        return rejectWithValue((e as Error).message);
    }
})

const initialState: InitialStateType = {
    filter: {page: 1, name: '', dimension: '', type: ''},
    data: {
        info: {count: 0, pages: 0, next: null, prev: null},
        results: [],
    },
    location: {} as Location<Character[]>,
    isLoading: false,
    error: null,
}

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        changeLocationsFilter(state, action: PayloadAction<LocationFilter>) {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchLocationsItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLocationsItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.location = action.payload;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload!;
            })
    }
})

export const locationsReducer = locationsSlice.reducer;
const {changeLocationsFilter} = locationsSlice.actions;
export const locationsActions = {fetchLocations, changeLocationsFilter, fetchLocationsItem};

type InitialStateType = {
    filter: LocationFilter
    data: Info<Location[]>
    location: Location<Character[]>
    isLoading: boolean
    error: string | null
}