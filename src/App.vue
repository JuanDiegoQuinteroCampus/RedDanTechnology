<template>
  <div>
    <div class="todo">
      <Busqueda />
      
    </div>
    <Tabla />
  </div>
</template>


<script setup lang="ts">
import Tabla from "./components/tabla.vue";
import Busqueda from "./components/busqueda.vue";

</script>
