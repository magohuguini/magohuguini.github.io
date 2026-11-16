# Mago Huguini

Web preparada para [magohuguini.github.io](https://magohuguini.github.io/).

Contiene la portada, la historia, las fotografías y los vídeos de la web anterior, adaptados para funcionar en GitHub Pages. El sitio es HTML, CSS y JavaScript: no necesita WordPress, plugins, una base de datos, un plan de pago ni un proceso de compilación.

## Publicación

La fuente de GitHub Pages debe ser la rama `main`, carpeta `/ (root)`. El archivo `.nojekyll` indica que los HTML se publican directamente. No añadir un archivo `CNAME` si se desea mantener `magohuguini.github.io` como dirección principal.

Después de guardar cambios en `main`, GitHub Pages publica una versión nueva. El despliegue se puede comprobar en la pestaña **Actions** del repositorio.

## Cómo cambiar el contenido

| Qué quieres cambiar | Archivo |
| --- | --- |
| Portada, cifras, presentación y tarjetas de espectáculos | `index.html` |
| Biografía, edad, formación y fotos de la historia | `mi-historia/index.html` |
| Página de contacto | `contacta/index.html` |
| Información de privacidad | `contacta/politica-de-privacidad/index.html` |
| Información legal | `contacta/aviso-legal/index.html` |
| Colores, tamaños, espaciado y comportamiento en móvil | `assets/site.css` |
| Menú móvil, galerías, vídeos y preparación de mensajes | `assets/site.js` |
| Fotografías, fondos, logotipo e iconos | `assets/img/` |

Desde GitHub puedes abrir el archivo, pulsar el lápiz, editar el texto y guardar con **Commit changes**. Los comentarios de `index.html` identifican las secciones. Conserva las etiquetas HTML que rodean al texto.

Para sustituir una foto sin editar HTML, sube la nueva imagen con el mismo nombre. Si sus proporciones o dimensiones cambian, actualiza también los atributos `width` y `height` correspondientes. No elimines una imagen que siga utilizándose como fondo o en otra página.

Para cambiar un vídeo, reemplaza su identificador tanto en `data-video-id` como en el enlace `youtube.com/watch?v=…` de la página. Los identificadores actuales son `4uBczNQgl70` (Inicio) y `2Pw9lJhJRqQ` (Mi historia).

El teléfono y el correo aparecen en las páginas de contacto, privacidad y aviso legal, además de la portada. Si cambian, busca el valor anterior en todo el repositorio. Actualiza también `data-phone` y `data-email` de los dos formularios. `data-phone` utiliza el prefijo internacional sin `+` ni espacios.

## Cómo funciona el contacto

GitHub Pages no ejecuta el formulario de WordPress. Esta versión prepara un mensaje en el navegador y ofrece abrirlo en WhatsApp o en el correo del visitante. **No lo envía automáticamente**: la persona lo revisa y confirma el envío en su aplicación.

Los botones de teléfono, WhatsApp y correo también funcionan sin JavaScript. La web no almacena mensajes ni incorpora una cuenta de un proveedor externo de formularios.

## Vídeos y privacidad

Las imágenes y las fuentes están guardadas en este repositorio. Los vídeos siguen en YouTube y se cargan solo cuando se pulsa reproducir. «Desactivar vídeo» retira el reproductor de la página. El código de esta web no añade analítica, publicidad, cookies ni almacenamiento local.

Las páginas legales originales eran plantillas sin completar. Esta copia recoge los canales de contacto conocidos y explica el funcionamiento real del sitio. **Queda pendiente que el titular facilite su identidad legal y los demás datos que correspondan para completar y revisar el aviso legal y la política de privacidad.** No se han inventado nombres, NIF, domicilios ni plazos de conservación.

## Antes de retirar el alojamiento anterior

1. Confirmar que las cinco rutas funcionan en `https://magohuguini.github.io/`, que las fotografías cargan y que los canales de contacto están operativos.
2. Revisar el servicio de correo. `contacto@magohuguini.com` necesita conservar el dominio y un buzón o servicio de correo. GitHub Pages no aloja ese buzón. Si se abandona el dominio, hace falta otra dirección y sustituirla en estas páginas.
3. Conservar una copia de seguridad de la web anterior y de los correos antes de cancelar servicios.
4. Si se mantiene el dominio, configurar una redirección permanente de cada URL antigua a su equivalente nueva. Eso no requiere actualizar dos webs. Una redirección HTTPS necesita un proveedor que la sirva con certificado válido; DNS por sí solo no redirige URLs.
5. Actualizar los enlaces de redes, perfiles, carteles y, si se utiliza, Google Search Console. El nuevo `sitemap.xml` ya utiliza el dominio de GitHub Pages.

## Comprobación local opcional

Desde la carpeta del repositorio, con Python instalado:

```bash
python -m http.server 8000
```

Abre `http://localhost:8000/`. Las rutas empiezan por `/`, por lo que la web se comprueba con un servidor local y no haciendo doble clic en un HTML.

Las carpetas `.openai/`, `.preview/` y `dist/` son de previsualización local, están ignoradas por Git y no forman parte del sitio publicado.

## Referencias

- [Publicar un sitio con GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
- [Cambiar la dirección de un sitio: guía de Google](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).
- [Privacidad de GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

Las fotografías, los vídeos y el logotipo conservan los derechos de sus titulares. La licencia de la fuente Poppins está en `assets/fonts/OFL-poppins.txt`.
