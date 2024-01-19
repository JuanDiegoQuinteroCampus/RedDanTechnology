import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import appClientes from './routers/clientes.js';
import appProducto from './routers/producto.js';
import appFactura from './routers/factura.js';
import appExport from './routers/pdfExport.js';

dotenv.config();
const app = express()

app.use(express.json());
app.use(cors());

app.use('/clientes', appClientes);
app.use('/producto', appProducto);
app.use('/factura', appFactura);
app.use('/pdf', appExport);


const config = JSON.parse(process.env.MY_CONFIG);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})