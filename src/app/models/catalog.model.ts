import { SafeResourceUrl } from "@angular/platform-browser";

export const catalogAttributesMapping = {
    name: 'Megnevezés',
    place: "Díszítmény (stílus)",
    materials: "Alapanyag",
    photo: "Fotó",
    size: "Méret",
    colors: "Színállása",
    copiesPerYear: "Éves előállítható példányszám",
    juryDate: "A zsűrizés helye és ideje",
    juryNr: "Zsűriszám",
    juryDecision: "A zsűri döntése",
    trademark:	"Védjegy",
    sector:	"Szakág"	
  };
  
  export interface Catalog {
    name: string,
    place: string,
    materials: string,
    photo:string | SafeResourceUrl,
    size: string,
    colors: string,
    copiesPerYear: string,
    juryDate: string,
    juryNr: string,
    juryDecision: string,
    trademark:	string,
    sector:	string	
  }


 
  