# **Kort projektbeskrivning.**

Landify är en fullstack applikation för att bygga och publicera landningssidor med hjälp av drag and drop. Applikationen har fördefinerade sektioner som användaren kan använda sig av, och redigera textinnehållet samt publicera sidan med en unik slug.

## **Huvudfunktioner.**

- Autentisering: Säker inloggning och registrering med JWT (JSON Web Tokens).
- Dashboard: Överblick över användarens sajter med möjlighet att skapa nya eller ta bort befintliga.

- Site Editor:
  - Visuellt verktyg för att bygga sidor med drag and drop.
  - Färdiga sektioner (hero, features, och CTA).
  - "Inspector"-panel för att redigera texter, och inställningar för varje sektion.
  - Stöd för att ändra ordning på sektioner.
  - Publika Sajter: Varje sajt får en unik URL (slug) och kan besökas publikt av vem som helst.
  - Flerspråksstöd: Inbyggt stöd för både Svenska och Engelska (i18n).

## **Teknisk beskrivning.**

### Backend (C#.NET).

- Strukturerad enligt "Clean Architecture".
- Varje mapp i backend är ett eget lager: "Domain" definerar vad en site / sektion är. "Application" definerar regler för varje site / sektion. "Infrastructure" sköter all logik med databasen, och "API" innehåller REST-endpoints (Controllers) som exponeras mot frontend.

### Frontend (React/Typescript).

- Editorn är byggd kring biblioteket dnd-kit och det finns tre sammanverkande lager.
- Hela site editor filen omsluts av "DndContext". Denna komponent:
  - Använder en PointerSensor med en ActivationConstraint (5px) rörelse för att skilja på klick och drag.
  - onDragEnd är den centrala funktionen som avgör vad som ska hända när användaren släpper sektionen.
  - Scenario A: En ny sektion dras från paletten (vänstra menyn) > Skapa en ny sektion i canvasen.
  - Scenario B: En sektion flyttas inom canvasen > Sortera om arrayen.

### Paletten.

- Använder hooken useDraggable från Dnd och skickar med datan { from: "palette", sectionType: "hero" }. Detta gör att onDragEnd vet vad som släpptes (Hero, Feature, eller CTA).

### Canvas (Mittenpanelen).

- Detta är både ett drop-target och en sorterbar lista.
- Använder sig av SortableContext från Dnd, som hjälper till att hålla reda på ordningen.
- Varje sektion använder även useSortable, denna hook ger två viktiga saker:
  - CSS värden för att flytta elementet visuellt medan man drar.
  - CSS-transitioner för att animera elementen som flyttar på sig för att ge plats åt det man drar.

### Hur editorn hänger ihop i koden.

1. Användaren börjar med en tom canvas och drar i tex. hero sektionen i paletten. DndContext aktiveras.
2. När musen rör sig över canvasen räknar SortableContext ut positioner. Om det redan finns sektioner i canvasen animeras den åt sidan (upp/ner) för att visa var den nya sektionen kommer hamna.
3. Vid släpp: Om källan var från vänstermenyn (Palette), anropas createSection i backend med rätt typ. Om källan var canvas, så ändras arrayen och skickar den nya ordningen till backend.

### Cloud / Deploy.

- Jag har satt upp Azure SQL (Serverless)
- Migrerat från SQLite till Azure SQL server
- Konfigurerat Linux App Services för backend och Static web app för frontend
- Lärt mig använda GitHub Actions




## För att starta igång projektet lokalt:

```bash
cd frontend
npm run dev

cd backend
dotnet run.



