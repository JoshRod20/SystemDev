        import React from 'react';
        import { render } from '@testing-library/react-native';
        import WeatherCard from '../../src/app/components/weatherCard.js';

        describe('WeatherCard Component', () => {
            // Datos simulados de ejemplo que se utilizarán para las pruebas
            const mockWeatherData = {
            main: {
                temp: 25,          // Temperatura actual
                temp_max: 28,       // Temperatura máxima
                temp_min: 22,       // Temperatura mínima
                feels_like: 26,     // Sensación térmica
            },
            weather: [
                {
                icon: '01d',            // Código del ícono del clima
                description: 'Clear sky', // Descripción del clima
                },
            ],
            };
        
            // Prueba para verificar que la temperatura se renderiza correctamente
            it('renders temperature correctly', () => {
            const { getByText } = render(<WeatherCard weather={mockWeatherData} />);
            // Verifica si el texto "25°C" está en el componente
            expect(getByText('25°C')).toBeTruthy();
            });
        
            // Prueba para verificar que las temperaturas máxima y mínima se renderizan correctamente
            it('renders max and min temperature correctly', () => {
            const { getByText } = render(<WeatherCard weather={mockWeatherData} />);
            // Verifica si el texto "Máx: 28° Min: 22°" está en el componente
            expect(getByText('Máx: 28° Min: 22°')).toBeTruthy();
            });
        
            // Prueba para verificar que la sensación térmica se renderiza correctamente
            it('renders feels like temperature correctly', () => {
            const { getByText } = render(<WeatherCard weather={mockWeatherData} />);
            // Verifica si el texto "Sensación térmica: 26°C" está en el componente
            expect(getByText('Sensación térmica: 26°C')).toBeTruthy();
            });
        
            // Prueba para verificar que la descripción del clima se renderiza correctamente
            it('renders weather description correctly', () => {
            const { getByText } = render(<WeatherCard weather={mockWeatherData} />);
            // Verifica si el texto "Clear sky" (cielo despejado) está en el componente
            expect(getByText('Clear sky')).toBeTruthy();
            });
        
            // Prueba para verificar que el ícono del clima se renderiza correctamente
            it('renders weather icon correctly', () => {
            const { getByTestId } = render(<WeatherCard weather={mockWeatherData} />);
            const image = getByTestId('weather-icon'); // Obtiene el ícono de clima utilizando su testID
            // Verifica que la URI de la imagen del ícono sea la correcta basada en el código del ícono
            expect(image.props.source.uri).toBe('https://openweathermap.org/img/wn/01d@2x.png');
            });
        });