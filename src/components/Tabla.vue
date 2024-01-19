<template>
  <div>
    <h1>Tabla de Clientes</h1>
    <table>
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

    <div v-if="mostrarModalEditar">
      <div>
        <h2>Editar Cliente</h2>
        <label for="nombre">Nombre:</label>
        <input v-model="clienteEditado.nombre" type="text" id="nombre" />

        <label for="apellido">Apellido:</label>
        <input v-model="clienteEditado.apellido" type="text" id="apellido" />

        <label for="direccion">Dirección:</label>
        <input v-model="clienteEditado.direccion" type="text" id="direccion" />

        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <input v-model="clienteEditado.fecha_nacimiento" type="date" id="fechaNacimiento" />

        <label for="telefono">Teléfono:</label>
        <input v-model="clienteEditado.telefono" type="text" id="telefono" />

        <label for="email">Email:</label>
        <input v-model="clienteEditado.email" type="text" id="email" />

        <label for="categoria">Categoría:</label>
        <input v-model="clienteEditado.categoria" type="text" id="categoria" />

        <button @click="actualizarCliente">Actualizar</button>
        <button @click="cerrarModalEditar">Cancelar</button>
      </div>
    </div>


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
/* Puedes agregar estilos específicos para este componente aquí */
</style>
