import { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
	{
		path: '/',
		element: (
			<div>
				<h1>HRnet</h1>
			</div>
		),
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
