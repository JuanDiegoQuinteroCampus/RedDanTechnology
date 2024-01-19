<template>
  <div>
    
    <button @click="mostrarModal = true">Nuevo</button>

    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal">
        <h2>Agregar Nuevo Cliente</h2>
        <label for="nombre">Nombre:</label>
        <input v-model="nuevoCliente.nombre" type="text" id="nombre" />
<br><br>

        <label for="apellido">Apellido:</label>
        <input v-model="nuevoCliente.apellido" type="text" id="apellido" />
<br><br>

        <label for="direccion">Dirección:</label>
        <input v-model="nuevoCliente.direccion" type="text" id="direccion" />
<br><br>

        <label for="fecha_nacimiento">FechaNacimiento:</label>
        <input v-model="nuevoCliente.fecha_nacimiento" type="date" id="fecha_nacimiento" />
<br><br>

        <label for="telefono">Telefono:</label>
        <input v-model="nuevoCliente.telefono" type="text" id="telefono" />
<br><br>

        <label for="email">Email:</label>
        <input v-model="nuevoCliente.email" type="text" id="email" />
<br><br>

        <label for="categoria">Categoria:</label>
        <input v-model="nuevoCliente.categoria" type="text" id="categoria" />
<br><br>

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

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 400px; /* Ajusta el ancho según tus necesidades */
}
</style>
