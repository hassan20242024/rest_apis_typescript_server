 import express from "express"
 import router from "./router"
 import db from "./config/db"
 import colors from "colors"
 import cors, { CorsOptions } from "cors"
 import morgan from "morgan"
 import swaggerUI from "swagger-ui-express"
 import swaggerSpec, { swaggerUiOptions } from "./config/swagger"


 //Conectar a base de datos

 export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.bgBlue.white("Conexión exitosa a la BD"))
    } catch (error) {
        //console.log(error)
        console.log(colors.bgRed.white("hubo un error al conectar la BD"))
    }
 }
 connectDB()
 
 //Instancia de Express
 const server = express()



 //Permitir conexiones, esto se escribe al trabajar con el POST en la parte del Fronet
 const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTED_URL) {
            callback(null, true)
        } else {
            callback(new Error("Error de CORS"))
        }
    }
 }
 server.use(cors(corsOptions))



 //Leer datos de formulario
 server.use(express.json())

 //uso de morgan: este paso se usa cuado se agregarn productos desde el fronet para detallar entrada de datos:
 server.use(morgan("dev"))
 
 server.use("/api/products", router)

 //Docs
 server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions) )



 export default server
