import { Banner } from './banner.model';

export interface Evento {
  id: string;
  title: string;
  done: boolean;
  listBanner: Array<Banner>;
}
