import {AnyAction} from '@reduxjs/toolkit';

export const isError = (action: AnyAction) => action.type.endsWith('rejected');