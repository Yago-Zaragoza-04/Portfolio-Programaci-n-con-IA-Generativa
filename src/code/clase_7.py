# Simulación de un agente conectado a un servidor MCP

class ServidorMCP:
    def __init__(self):
        self.materias = ["IA Generativa", "Programación con GPUs", "Bases de Datos"]

    def getMaterias(self, carrera):
        print(f"Consultando materias para la carrera: {carrera}")
        return self.materias

class Agente:
    def __init__(self, servidor):
        self.servidor = servidor

    def consultar_materias(self, carrera):
        return self.servidor.getMaterias(carrera)

# Ejemplo de uso
servidor = ServidorMCP()
agente = Agente(servidor)

print("Materias encontradas:", agente.consultar_materias("Lic. en TI"))
