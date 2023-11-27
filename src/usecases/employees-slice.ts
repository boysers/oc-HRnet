import { EmployeesState } from '@/entities/employees-types'
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'

const mockedEmployees = [
	{
		id: 1,
		firstName: 'John',
		lastName: 'Smith',
		dateOfBirth: '1985-03-15',
		startDate: '2022-01-10',
		department: 'Sales',
		street: '123 Main Street',
		city: 'New York',
		state: 'NY',
		zipCode: '10001',
	},
	{
		id: 2,
		firstName: 'Emily',
		lastName: 'Johnson',
		dateOfBirth: '1990-08-20',
		startDate: '2021-11-05',
		department: 'Marketing',
		street: '456 Oak Avenue',
		city: 'Los Angeles',
		state: 'CA',
		zipCode: '90001',
	},
	{
		id: 3,
		firstName: 'Michael',
		lastName: 'Williams',
		dateOfBirth: '1987-06-10',
		startDate: '2023-02-15',
		department: 'Engineering',
		street: '789 Pine Street',
		city: 'San Francisco',
		state: 'CA',
		zipCode: '94101',
	},
	{
		id: 4,
		firstName: 'Jessica',
		lastName: 'Miller',
		dateOfBirth: '1992-11-08',
		startDate: '2022-07-05',
		department: 'Human Resources',
		street: '101 Maple Lane',
		city: 'Chicago',
		state: 'IL',
		zipCode: '60601',
	},
	{
		id: 5,
		firstName: 'Brian',
		lastName: 'Davis',
		dateOfBirth: '1989-04-25',
		startDate: '2023-03-20',
		department: 'Legal',
		street: '202 Cedar Avenue',
		city: 'Dallas',
		state: 'TX',
		zipCode: '75201',
	},
	{
		id: 6,
		firstName: 'Jennifer',
		lastName: 'Brown',
		dateOfBirth: '1991-09-12',
		startDate: '2021-08-15',
		department: 'Sales',
		street: '303 Elm Street',
		city: 'Miami',
		state: 'FL',
		zipCode: '33101',
	},
	{
		id: 7,
		firstName: 'David',
		lastName: 'Clark',
		dateOfBirth: '1986-12-30',
		startDate: '2022-05-10',
		department: 'Marketing',
		street: '404 Walnut Avenue',
		city: 'Atlanta',
		state: 'GA',
		zipCode: '30301',
	},
	{
		id: 8,
		firstName: 'Amanda',
		lastName: 'White',
		dateOfBirth: '1994-06-18',
		startDate: '2023-04-03',
		department: 'Engineering',
		street: '505 Birch Lane',
		city: 'Seattle',
		state: 'WA',
		zipCode: '98101',
	},
	{
		id: 9,
		firstName: 'Kevin',
		lastName: 'Anderson',
		dateOfBirth: '1987-03-05',
		startDate: '2021-12-05',
		department: 'Human Resources',
		street: '606 Oak Street',
		city: 'Denver',
		state: 'CO',
		zipCode: '80201',
	},
	{
		id: 10,
		firstName: 'Laura',
		lastName: 'Moore',
		dateOfBirth: '1993-08-22',
		startDate: '2022-10-20',
		department: 'Legal',
		street: '707 Pine Avenue',
		city: 'Houston',
		state: 'TX',
		zipCode: '77001',
	},
]

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

const initialState: EmployeesState = { data: mockedEmployees }

export const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		createEmployee: (state, action: PayloadAction<EmployeePayloadAction>) => {
			state.data.push({ ...action.payload, id: state.data.length + 1 })
		},
	},
})

export const selectEmployeesState = (state: { employees: EmployeesState }) => state.employees

export const { createEmployee } = employeesSlice.actions

export const selectEmployees = createSelector(selectEmployeesState, (employees) => employees.data)

export default employeesSlice.reducer
