import mysql from "mysql2";
import { Router } from "express";
import PDFDocument from "pdfkit"; 
import fs from "fs";

const appExport = Router();
let con = undefined;

appExport.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig);
    next();
  });

appExport.get("/exportopdf", async (req, res) => {
  try {
    const sql = `SELECT * FROM cliente`;
    con.query(sql, (err, data) => {
      if (err) {
       console.log();(err, "No se pudo obtener los datos de la base de datos");
        return res.status(500).send("No se pudo obtener los datos de la base de datos");
      }
      const pdfDoc = new PDFDocument();
      const outputPath = "clientes.pdf";

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${outputPath}`);
      data.forEach((cliente) => {
      pdfDoc.text(`
Id: ${cliente.id_cliente},
Nombre: ${cliente.nombre}, 
Apellido: ${cliente.apellido}, 
Direccion: ${cliente.direccion},
fechaNacimiento: ${cliente.fecha_nacimiento},
Telefono: ${cliente.telefono},
Email: ${cliente.email},
Categoria: ${cliente.categoria} `); 
          pdfDoc.moveDown();
        });
        pdfDoc.pipe(fs.createWriteStream(outputPath));
        pdfDoc.pipe(res);
        pdfDoc.end();
      });
    } catch (error) {
      console.error("Error en la conexión a la base de datos o error en la consulta:", error);
      res.status(500).send("Error en la consulta o conexión a la base de datos");
    }
  });
  
export default appExport;