    import React from 'react';
    import { render, fireEvent } from '@testing-library/react-native';
    import WelcomeScreen from '../../src/app/screens/welcomeScreen';

    // Mock de la navegación para verificar que se llama a la función navigate
    const mockNavigation = {
    navigate: jest.fn(),
    };

    describe('WelcomeScreen', () => {
    it('debería renderizar el logo, el título y el botón', () => {
        // Renderiza la pantalla WelcomeScreen
        const { getByText, getByTestId } = render(<WelcomeScreen navigation={mockNavigation} />);

        // Verifica que el título "Bienvenido a AgroSense" esté en la pantalla
        expect(getByText('“Bienvenido a AgroSense”')).toBeTruthy();

        // Verifica que el botón "Continuar" esté en la pantalla
        expect(getByText('Continuar')).toBeTruthy();

        // Verifica que el logo esté en la pantalla usando su testID
        expect(getByTestId('logo')).toBeTruthy();
    });

    it('debería navegar a la pantalla de inicio de sesión al presionar el botón', () => {
        const { getByText } = render(<WelcomeScreen navigation={mockNavigation} />);

        // Simula el evento de presionar el botón
        fireEvent.press(getByText('Continuar'));

        // Verifica que se haya llamado a la función navigate con el parámetro "Login"
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
    });
    });
