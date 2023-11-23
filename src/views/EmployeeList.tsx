import { selectEmployees, createEmployee } from '@/usecases/employees-slice'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from '@/store'

export const EmployeeList: React.FC = () => {
	const dispatch = useDispatch()
	const employees = useSelector(selectEmployees)

	return (
		<div id="employee-div" className="container">
			<h1>Current Employees</h1>
			<table id="employee-table" className="display"></table>
			<div>
				{employees.map(({ id }) => (
					<p key={id}>name : {id}</p>
				))}
			</div>
			<Link to="/">Home</Link>
			<button
				style={{ marginTop: '36px' }}
				onClick={() => {
					dispatch(
						createEmployee({
							firstName: 'ttt',
							lastName: 'tt',
							dateOfBirth: '11/07/2023',
							startDate: '11/07/2023',
							department: 'Marketing',
							street: 'tt',
							city: 'tt',
							state: 'DC',
							zipCode: 44,
						})
					)
				}}
			>
				add
			</button>
		</div>
	)
}
