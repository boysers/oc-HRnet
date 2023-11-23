import {
	EqualityFn,
	useSelector as useSelectorBase,
	useDispatch as useDispatchBase,
} from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import employeesSlice from './usecases/employees-slice'

const combinedReducer = combineReducers({ employees: employeesSlice })

export const store = configureStore({
	reducer: combinedReducer,
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch
export type AppStore = typeof store

export const useSelector = <TSelected = unknown>(
	selector: (state: RootState) => TSelected,
	equalityFn?: EqualityFn<TSelected> | undefined
): TSelected => useSelectorBase(selector, equalityFn)

export const useDispatch = () => useDispatchBase<AppDispath>()
