<template>
  <div>
    <h1>Nuevo Cliente</h1>
    <button @click="mostrarModal = true">Nuevo</button>

    <div v-if="mostrarModal">
      <div>
        <h2>Agregar Nuevo Cliente</h2>
        <label for="nombre">Nombre:</label>
        <input v-model="nuevoCliente.nombre" type="text" id="nombre" />

        <label for="apellido">Apellido:</label>
        <input v-model="nuevoCliente.apellido" type="text" id="apellido" />

        <label for="direccion">Dirección:</label>
        <input v-model="nuevoCliente.direccion" type="text" id="direccion" />

        <label for="fecha_nacimiento">FechaNacimiento:</label>
        <input v-model="nuevoCliente.fecha_nacimiento" type="date" id="fecha_nacimiento" />

        <label for="telefono">Telefono:</label>
        <input v-model="nuevoCliente.telefono" type="text" id="telefono" />

        <label for="email">Email:</label>
        <input v-model="nuevoCliente.email" type="text" id="email" />

        <label for="categoria">Categoria:</label>
        <input v-model="nuevoCliente.categoria" type="text" id="categoria" />

        <button @click="agregarCliente">Guardar</button>
        <button @click="cerrarModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const mostrarModal = ref(false);
const nuevoCliente = ref({
  nombre: '',
  apellido: '',
  direccion: '',
  fecha_nacimiento: '',
  telefono: '',
  email: '',
  categoria: '',
});

const cerrarModal = () => {
  mostrarModal.value = false;
  nuevoCliente.value = {
  nombre: '',
  apellido: '',
  direccion: '',
  fecha_nacimiento: '',
  telefono: '',
  email: '',
  categoria: '',
    
  };
};

const agregarCliente = async () => {
  try {
    const response = await fetch('http://localhost:5023/clientes/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoCliente.value),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Cliente agregado correctamente:', data.message);
      cerrarModal();
    } else {
      console.error('Error al agregar cliente:', data.error);
    }
  } catch (error) {
    console.error('Error al añadir el cliente:', error);
  }
};

</script>

<style scoped>
</style>
