import React from 'react'
import { Container, InputBase } from './styles'

const Input = (props) => {
    const { id, onChange, label, ...rest } = props

    const handleChange = (e) => {
        return onChange(props.id, e.target.value)
    }

    return (
        <Container>
            {label && (
                <p 
                    style={{ 
                        marginTop: '50px',
                        marginBottom: '5px'
                    }}
                >
                    {label}
                </p>
            )}
            <InputBase
                {...rest}
                onChange={handleChange} 
                style={{ 
                    width: '200px', 
                    height: '30px',
                    paddingLeft: '10px',
                    borderRadius: '5px',
                    border: '1px solid'
                }}
            />
        </Container>
    )
}

export {
    Input
}