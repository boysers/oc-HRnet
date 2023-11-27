import { ChangeEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, DatePicker, Modal, SelectMenu, TextField, Fieldset } from 'oc-hrnet-ui'
import { STATES } from '@/constants/states'
import { useDispatch } from '@/store'
import { createEmployee } from '@/usecases/employees-slice'
import { DEPARTMENTS } from '@/constants/departments'

type Fields = {
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

class Validator {
	static validateField(name: keyof Fields, value: string): string {
		switch (name) {
			case 'firstName':
				return value.length < 2 ? 'First name must be at least 2 characters.' : ''
			case 'lastName':
				return value.length < 2 ? 'Last name must be at least 2 characters.' : ''
			case 'dateOfBirth':
				if (isNaN(new Date(value)?.getTime())) {
					return 'Invalid date of birth.'
				}
				return ''
			case 'startDate':
				if (isNaN(new Date(value)?.getTime())) {
					return 'Invalid start date.'
				}
				return ''
			case 'street':
				return value.length < 5 ? 'Street must be at least 5 characters.' : ''
			case 'city':
				return value.length < 2 ? 'City must be at least 2 characters.' : ''
			case 'state':
				return ''
			case 'zipCode':
				return /^\d{5}$/.test(value) ? '' : 'Zip code must have 5 digits.'
			case 'department':
				return ''
			default:
				return ''
		}
	}
}

export const CreateEmployee: React.FC = () => {
	const dispatch = useDispatch()
	const formRef = useRef<HTMLFormElement>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const [fields, setFields] = useState<Fields>({
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		startDate: '',
		department: DEPARTMENTS[0],
		street: '',
		city: '',
		state: STATES[0].abbreviation,
		zipCode: '',
	})

	const [errors, setErrors] = useState<Fields>({
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		startDate: '',
		department: '',
		street: '',
		city: '',
		state: '',
		zipCode: '',
	})

	const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFields((prevFields) => ({
			...prevFields,
			[name]: value,
		}))
	}

	const toggleModal = () => {
		setIsModalOpen((prev) => !prev)
	}

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

		const hasErrors = Object.entries(fields).reduce((acc, [name, value]) => {
			const errorMessage = Validator.validateField(name as keyof Fields, value)

			setErrors((prevFields) => ({
				...prevFields,
				[name]: errorMessage,
			}))

			if (acc || errorMessage) return true

			return false
		}, false)

		if (hasErrors) return

		dispatch(createEmployee(fields))
		toggleModal()
	}

	return (
		<>
			<div className="title">
				<h1>HRnet</h1>
			</div>
			<div className="container">
				<Link to="employees">View Current Employees</Link>
				<h2>Create Employee</h2>
				<form ref={formRef} action="#" id="create-employee">
					<div className="field">
						<label htmlFor="first-name">First Name</label>
						<TextField
							id="first-name"
							name="firstName"
							value={fields.firstName}
							onChange={handleFieldChange}
						/>
						<span className="field-error">{errors.firstName}</span>
					</div>

					<div className="field">
						<label htmlFor="last-name">Last Name</label>
						<TextField
							id="last-name"
							name="lastName"
							value={fields.lastName}
							onChange={handleFieldChange}
						/>
						<span className="field-error">{errors.lastName}</span>
					</div>

					<div className="field">
						<label htmlFor="date-of-birth">Date of Birth</label>
						<DatePicker
							id="date-of-birth"
							name="dateOfBirth"
							value={fields.dateOfBirth}
							onChange={handleFieldChange}
						/>
						<span className="field-error">{errors.dateOfBirth}</span>
					</div>

					<div className="field">
						<label htmlFor="start-date">Start Date</label>
						<DatePicker
							id="start-date"
							name="startDate"
							value={fields.startDate}
							onChange={handleFieldChange}
						/>
						<span className="field-error">{errors.startDate}</span>
					</div>

					<Fieldset legend="Address" className="address">
						<div className="field">
							<label htmlFor="street">Street</label>
							<TextField
								id="street"
								name="street"
								value={fields.street}
								onChange={handleFieldChange}
							/>
							<span className="field-error">{errors.street}</span>
						</div>

						<div className="field">
							<label htmlFor="city">City</label>
							<TextField
								id="city"
								name="city"
								value={fields.city}
								onChange={handleFieldChange}
							/>
							<span className="field-error">{errors.city}</span>
						</div>

						<div className="field">
							<label htmlFor="state">State</label>
							<SelectMenu
								name="state"
								id="state"
								value={fields.state}
								onChange={handleFieldChange}
								options={STATES.map(({ name, abbreviation }) => ({
									value: abbreviation,
									label: name,
								}))}
							/>
							<span className="field-error">{errors.state}</span>
						</div>

						<div className="field">
							<label htmlFor="zip-code">Zip Code</label>
							<TextField
								id="zip-code"
								type="number"
								name="zipCode"
								value={fields.zipCode}
								onChange={handleFieldChange}
							/>
							<span className="field-error">{errors.zipCode}</span>
						</div>
					</Fieldset>

					<div className="field">
						<label htmlFor="department">Department</label>
						<SelectMenu
							id="department"
							name="department"
							value={fields.department}
							onChange={handleFieldChange}
							options={DEPARTMENTS.map((department) => ({
								value: department,
								label: department,
							}))}
						/>
						<span className="field-error">{errors.department}</span>
					</div>
				</form>

				<Button onClick={handleSubmit}>Save</Button>
			</div>
			<Modal isOpen={isModalOpen} onClose={toggleModal}>
				<div>
					<p style={{ margin: '8px 0' }}>Employee Created!</p>
				</div>
			</Modal>
		</>
	)
}
