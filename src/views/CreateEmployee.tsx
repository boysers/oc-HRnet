import { ChangeEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, DatePicker, Modal, SelectMenu, TextField, Fieldset } from 'oc-hrnet-ui'
import { STATES } from '@/constants/states'
import { useDispatch } from '@/store'
import { createEmployeeAsync } from '@/usecases/employees-slice'
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
	private static readonly MIN_LENGTH = 2
	private static readonly ZIP_CODE_PATTERN = /^\d{5}$/

	private static validateMinLength(value: string, minLength = this.MIN_LENGTH): string {
		return value.length < minLength ? `Must be at least ${minLength} characters.` : ''
	}

	private static validateDate(value: string): string {
		return isNaN(new Date(value)?.getTime()) ? 'Invalid date.' : ''
	}

	private static containsNumber(value: string): string {
		return /\d/.test(value) ? 'Cannot contain numbers.' : ''
	}

	static validateField(name: keyof Fields, value: string): string {
		switch (name) {
			case 'firstName':
				return this.validateMinLength(value) || this.containsNumber(value)
			case 'lastName':
				return this.validateMinLength(value) || this.containsNumber(value)
			case 'dateOfBirth':
				return this.validateDate(value)
			case 'startDate':
				return this.validateDate(value)
			case 'street':
				return this.validateMinLength(value)
			case 'city':
				return this.validateMinLength(value) || this.containsNumber(value)
			case 'state':
				return ''
			case 'zipCode':
				return this.ZIP_CODE_PATTERN.test(value) ? '' : 'Zip code must have 5 digits.'
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
		if (value) {
			setErrors((prevFields) => ({
				...prevFields,
				[name]: '',
			}))
		}
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

		dispatch(createEmployeeAsync(fields))
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
