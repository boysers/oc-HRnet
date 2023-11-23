import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import { AppDispath, RootState } from './store'

export const useAppDispath: () => AppDispath = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
