import { ChangeEvent } from 'react'
import styled from 'styled-components'

type DatePickerProps = { id: string; name: string; onChange?: OnChange }

type OnChange = (event: ChangeEvent<HTMLInputElement>) => void

const StyledInputDate = styled.input`
	font-size: 16px;
`

export const DatePicker: React.FC<DatePickerProps> = ({ id, name }) => {
	return <StyledInputDate type="date" name={name} id={id} />
}
