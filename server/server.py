import mysql.connector
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["https://slaveofchrist.github.io","http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True ,
    allow_methods =["*"],
    allow_headers =["*"] 
)

conn = mysql.connector.connect(
    database= os.getenv("MYSQL_DATABASE"),
    user= os.getenv("MYSQL_USER"),
    password= os.getenv("MYSQL_ROOT_PASSWORD"),
    port= 3306,
    host= os.getenv("MYSQL_HOST")
)


@app.get("/users")
async def get_users(): 
    cursor = conn.cursor()
    sql_select_Query = "select * from users"
    cursor.execute(sql_select_Query)
    records = cursor.fetchall()
    print("Total number of rows in table: ",cursor.rowcount)
    return {'users': records}
