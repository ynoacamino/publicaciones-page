import PocketBase from 'pocketbase';
import { BACKEND_URL } from '@/config/variables';
import { glosarioBridge, publicacionesBridge } from './bridge';

const COLLECTIONS = {
  GLOSARIOS: 'glosarios',
  AUTORES: 'autores',
  PUBLICACIONES: 'publicaciones',
  SECCIONES: 'secciones',
};

export class PocketBaseAPI {
  pb;

  constructor() {
    this.pb = new PocketBase(BACKEND_URL);
    this.pb.autoCancellation(false);
  }

  async getFullGlosarios() {
    const records = await this.pb.collection(COLLECTIONS.GLOSARIOS).getFullList();

    return glosarioBridge(records);
  }

  async getFullPublicacionesWithSecciones() {
    const sections = await this.pb.collection(COLLECTIONS.SECCIONES).getFullList({ requestKey: 'sections' });

    const publicationsSections = await Promise.all(sections.map(async (s) => ({
      section: s.name,
      articles: publicacionesBridge((await this
        .pb
        .collection(COLLECTIONS.PUBLICACIONES).getList(1, 6, {
          filter: `seccion = "${s.id}"`,
          sort: '-fecha_de_publicacion',
          requestKey: s.name,
          expand: 'autor,seccion',
        })).items),
    })));

    return publicationsSections;
  }

  async getLastPublicaciones(perPage) {
    const { items: records } = await this
      .pb
      .collection(COLLECTIONS.PUBLICACIONES)
      .getList(1, perPage, {
        sort: '-fecha_de_publicacion',
        expand: 'autor,seccion',
      });

    return publicacionesBridge(records);
  }

  async getPublication(slug) {
    const record = await this.pb.collection(COLLECTIONS.PUBLICACIONES).getFirstListItem(
      `slug = "${slug}"`,
      {
        expand: 'autor,seccion',
      },
    );

    return publicacionesBridge([record])[0];
  }

  async getPaginationSections(page, section) {
    const { items: records } = await this
      .pb
      .collection(COLLECTIONS.PUBLICACIONES)
      .getList(page, 6, {
        filter: `seccion.name = "${section}"`,
        sort: '-fecha_de_publicacion',
        requestKey: section.name,
        expand: 'autor,seccion',
      });

    return publicacionesBridge(records);
  }

  async getNumberOfPagesSection(section, perPage) {
    const { totalPages } = await this
      .pb
      .collection(COLLECTIONS.PUBLICACIONES)
      .getList(1, perPage);

    return totalPages;
  }

  async searchPublications(query) {
    const { items: records } = await this
      .pb
      .collection(COLLECTIONS.PUBLICACIONES)
      .getList(1, 10, {
        filter: `(titulo ~ "${query}") || (contenido ~ "${query}") || (previsualizacion ~ "${query}")`,
        sort: '-fecha_de_publicacion',
        expand: 'seccion',
      });

    return publicacionesBridge(records);
  }
}

const api = new PocketBaseAPI();
export default api;
