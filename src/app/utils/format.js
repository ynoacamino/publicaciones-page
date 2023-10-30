export default function format(s) {
  s = s.replace('?', '');
  s = s.replace('/', '');
  s = s.replace('//', '');
  s = s.replace('.', '');
  s = s.replace('"', '');
  s = s.replace("''", '');
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  s = s.replace(/ñ/g, 'n').replace(/Ñ/g, 'N');

  // Reemplaza espacios con guiones
  s = s.replace(/ /g, '-');

  // Codifica caracteres especiales
  s = encodeURIComponent(s);

  return s;
}
