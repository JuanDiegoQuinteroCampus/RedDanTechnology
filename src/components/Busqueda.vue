<template>
  <div>
    <h1>Lista de Marcas</h1>
    <div>
      <label for="search">Buscar por nombre:</label>
      <input type="text" id="search" v-model="nombreABuscar" @input="buscar" />
    </div>
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
      <button @click="paginaAnterior" :disabled="paginaActual === 0">Anterior</button>
      <button @click="paginaSiguiente" :disabled="(paginaActual + 1) * pageSize >= clientes.length">Siguiente</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const clientes = ref([]);
const nombreABuscar = ref('');
const pageSize = 10;
const paginaActual = ref(0);

const obtenerClientes = async (nombre) => {
  try {
    const response = await fetch(`http://localhost:5023/clientes/all?nombre=${nombre}`);
    const data = await response.json();
    clientes.value = data;
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

const displayedClientes = computed(() => {
  const inicio = paginaActual.value * pageSize;
  const fin = inicio + pageSize;
  return clientes.value.slice(inicio, fin);
});

const paginaAnterior = () => {
  if (paginaActual.value > 0) {
    paginaActual.value--;
  }
};

const paginaSiguiente = () => {
  if ((paginaActual.value + 1) * pageSize < clientes.value.length) {
    paginaActual.value++;
  }
};

onMounted(() => {
  obtenerClientes(nombreABuscar.value);
});

const buscar = () => {
  obtenerClientes(nombreABuscar.value);
};
</script>


