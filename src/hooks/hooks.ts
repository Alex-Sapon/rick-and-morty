import {AppDispatch, RootState} from '../components/app/store';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators} from '@reduxjs/toolkit';
import {useMemo} from 'react';

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch();

    return useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, [actions, dispatch])
}