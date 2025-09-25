# Ejemplo de revisión de código con IA

def calcular_promedio(lista):
    suma = 0
    for i in range(len(lista)):
        suma = suma + lista[i]
    return suma / len(lista)

print(calcular_promedio([10, 20, 30, 40]))

# → Pedir a la IA una revisión de selección (Review and Comment)
# → La IA puede sugerir: return sum(lista) / len(lista)
# → También puede advertir sobre el caso de lista vacía
