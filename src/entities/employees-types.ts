export interface EmployeesState {
	data: Array<Employee>
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error?: string | null
}

export type Employee = {
	id: number
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
