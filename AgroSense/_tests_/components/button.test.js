import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../src/app/components/button';

describe('<Button />', () => {
it('renders correctly with the given title', () => {
    const { getByText } = render(<Button title="Click Me" onPress={() => {}} />);
    
    //Verifica que el texto del botón se renderiza correctamente
    expect(getByText('Click Me')).toBeTruthy();
});

it('calls onPress when pressed', () => {
    const onPressMock = jest.fn(); // Crea un mock para la función onPress
    const { getByText } = render(<Button title="Click Me" onPress={onPressMock} />);

    //Simula un evento de presión en el botón
    fireEvent.press(getByText('Click Me'));

    // Verifica que la función onPress haya sido llamada
    expect(onPressMock).toHaveBeenCalled();
    });
});
