import { EmployeesState } from '@/entities/employees-types'
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'

const mockedEmployees = [
	{
		id: 1,
		firstName: 'ttt',
		lastName: 'tt',
		dateOfBirth: '11/07/2023',
		startDate: '10/31/2023',
		department: 'Marketing',
		street: 'tt',
		city: 'tt',
		state: 'DC',
		zipCode: 44,
	},
]

type Employee = {
	firstName: string
	lastName: string
	dateOfBirth: string
	startDate: string
	department: string
	street: string
	city: string
	state: string
	zipCode: number
}

const initialState: EmployeesState = { data: mockedEmployees }

export const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		createEmployee: (state, action: PayloadAction<Employee>) => {
			state.data.push({ ...action.payload, id: state.data.length + 1 })
		},
	},
})

export const selectEmployeesState = (state: { employees: EmployeesState }) => state.employees

export const { createEmployee } = employeesSlice.actions

export const selectEmployees = createSelector(selectEmployeesState, (employees) => employees.data)

export default employeesSlice.reducer
