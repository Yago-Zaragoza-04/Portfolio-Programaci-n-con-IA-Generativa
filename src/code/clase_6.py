# Ejemplo para comparar respuestas de distintos modelos LLM

def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

print(factorial(5))

# → Pedir a la IA: "refactorizar para que sea más eficiente y maneje negativos"
# → Probar con distintos modelos (ej: GPT-4.1 vs o3-mini) y comparar diferencias
