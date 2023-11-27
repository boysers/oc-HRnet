import { selectEmployees } from '@/usecases/employees-slice'
import { Link } from 'react-router-dom'
import { useSelector } from '@/store'
import { DataTable } from 'oc-hrnet-ui/DataTable'
import styled from 'styled-components'

const StyledDataTable = styled.div`
	max-width: 1088px;
	width: 100%;

	& > div:first-child {
		& > div:first-child {
			width: 100%;

			table {
				width: 100%;
			}
		}
	}
`

export const EmployeeList: React.FC = () => {
	const employees = useSelector(selectEmployees)

	const columns = [
		{ title: 'First Name', data: 'firstName' },
		{ title: 'Last Name', data: 'lastName' },
		{ title: 'Start Date', data: 'startDate' },
		{ title: 'Department', data: 'department' },
		{ title: 'Date of Birth', data: 'dateOfBirth' },
		{ title: 'Street', data: 'street' },
		{ title: 'City', data: 'city' },
		{ title: 'State', data: 'state' },
		{ title: 'Zip Code', data: 'zipCode' },
	]

	return (
		<div id="employee-div" className="container">
			<h1>Current Employees</h1>

			<StyledDataTable id="employee-table">
				<DataTable data={employees} columns={columns} />
			</StyledDataTable>

			<Link to="/">Home</Link>
		</div>
	)
}
