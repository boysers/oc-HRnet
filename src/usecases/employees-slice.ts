import { Employee, EmployeesState } from '@/entities/employees-types'
import { AppDispatch, RootState } from '@/store'
import { PayloadAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

export type EmployeePayloadAction = {
	firstName: string
	lastName: string
	dateOfBirth: string
	startDate: string
	department: string
	street: string
	city: string
	state: string
	zipCode: string
}

interface ResponseError {
	message: string
	error: string
	statusCode: number
}

export const getEmployeesAsync = createAsyncThunk<
	Array<Employee>,
	undefined,
	{
		dispatch: AppDispatch
		state: RootState
		rejectValue: ResponseError
	}
>('employees/fetchEmployees', async (_, thunkApi) => {
	const res = await fetch('http://localhost:3000/employees')

	if (!res.ok) {
		return thunkApi.rejectWithValue(await res.json())
	}

	return await res.json()
})

export const createEmployeeAsync = createAsyncThunk<
	Employee,
	EmployeePayloadAction,
	{
		dispatch: AppDispatch
		state: RootState
		rejectValue: ResponseError
	}
>('employees/createEmployee', async (employeeData, thunkApi) => {
	const res = await fetch('http://localhost:3000/employees', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(employeeData),
	})

	if (!res.ok) {
		return thunkApi.rejectWithValue(await res.json())
	}

	return await res.json()
})

const initialState: EmployeesState = { data: [], status: 'idle', error: null }

export const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		createEmployee: (state, action: PayloadAction<EmployeePayloadAction>) => {
			state.data.push({ ...action.payload, id: state.data.length + 1 })
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getEmployeesAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getEmployeesAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data = action.payload
			})
			.addCase(getEmployeesAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload ? action.payload.message : action.error.message
			})
			.addCase(createEmployeeAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createEmployeeAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data.push(action.payload)
			})
			.addCase(createEmployeeAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload ? action.payload.message : action.error.message
			})
	},
})

export const selectEmployeesState = (state: { employees: EmployeesState }) => state.employees

export const { createEmployee } = employeesSlice.actions

export const selectEmployees = createSelector(selectEmployeesState, (employees) => employees.data)

export const selectEmployeesStatus = createSelector(
	selectEmployeesState,
	(employees) => employees.status
)

export default employeesSlice.reducer
