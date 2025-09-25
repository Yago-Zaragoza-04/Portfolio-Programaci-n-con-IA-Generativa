# Ejemplo para refactorizar con IA

def calculate_area_of_rectangle(length, width):
    area = length * width
    return area

def calculate_area_of_circle(radius):
    area = 3.14159 * (radius ** 2)
    return area

# → Pedir a la IA: "hacer más conciso este código"
# → Resultado esperado: return length * width / return math.pi * (radius ** 2)
