'use strict';

// El contenido funciona sin JavaScript. Se activa solo la mejora interactiva.
document.documentElement.classList.add('has-js');

const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('#site-navigation');
if (menuButton && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });
}

// YouTube solo recibe una petición después de que el visitante pulse reproducir.
// No se conserva el consentimiento en cookies ni en localStorage.
document.querySelectorAll('[data-video-id]').forEach(shell => {
  const frame = shell.querySelector('.video-frame');
  const cover = shell.querySelector('.video-cover');
  const playButton = shell.querySelector('[data-play-video]');
  const stopButton = shell.querySelector('[data-stop-video]');
  const videoId = shell.dataset.videoId;
  if (!frame || !cover || !playButton || !/^[\w-]{11}$/.test(videoId)) return;
  playButton.hidden = false;
  playButton.addEventListener('click', () => {
    if (frame.querySelector('iframe')) return;
    const player = document.createElement('iframe');
    player.title = shell.dataset.videoTitle;
    player.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    player.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    cover.hidden = true;
    frame.classList.add('is-playing');
    frame.append(player);
    stopButton.hidden = false;
    player.focus();
  });
  stopButton.addEventListener('click', () => {
    frame.querySelector('iframe')?.remove();
    frame.classList.remove('is-playing');
    cover.hidden = false;
    stopButton.hidden = true;
    playButton.focus();
  });
});

// Se prepara un borrador: nunca se envía un mensaje ni se llama al antiguo servidor.
document.querySelectorAll('[data-contact-form]').forEach(form => {
  const result = form.querySelector('[data-contact-result]');
  const nameField = form.querySelector('[data-contact-name]');
  const messageField = form.querySelector('[data-contact-message]');
  const preview = form.querySelector('[data-message-preview]');
  const whatsappLink = form.querySelector('[data-whatsapp-draft]');
  const emailLink = form.querySelector('[data-email-draft]');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = nameField.value.trim();
    if (!name) {
      nameField.setCustomValidity('Escribe tu nombre.');
      nameField.reportValidity();
      return;
    }
    const message = messageField.value.trim();
    const text = `Hola, Mago Huguini. Soy ${name}.\n\n${message || 'Me gustaría recibir información sobre un espectáculo de magia.'}`;
    preview.textContent = text;
    whatsappLink.href = `https://wa.me/${form.dataset.phone}?text=${encodeURIComponent(text)}`;
    emailLink.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent('Consulta sobre un espectáculo de magia')}&body=${encodeURIComponent(text)}`;
    result.hidden = false;
    result.querySelector('h3').focus();
  });
  form.addEventListener('input', () => {
    nameField.setCustomValidity('');
    result.hidden = true;
    preview.textContent = '';
    whatsappLink.removeAttribute('href');
    emailLink.removeAttribute('href');
  });
  // Sin JS quedan disponibles los enlaces de contacto directo del documento.
  form.hidden = false;
});

// Galerías: enlaces a las fotos originales con ampliación accesible opcional.
const galleryLinks = [...document.querySelectorAll('[data-gallery]')];
if (galleryLinks.length && typeof HTMLDialogElement !== 'undefined') {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Galería de fotografías');
  const inner = document.createElement('div');
  inner.className = 'lightbox-inner';
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'lightbox-close';
  closeButton.textContent = 'Cerrar ×';
  const photo = document.createElement('img');
  const bar = document.createElement('div');
  bar.className = 'lightbox-bar';
  const previous = document.createElement('button');
  previous.type = 'button';
  previous.textContent = '←';
  previous.setAttribute('aria-label', 'Foto anterior');
  const next = document.createElement('button');
  next.type = 'button';
  next.textContent = '→';
  next.setAttribute('aria-label', 'Foto siguiente');
  const caption = document.createElement('p');
  caption.className = 'lightbox-caption';
  caption.setAttribute('aria-live', 'polite');
  bar.append(previous, caption, next);
  inner.append(closeButton, photo, bar);
  dialog.append(inner);
  document.body.append(dialog);
  let group = [];
  let selected = 0;
  let trigger;
  const show = index => {
    selected = (index + group.length) % group.length;
    const link = group[selected];
    photo.src = link.href;
    photo.alt = link.querySelector('img').alt;
    caption.textContent = `${selected + 1} / ${group.length} · ${photo.alt}`;
  };
  galleryLinks.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    trigger = link;
    group = galleryLinks.filter(item => item.dataset.gallery === link.dataset.gallery);
    show(group.indexOf(link));
    document.body.classList.add('dialog-open');
    dialog.showModal();
    closeButton.focus();
  }));
  previous.addEventListener('click', () => show(selected - 1));
  next.addEventListener('click', () => show(selected + 1));
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(selected - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(selected + 1); }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    photo.removeAttribute('src');
    trigger?.focus();
  });
}
