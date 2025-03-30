# ZPL Label Previewer for Edge

Una extensión para Microsoft Edge que previsualiza código de etiquetas ZPL (Zebra Programming Language) usando la API de Labelary, con opciones para exportar como PNG o PDF.

## Descripción

Esta extensión proporciona una interfaz sencilla dentro de una ventana de navegador redimensionable para:
- Pegar o escribir código ZPL.
- Seleccionar la densidad de la etiqueta (DPI) y las dimensiones (en pulgadas).
- Renderizar una previsualización visual de la etiqueta enviando el código al servicio web público de Labelary.
- Exportar la etiqueta renderizada como un archivo de imagen PNG.
- Exportar la etiqueta renderizada como un documento PDF.

## Características

- Previsualización de código ZPL (mediante llamada a la API de Labelary).
- Densidad (DPI) y tamaño de etiqueta configurables.
- Exportación de la previsualización como PNG.
- Exportación de la previsualización como PDF.
- Ventana redimensionable para una visualización cómoda.
- Interfaz de usuario moderna y limpia.

## Tecnología Utilizada

- Extensión de Microsoft Edge (Manifest V3)
- HTML5
- CSS3 (Estilos personalizados)
- JavaScript (Vanilla JS)
- API de Labelary (Dependencia de servicio web externo)

## Instalación (Cargar Extensión Descomprimida)

1.  Descarga o clona los archivos del proyecto a un directorio local.
2.  Abre Microsoft Edge.
3.  Navega a la dirección `edge://extensions/`.
4.  Activa el **Modo de programador** usando el interruptor (normalmente en la esquina inferior izquierda).
5.  Haz clic en el botón **Cargar descomprimida**.
6.  Selecciona el directorio donde guardaste los archivos del proyecto (la carpeta que contiene `manifest.json`).
7.  El icono de la extensión debería aparecer en tu barra de herramientas de Edge.

## Uso

1.  Haz clic en el icono de la extensión en la barra de herramientas de Edge. Se abrirá una nueva ventana redimensionable.
2.  Pega tu código ZPL en el área de texto.
3.  Selecciona la **Densidad** (DPI) y el **Tamaño** (Ancho x Alto en pulgadas) deseados.
4.  Haz clic en el botón **Previsualizar Etiqueta** para renderizar la vista previa.
5.  Si la vista previa es correcta, usa los botones **Exportar PNG** o **Exportar PDF** para descargar la etiqueta en el formato deseado.
6.  Cualquier error durante la previsualización o exportación se mostrará en el área de mensajes de error.

## Dependencias y Avisos

- **Requiere Conexión a Internet:** Esta extensión depende completamente de la API externa de Labelary (https://labelary.com/service.html) para renderizar las etiquetas. Es necesaria una conexión a internet activa para que funcione.
- **API de Labelary:** La funcionalidad y disponibilidad de esta extensión dependen del servicio de Labelary. Por favor, consulta los términos de servicio de Labelary en cuanto a límites de uso y privacidad de datos. Esta extensión envía tu código ZPL a sus servidores.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo LICENSE.md para más detalles.