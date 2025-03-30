// scripts/popup.js

document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const zplInput = document.getElementById('zplInput');
  const dpiSelect = document.getElementById('dpiSelect');
  const sizeInput = document.getElementById('sizeInput');
  const previewButton = document.getElementById('previewButton');
  const exportPngButton = document.getElementById('exportPngButton'); // Nuevo
  const exportPdfButton = document.getElementById('exportPdfButton'); // Nuevo
  const previewImage = document.getElementById('previewImage');
  const errorMsg = document.getElementById('errorMsg');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const exportIndicator = document.getElementById('exportIndicator'); // Nuevo

  // --- Función Auxiliar para llamar a la API ---
  async function callLabelaryAPI(zpl, dpi, size, acceptHeader) {
    const apiUrl = `https://api.labelary.com/v1/printers/${dpi}dpmm/labels/${size}/0/`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Accept': acceptHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: zpl
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error de la API (${response.status}): ${errorText || response.statusText}`);
    }
    return response.blob(); // Devuelve el blob (imagen o PDF)
  }

  // --- Función Auxiliar para disparar la descarga ---
  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a); // Necesario en Firefox
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Limpiar URL del objeto
  }

  // --- Lógica Botón Previsualizar ---
  previewButton.addEventListener('click', async () => {
    const zpl = zplInput.value;
    const dpi = dpiSelect.value;
    const size = sizeInput.value.trim();

    // Reset UI
    errorMsg.textContent = '';
    previewImage.src = '';
    previewImage.style.display = 'none';
    loadingIndicator.style.display = 'none';
    exportIndicator.style.display = 'none';
    previewButton.disabled = false;
    exportPngButton.disabled = false; // Habilitar exportación también
    exportPdfButton.disabled = false;

    // Validaciones
    if (!zpl.trim()) {
      errorMsg.textContent = 'Por favor, introduce código ZPL.'; return;
    }
    if (!/^\d+(\.\d+)?x\d+(\.\d+)?$/.test(size)) {
       errorMsg.textContent = 'Formato de tamaño inválido. Usa Ancho x Alto (ej: 4x6).'; return;
    }

    // Iniciar Carga
    previewButton.disabled = true;
    exportPngButton.disabled = true;
    exportPdfButton.disabled = true;
    loadingIndicator.style.display = 'inline';
    let imageUrl = null;
    previewImage.onload = null;
    previewImage.onerror = null;

    try {
      const imageBlob = await callLabelaryAPI(zpl, dpi, size, 'image/png'); // Pide PNG para preview

      if (previewImage.dataset.objectUrl) {
        URL.revokeObjectURL(previewImage.dataset.objectUrl);
      }
      imageUrl = URL.createObjectURL(imageBlob);
      previewImage.dataset.objectUrl = imageUrl;

      previewImage.onload = () => {
        console.log("ONLOAD: Imagen cargada.");
        previewImage.style.display = 'block';
      };
      previewImage.onerror = () => {
        console.error("ONERROR: Fallo al cargar imagen en <img>.");
        if (previewImage.style.display !== 'block') {
          errorMsg.textContent = 'Fallo al cargar la imagen de previsualización en la etiqueta img.';
        } else {
             console.warn("Onerror disparado pero la imagen parece visible.");
        }
        previewImage.style.display = 'none';
        if (imageUrl) URL.revokeObjectURL(imageUrl);
        previewImage.dataset.objectUrl = '';
      };
      previewImage.src = imageUrl;

    } catch (error) {
       console.error('Error en previsualización:', error);
       errorMsg.textContent = `Error: ${error.message}`;
       previewImage.style.display = 'none';
        if (imageUrl) { URL.revokeObjectURL(imageUrl); previewImage.dataset.objectUrl = ''; }
    } finally {
      loadingIndicator.style.display = 'none';
      previewButton.disabled = false;
       // Habilitar exportación solo si hay ZPL válido
       const enableExport = zpl.trim() !== '';
       exportPngButton.disabled = !enableExport;
       exportPdfButton.disabled = !enableExport;
    }
  });

  // --- Lógica Botones Exportar ---
  async function handleExport(format) {
    const zpl = zplInput.value;
    const dpi = dpiSelect.value;
    const size = sizeInput.value.trim();
    const isPng = format === 'png';
    const acceptHeader = isPng ? 'image/png' : 'application/pdf';
    const filename = isPng ? 'label.png' : 'label.pdf';

    // Reset UI parcial
    errorMsg.textContent = '';
    exportIndicator.style.display = 'none';
    previewButton.disabled = false;
    exportPngButton.disabled = false;
    exportPdfButton.disabled = false;

    // Validaciones rápidas
    if (!zpl.trim()) { errorMsg.textContent = 'Introduce código ZPL para exportar.'; return; }
    if (!/^\d+(\.\d+)?x\d+(\.\d+)?$/.test(size)) { errorMsg.textContent = 'Formato de tamaño inválido.'; return; }

    // Iniciar Exportación
    previewButton.disabled = true;
    exportPngButton.disabled = true;
    exportPdfButton.disabled = true;
    exportIndicator.style.display = 'inline'; // Mostrar indicador de exportación

    try {
      console.log(`Exportando a ${format.toUpperCase()}...`);
      const fileBlob = await callLabelaryAPI(zpl, dpi, size, acceptHeader);
      triggerDownload(fileBlob, filename);
      console.log(`Descarga de ${filename} iniciada.`);

    } catch (error) {
      console.error(`Error exportando a ${format.toUpperCase()}:`, error);
      errorMsg.textContent = `Error de exportación: ${error.message}`;
    } finally {
      exportIndicator.style.display = 'none';
      previewButton.disabled = false;
      // Habilitar botones si hay ZPL
       const enableExport = zpl.trim() !== '';
       exportPngButton.disabled = !enableExport;
       exportPdfButton.disabled = !enableExport;
    }
  }

  exportPngButton.addEventListener('click', () => handleExport('png'));
  exportPdfButton.addEventListener('click', () => handleExport('pdf'));

});