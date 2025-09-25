# Ejemplo de sugerencia de finalización de código con IA
# Comentario en lenguaje natural → el asistente completa la función

# escribir una función que reciba dos fechas (YYYY-MM-DD)
# calcule la diferencia en días y devuelva el resultado

from datetime import datetime

def calculate_days_between_dates(begin: str, end: str) -> int:
    date_format = "%Y-%m-%d"
    d1 = datetime.strptime(begin, date_format)
    d2 = datetime.strptime(end, date_format)
    return abs((d2 - d1).days)

print(calculate_days_between_dates("2025-01-01", "2025-09-22"))
