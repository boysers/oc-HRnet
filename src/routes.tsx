import { RouteObject } from 'react-router-dom'
import { CreateEmployee, EmployeeList } from './views'

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <CreateEmployee />,
	},
	{
		path: '/employees',
		element: <EmployeeList />,
	},
	{
		path: '*',
		element: (
			<div>
				<h1>404</h1>
			</div>
		),
	},
]
