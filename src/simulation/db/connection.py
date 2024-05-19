import os
import psycopg


def connect():
    connection_string = os.getenv("DATABASE_URL")
    return psycopg.connect(connection_string)