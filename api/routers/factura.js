import mysql from "mysql2";
import { Router } from "express";

const appFactura = Router();
let con = undefined;

appFactura.use((req, res, next) => {
  let myConfig = JSON.parse(process.env.MY_CONNECT);
  con = mysql.createPool(myConfig);
  next();
});

appFactura.get('/all', (req, res)=>{
    con.query(
        `SELECT *
        FROM factura `,
        (err,data,fil) => {
            res.send(JSON.stringify(data));
        }
    )
});

appFactura.post("/post", (req, res) => {
    const {id_cliente, fecha, id_producto } = req.body;
  
    con.query(
      `INSERT INTO factura (id_cliente, fecha, id_producto) VALUES (?, ?, ?)`,
      [id_cliente, fecha, id_producto ],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error al insertar datos en la tabla factura" ,err});
        }
      res.status(201).json({
            message: "Datos insertados correctamente en la tabla factura",
          });
      }
    );
  });
  
  appFactura.put("/put/:num_factura", (req, res) => {
      const num_factura = req.params.num_factura;
      const { id_cliente, fecha, id_producto } = req.body;
      con.query(
        `UPDATE factura SET id_cliente = ?, fecha = ?, id_producto = ? WHERE num_factura = ?`,
        [id_cliente, fecha, id_producto, num_factura],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Error al actualizar datos en la tabla factura", err });
          }
    
          if (result.affectedRows === 0) {
            return res.status(404).json({ error: "factura no encontrado" });
          }
    
          res.status(200).json({
            message: "Datos actualizados correctamente en la tabla factura",
          });
        }
      );
    });
  
  
    appFactura.delete("/delete/:num_factura", (req, res) => {
      const num_factura = req.params.num_factura;
      con.query(
          `DELETE FROM factura WHERE num_factura = ?`, [num_factura],
          (err, result) => {
              if (err) { return res.status(500).json({ error: "No se pudo eliminar el dato", err });}
              if (result.affectedRows === 0) { return res.status(404).json({ error: "factura no encontrado" });}
              res.status(200).json({
                  message: "factura eliminado correctamente",
              });
          }
      );
  });
  
  export default appFactura;
  