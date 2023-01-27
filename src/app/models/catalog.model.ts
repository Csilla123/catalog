import { SafeResourceUrl } from "@angular/platform-browser";

export const catalogAttributesMapping = {
    name: 'Neve',
    place: "Tájegység",
    materials: "Alapanyagok",
    photo: "Fotó"
  };
  
  export interface Catalog {
    name: string,
    place: string,
    materials: string,
    photo:string | SafeResourceUrl
  }


 
  