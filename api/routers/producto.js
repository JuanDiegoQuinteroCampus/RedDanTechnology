import mysql from "mysql2";
import { Router } from "express";

const appProducto = Router();
let con = undefined;

appProducto.use((req, res, next) => {
  let myConfig = JSON.parse(process.env.MY_CONNECT);
  con = mysql.createPool(myConfig);
  next();
});

appProducto.get('/all', (req, res)=>{
    con.query(
        `SELECT *
        FROM producto `,
        (err,data,fil) => {
            res.send(JSON.stringify(data));
        }
    )
});

appProducto.post("/post", (req, res) => {
    const { nombre,  precio, stock, id_factura } = req.body;
  
    con.query(
      `INSERT INTO producto (nombre, precio, stock, id_factura) VALUES (?,?,?,?)`,
      [nombre, precio, stock, id_factura ],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error al insertar datos en la tabla producto" ,err});
        }
      res.status(201).json({
            message: "Datos insertados correctamente en la tabla producto",
          });
      }
    );
  });
  
  appProducto.put("/put/:id_producto", (req, res) => {
      const id_producto = req.params.id_producto;
      const { nombre, precio, stock, id_factura } = req.body;
      con.query(
        `UPDATE producto SET nombre = ?, precio = ?, stock = ?, id_factura = ? WHERE id_producto = ?`,
        [nombre, precio, stock, id_factura, id_producto],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Error al actualizar datos en la tabla producto", err });
          }
    
          if (result.affectedRows === 0) {
            return res.status(404).json({ error: "producto no encontrado" });
          }
    
          res.status(200).json({
            message: "Datos actualizados correctamente en la tabla producto",
          });
        }
      );
    });
  
  
    appProducto.delete("/delete/:id_producto", (req, res) => {
      const id_producto = req.params.id_producto;
      con.query(
          `DELETE FROM producto WHERE id_producto = ?`, [id_producto],
          (err, result) => {
              if (err) { return res.status(500).json({ error: "No se pudo eliminar el dato", err });}
              if (result.affectedRows === 0) { return res.status(404).json({ error: "producto no encontrado" });}
              res.status(200).json({
                  message: "producto eliminado correctamente",
              });
          }
      );
  });
  
  export default appProducto;
  