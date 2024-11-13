import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FooterMenu from "../../src/app/components/footerMenu";
import { NavigationContainer } from "@react-navigation/native";

// Mock manual de la navegación
const mockNavigate = jest.fn();

describe("FooterMenu", () => {
  beforeEach(() => {
    mockNavigate.mockClear(); // Limpiar las llamadas previas a mockNavigate
  });

  const renderWithNavigation = () => {
    return render(
      <NavigationContainer>
        <FooterMenu navigation={{ navigate: mockNavigate }} />
      </NavigationContainer>
    );
  };

  test("renders FooterMenu correctly", () => {
    const { getByText } = renderWithNavigation();

    // Verificar que los textos de los botones estén presentes
    expect(getByText("Inicio")).toBeTruthy();
    expect(getByText("Sus cultivos")).toBeTruthy();
    expect(getByText("ChatBot")).toBeTruthy();
    expect(getByText("AgroBiblio")).toBeTruthy();
  });

  test("calls navigation.navigate when a menu item is pressed", () => {
    const { getByText } = renderWithNavigation();

    // Simular el toque en el botón 'Inicio'
    fireEvent.press(getByText("Inicio"));
    expect(mockNavigate).toHaveBeenCalledWith("MainScreen");

    // Simular el toque en el botón 'Sus cultivos'
    fireEvent.press(getByText("Sus cultivos"));
    expect(mockNavigate).toHaveBeenCalledWith("theirCrops");

    // Simular el toque en el botón 'ChatBot'
    fireEvent.press(getByText("ChatBot"));
    expect(mockNavigate).toHaveBeenCalledWith("ChatBot");

    // Simular el toque en el botón 'AgroBiblio'
    fireEvent.press(getByText("AgroBiblio"));
    expect(mockNavigate).toHaveBeenCalledWith("agriculturalLibrary");
  });
});
