# Clase 9 - Pruebas Unitarias e Integrales con Agente de IA
class Cuenta:
    def __init__(self, saldo_inicial=0):
        if saldo_inicial < 0:
            raise ValueError("El saldo no puede ser negativo")
        self._saldo = saldo_inicial

    def depositar(self, monto):
        if monto <= 0:
            raise ValueError("El monto a depositar no puede ser negativo")
        self._saldo += monto

    def retirar(self, monto):
        if monto <= 0:
            raise ValueError("El monto a retirar no puede ser negativo")
        if monto > self._saldo:
            raise ValueError("El monto a retirar no puede ser mayor al saldo")
        self._saldo -= monto

    def get_saldo(self):
        return self._saldo
