<template>

  <div>
    <button @click="exportarAPDF">Exportar a PDF</button>
  </div>
</template>

<script setup>
const exportarAPDF = async () => {
  try {
    const response = await fetch('http://localhost:5023/pdf/exportopdf');
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'clientes.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al exportar a PDF:', error);
  }
};
</script>