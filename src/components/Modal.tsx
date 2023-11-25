import { PropsWithChildren, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

type ModalProps = PropsWithChildren<{ isOpen: boolean; onClose: () => void }>

const StyledModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.75);
	width: 100%;
	height: 100%;
	z-index: 100;

	display: flex;
	justify-content: center;
	align-items: center;
`

const StyledClose = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 99;
`

const StyledContainer = styled.div`
	position: relative;
	z-index: 101;
	display: inline-block;
`

export const Modal: React.FC<ModalProps> = (props) => {
	const { isOpen, onClose, children } = props

	useEffect(() => {
		const body = document.body

		if (isOpen) {
			body.style.overflow = 'hidden'
			return
		}

		body.style.overflow = ''

		return () => {
			body.style.overflow = ''
		}
	}, [isOpen])

	if (!isOpen) return null
	return createPortal(
		<StyledModal>
			<StyledClose onClick={onClose} />
			<StyledContainer>{children}</StyledContainer>
		</StyledModal>,
		document.body
	)
}
