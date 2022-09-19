import {AnyAction} from '@reduxjs/toolkit';

export const isPending = (action: AnyAction) => action.type.endsWith('pending');