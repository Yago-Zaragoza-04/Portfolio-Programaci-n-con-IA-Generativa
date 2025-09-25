# Ejemplo de Chat (Ask) y Asistente de Edición (Edit)

def sumar_lista(numeros):
    resultado = 0
    for n in numeros:
        resultado += n
    return resultado

print(sumar_lista([1, 2, 3, 4, 5]))

# → Usar /explain para que la IA explique la función
# → Usar /fix o pedir "optimizar con comprensión de listas"
# La IA debería sugerir reemplazar por: return sum(numeros)
