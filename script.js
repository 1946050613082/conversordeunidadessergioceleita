// Definición de unidades por categoría
const units = {
    temperature: [
      { name: "Celsius", symbol: "°C" },
      { name: "Fahrenheit", symbol: "°F" },
      { name: "Kelvin", symbol: "K" },
    ],
    length: [
      { name: "Metros", symbol: "m" },
      { name: "Pies", symbol: "ft" },
      { name: "Pulgadas", symbol: "in" },
      { name: "Centímetros", symbol: "cm" },
    ],
    weight: [
      { name: "Kilogramos", symbol: "kg" },
      { name: "Libras", symbol: "lb" },
      { name: "Onzas", symbol: "oz" },
      { name: "Gramos", symbol: "g" },
    ],
  };
  
  // Elementos del DOM
  const categorySelect = document.getElementById("category");
  const unitFromSelect = document.getElementById("unit-from");
  const unitToSelect = document.getElementById("unit-to");
  const valueInput = document.getElementById("value");
  const resultSpan = document.getElementById("result");
  
  // Cargar unidades al cambiar la categoría
  categorySelect.addEventListener("change", () => {
    loadUnits();
    convert();
  });
  
  // Cargar unidades en los selectores
  function loadUnits() {
    const category = categorySelect.value;
    const unitList = units[category];
  
    unitFromSelect.innerHTML = unitList
      .map((unit) => `<option value="${unit.name}">${unit.name} (${unit.symbol})</option>`)
      .join("");
  
    unitToSelect.innerHTML = unitList
      .map((unit) => `<option value="${unit.name}">${unit.name} (${unit.symbol})</option>`)
      .join("");
  }
  
  // Conversión de unidades
  function convert() {
    const category = categorySelect.value;
    const unitFrom = unitFromSelect.value;
    const unitTo = unitToSelect.value;
    const value = parseFloat(valueInput.value);
  
    if (isNaN(value)) {
      resultSpan.textContent = "0";
      return;
    }
  
    let result;
  
    switch (category) {
      case "temperature":
        result = convertTemperature(value, unitFrom, unitTo);
        break;
      case "length":
        result = convertLength(value, unitFrom, unitTo);
        break;
      case "weight":
        result = convertWeight(value, unitFrom, unitTo);
        break;
      default:
        result = 0;
    }
  
    resultSpan.textContent = result.toFixed(2);
  }
  
  // Conversión de temperatura
  function convertTemperature(value, from, to) {
    if (from === "Celsius" && to === "Fahrenheit") {
      return (value * 9) / 5 + 32;
    } else if (from === "Fahrenheit" && to === "Celsius") {
      return ((value - 32) * 5) / 9;
    } else if (from === "Celsius" && to === "Kelvin") {
      return value + 273.15;
    } else if (from === "Kelvin" && to === "Celsius") {
      return value - 273.15;
    } else if (from === "Fahrenheit" && to === "Kelvin") {
      return ((value - 32) * 5) / 9 + 273.15;
    } else if (from === "Kelvin" && to === "Fahrenheit") {
      return ((value - 273.15) * 9) / 5 + 32;
    }
    return value;
  }
  
  // Conversión de longitud
  function convertLength(value, from, to) {
    const conversions = {
      Metros: 1,
      Pies: 3.28084,
      Pulgadas: 39.3701,
      Centímetros: 100,
    };
    return (value / conversions[from]) * conversions[to];
  }
  
  // Conversión de peso
  function convertWeight(value, from, to) {
    const conversions = {
      Kilogramos: 1,
      Libras: 2.20462,
      Onzas: 35.274,
      Gramos: 1000,
    };
    return (value / conversions[from]) * conversions[to];
  }
  
  // Eventos para actualizar la conversión
  unitFromSelect.addEventListener("change", convert);
  unitToSelect.addEventListener("change", convert);
  valueInput.addEventListener("input", convert);
  
  // Cargar unidades al iniciar
  loadUnits();