import mysql from "mysql2";
import { Router } from "express";

const appClientes = Router();
let con = undefined;

appClientes.use((req, res, next) => {
  let myConfig = JSON.parse(process.env.MY_CONNECT);
  con = mysql.createPool(myConfig);
  next();
});

appClientes.get("/all", async (req, res) => {
  try {
    const { query } = req;
    const conditions =
      Object.keys(query).length === 0
        ? ""
        : ` WHERE ${Object.keys(query)
            .map((key) => `${key} = ?`)
            .join(" AND ")}`;
    const sql = `SELECT * FROM cliente${conditions}`;
    con.query(sql, Object.values(query), (err, data) => {
      if (err) console.log(err, " Error en la consulta para la base de datos");
      res.send(JSON.stringify(data));
    });
  } catch (error) {
    console.error("Error en la conexion a la base de datos o error en la consulta:", error);
    res.status(500).send("Error en la consulta o conexion a la base de datos");
  }
});

appClientes.post("/post", (req, res) => {
  const { nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria } = req.body;

  con.query(
    `INSERT INTO cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria) VALUES (?, ?, ?,?, ?, ?,?)`,
    [nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al insertar datos en la tabla cliente" ,err});
      }
    res.status(201).json({
          message: "Datos insertados correctamente en la tabla cliente",
        });
    }
  );
});

appClientes.put("/put/:idCliente", (req, res) => {
    const id_cliente = req.params.idCliente;
    const { nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria } = req.body;
    con.query(
      `UPDATE cliente SET nombre = ?, apellido = ?, direccion = ?, fecha_nacimiento = ?, telefono = ?, email = ?, categoria = ? WHERE id_cliente = ?`,
      [nombre, apellido, direccion, fecha_nacimiento, telefono, email, categoria, id_cliente],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error al actualizar datos en la tabla cliente", err });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Cliente no encontrado" });
        }
  
        res.status(200).json({
          message: "Datos actualizados correctamente en la tabla cliente",
        });
      }
    );
  });


appClientes.delete("/delete/:idCliente", (req, res) => {
    const idCliente = req.params.idCliente;
    con.query(
        `DELETE FROM cliente WHERE id_cliente = ?`, [idCliente],
        (err, result) => {
            if (err) { return res.status(500).json({ error: "No se pudo eliminar el dato", err });}
            if (result.affectedRows === 0) { return res.status(404).json({ error: "Cliente no encontrado" });}
            res.status(200).json({
                message: "Cliente eliminado correctamente",
            });
        }
    );
});

export default appClientes;
