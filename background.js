// background.js

chrome.action.onClicked.addListener((tab) => {
    const windowWidth = 650; // Ancho inicial (un poco más grande)
    const windowHeight = 750; // Alto inicial
  
    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"), // Asegura la URL correcta de la extensión
      type: "popup", // Tipo ventana emergente (generalmente sin barras de navegador completas)
      width: windowWidth,
      height: windowHeight
      // Puedes añadir left/top si quieres posicionarla
    });
  });