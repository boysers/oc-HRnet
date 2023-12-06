import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'
import { getEmployeesAsync } from './usecases/employees-slice'
import './styles/global.scss'

const main = async () => {
	const router = createBrowserRouter(routes)

	await store.dispatch(getEmployeesAsync())

	const { employees } = store.getState()

	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			{employees.status === 'succeeded' ? (
				<Provider store={store}>
					<RouterProvider router={router} />
				</Provider>
			) : (
				<main>
					<h1>Une erreur c'est produite</h1>
					<p>{employees.error}</p>
				</main>
			)}
		</React.StrictMode>
	)
}
main()
