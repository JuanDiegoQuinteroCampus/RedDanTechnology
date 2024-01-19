<template>
  <div class='table-container'>

    <table class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cliente, index) in displayedClientes" :key="cliente.id_cliente">
          <td>{{ cliente.id_cliente }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>
            <button @click="editar(cliente)">Editar</button>
            <button @click="eliminar(cliente.id_cliente)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="mostrarModalEditar" class="modal-overlay">
  <div class="modal-card">
        <h2>Editar Cliente</h2>
        <label for="nombre">Nombre:</label>
        <input v-model="clienteEditado.nombre" type="text" id="nombre" />
<br><br>
        <label for="apellido">Apellido:</label>
        <input v-model="clienteEditado.apellido" type="text" id="apellido" />
<br><br>
        <label for="direccion">Dirección:</label>
        <input v-model="clienteEditado.direccion" type="text" id="direccion" />
<br><br>
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <input v-model="clienteEditado.fecha_nacimiento" type="date" id="fechaNacimiento" />
<br><br>
        <label for="telefono">Teléfono:</label>
        <input v-model="clienteEditado.telefono" type="text" id="telefono" />
<br><br>
        <label for="email">Email:</label>
        <input v-model="clienteEditado.email" type="text" id="email" />
<br><br>
        <label for="categoria">Categoría:</label>
        <input v-model="clienteEditado.categoria" type="text" id="categoria" />
<br><br>
        <button @click="actualizarCliente">Actualizar</button>
        <button @click="cerrarModalEditar">Cancelar</button>
      </div>
    </div>

<br><br>
    <div>
      <button @click="paginaAnterior">Anterior</button>
      <button @click="paginaSiguiente">Siguiente</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const clientes = ref([]);
const pageSize = 10;
const paginaActual = ref(0);

const mostrarModalEditar = ref(false);
const clienteEditado = ref({});

const obtenerClientes = async () => {
  try {
    const response = await fetch('http://localhost:5023/clientes/all');
    const data = await response.json();
    clientes.value = data;
    actualizarPagina();
  } catch (error) {
    console.error('Error al obtener los datos de clientes:', error);
  }
};

const editar = (cliente) => {
  mostrarModalEditar.value = true;
  clienteEditado.value = { ...cliente };
};

const eliminar = async (id) => {
  try {
    const response = await fetch(`http://localhost:5023/clientes/delete/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Cliente eliminado correctamente:', data.message);
      obtenerClientes();  
    } else {
      console.error('Error al eliminar cliente:', data.error);
    }
  } catch (error) {
    console.error('Error al realizar la solicitud de eliminación:', error);
  }
};

const displayedClientes = ref([]);

const actualizarPagina = () => {
  const inicio = paginaActual.value * pageSize;
  const fin = inicio + pageSize;
  displayedClientes.value = clientes.value.slice(inicio, fin);
};

const paginaAnterior = () => {
  if (paginaActual.value > 0) {
    paginaActual.value--;
    actualizarPagina();
  }
};

const paginaSiguiente = () => {
  if ((paginaActual.value + 1) * pageSize < clientes.value.length) {
    paginaActual.value++;
    actualizarPagina();
  }
};

const cerrarModalEditar = () => {
  mostrarModalEditar.value = false;
};

const actualizarCliente = async () => {
  try {
    const response = await fetch(`http://localhost:5023/clientes/put/${clienteEditado.value.id_cliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteEditado.value),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Cliente actualizado correctamente:', data.message);
      cerrarModalEditar();
      obtenerClientes();
    } else {
      console.error('Error al actualizar cliente:', data.error);
    }
  } catch (error) {
    console.error('Error al realizar la solicitud de actualización:', error);
  }
};

onMounted(() => {
  obtenerClientes();
});
</script>

<style scoped>
  .table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .styled-table {
    border-collapse: collapse;
    width: 100%; 
    margin-top: 20px;
    margin-bottom: 20px;
    display: table;
    margin-left: auto;
    margin-right: auto;
  }

  .styled-table th, .styled-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  .styled-table th {
    background-color: #f2f2f2;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-card {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 500px;
    height: 300px;
     display: flex;
    
    align-items: center;
    flex-wrap:wrap;

  }

  .pagination {
    margin-top: 20px;
  }
</style>

