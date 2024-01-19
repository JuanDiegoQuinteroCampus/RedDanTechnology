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
            <button @click="editar(cliente.id_cliente)">Editar</button>
            <button @click="eliminar(cliente.id_cliente)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

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

const obtenerClientes = async () => {
  try {
    const response = await fetch('http://localhost:5023/clientes/all');
    const data = await response.json();
    clientes.value = data;
    actualizarPagina();  // Llama a actualizarPagina después de obtener los datos
  } catch (error) {
    console.error('Error al obtener los datos de clientes:', error);
  }
};

const editar = (id) => {
  console.log('Editar cliente con ID:', id);
};

const eliminar = (id) => {
  console.log('Eliminar cliente con ID:', id);
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

onMounted(() => {
  obtenerClientes();
});
</script>

<style scoped>
/* Puedes agregar estilos específicos para este componente aquí */
</style>
