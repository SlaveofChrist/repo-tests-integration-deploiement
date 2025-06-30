import mysql.connector
import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    lastName: str
    firstName: str
    email: EmailStr
    birthDate: datetime  
    city: str
    postalCode: str

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

@app.options("/users")
async def options_users(request: Request):
    response = Response()
    response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin", "*")
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.status_code = 204  # No Content
    return response

@app.get("/users")
async def get_users(): 
    cursor = conn.cursor()
    sql_select_Query = "select * from users"
    cursor.execute(sql_select_Query)
    records = cursor.fetchall()
    print("Total number of rows in table: ",cursor.rowcount)
    return {'users': records}

@app.post("/users")
async def create_user(user: UserCreate):
    try:
        cursor = conn.cursor()
        insert_query = """
            INSERT INTO users (lastName, firstName, email, birthDate, city, postalCode)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        values = (
            user.lastName,
            user.firstName,
            user.email,
            user.birthDate.strftime("%Y-%m-%d %H:%M:%S"),
            user.city,
            user.postalCode
        )

        cursor.execute(insert_query, values)
        conn.commit()
        return {"message": "Utilisateur enregistré avec succès."}
    
    except mysql.connector.IntegrityError as e:
        if "Duplicate entry" in str(e):
            raise HTTPException(status_code=409, detail="Email déjà utilisé.")
        raise HTTPException(status_code=400, detail=f"Erreur d'intégrité : {e}")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur serveur : {e}")