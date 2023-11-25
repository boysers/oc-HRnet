import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DatePicker, Modal, SelectMenu } from '@/components'
import { STATES } from '@/constants/states'

const ConfirmationModal = styled.div`
	min-width: 440px;
	background-color: #ffffff;
	border-radius: 8px;
	padding: 15px 30px;
	position: relative;

	.close-modal {
		position: absolute;
		top: -15px;
		right: -15px;
		width: 30px;
		height: 30px;
		cursor: pointer;
	}

	p {
		margin: 0;
	}
`

export const CreateEmployee: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const toggleModal = () => {
		setIsModalOpen((prev) => !prev)
	}

	return (
		<>
			<div className="title">
				<h1>HRnet</h1>
			</div>
			<div className="container">
				<Link to="employees">View Current Employees</Link>
				<h2>Create Employee</h2>
				<form action="#" id="create-employee">
					<label htmlFor="first-name">First Name</label>
					<input type="text" id="first-name" />

					<label htmlFor="last-name">Last Name</label>
					<input type="text" id="last-name" />

					<label htmlFor="date-of-birth">Date of Birth</label>
					<DatePicker id="date-of-birth" name="date-of-birth" />

					<label htmlFor="start-date">Start Date</label>
					<DatePicker id="start-date" name="start-date" />

					<fieldset className="address">
						<legend>Address</legend>

						<label htmlFor="street">Street</label>
						<input id="street" type="text" />

						<label htmlFor="city">City</label>
						<input id="city" type="text" />

						<label htmlFor="state">State</label>
						<SelectMenu
							name="state"
							id="state"
							options={STATES.map(({ name, abbreviation }) => ({
								value: abbreviation,
								label: name,
							}))}
						/>

						<label htmlFor="zip-code">Zip Code</label>
						<input id="zip-code" type="number" />
					</fieldset>

					<label htmlFor="department">Department</label>
					<SelectMenu
						id="department"
						name="department"
						options={[
							'Sales',
							'Marketing',
							'Engineering',
							'Human Resources',
							'Legal',
						].map((department) => ({ value: department, label: department }))}
					/>
				</form>

				<button
					onClick={() => {
						'saveEmployee()'
						toggleModal()
					}}
				>
					Save
				</button>
			</div>
			<Modal isOpen={isModalOpen} onClose={toggleModal}>
				<ConfirmationModal>
					<img
						className="close-modal"
						src="close-icon.png"
						alt="close modal"
						onClick={toggleModal}
					/>
					<p>Employee Created!</p>
				</ConfirmationModal>
			</Modal>
		</>
	)
}
