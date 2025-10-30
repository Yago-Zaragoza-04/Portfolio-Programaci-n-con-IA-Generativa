# Clase 10 - Documentación y Seguridad con IA

# ============================================
# EJEMPLO 1: COBOL - INSERT RECORD
# ============================================
"""
IDENTIFICATION DIVISION.
PROGRAM-ID. INSERT-RECORD.

ENVIRONMENT DIVISION.

DATA DIVISION.
WORKING-STORAGE SECTION.
01  WS-STATUS-FLAGS.
    05 WS-DB-STATUS     PIC X(2).
       88 WS-SUCCESS    VALUE "00".
    05 WS-SQLCODE       PIC S9(9) COMP.
    05 WS-ERROR-MSG     PIC X(50).

LINKAGE SECTION.
01  LS-PARAMETERS.
    05 LS-PERSON-RECORD.
       10 PERSON-ID     PIC 9(6).
       10 PERSON-NAME   PIC X(50).
       10 PERSON-AGE    PIC 9(3).
    05 LS-RESULT        PIC X.
       88 SUCCESS       VALUE 'T'.
       88 FAILED        VALUE 'F'.

PROCEDURE DIVISION USING LS-PARAMETERS.
    PERFORM INSERT-AND-VALIDATE
    GOBACK
    .

INSERT-AND-VALIDATE.
    EXEC SQL
        INSERT INTO persons (id, name, age)
        VALUES (:PERSON-ID, :PERSON-NAME, :PERSON-AGE)
    END-EXEC

    IF SQLCODE = 0
        EXEC SQL COMMIT END-EXEC
        SET SUCCESS TO TRUE
    ELSE
        EXEC SQL ROLLBACK END-EXEC
        SET FAILED TO TRUE
        STRING "DB Error: " SQLCODE
            DELIMITED BY SIZE
            INTO WS-ERROR-MSG
        DISPLAY WS-ERROR-MSG
    END-IF
"""

# ============================================
# EJEMPLO 2: SQL INJECTION INSEGURO
# ============================================
# EJEMPLO INSEGURO — concatenación de strings en SQL (NO HACER)
import mysql.connector

con = mysql.connector.connect(user="root", password="", host="127.0.0.1", database="ej")
cursor = con.cursor()

user_name = "John"  # simula usuario autenticado
item_name = input("Ingrese item: ")  # entrada no validada

query = "SELECT * FROM items WHERE owner = '" + user_name + "' AND itemname = '" + item_name + "'"
cursor.execute(query)  # vulnerable: ' OR 5=5

for row in cursor.fetchall():
    print(row)

con.close()
