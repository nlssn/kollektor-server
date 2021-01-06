# kollektor-server
Detta är det bakomliggande REST APIet för webbapplikationen **Kollektor**. Detta API hanterar all data och sköter kommunikationen med databasen.

## Moduler / Paket
För att allt ska fungera andvänds nedanstående paket. De är alla tillgängliga via npm (Node Package Manager).
- [cors](https://www.npmjs.com/package/cors) - förklaring
- [express](https://www.npmjs.com/package/express) - förklaring
- [nodemon](https://www.npmjs.com/package/nodemon) - förklaring
- [mongoose](https://www.npmjs.com/package/mongoose) - förklaring

## Installation
För att köra kollektor-server i din lokala miljö. Börja med att klona detta repo. Installera därefter alla resurser via npm. Slutligen starta servern.
```
git clone [url till repo]
cd kollektor-server
npm install
```

## Starta
Efter installation kan du starta servern med följande kommando:
```
node start
```
Vid utveckling rekommenderas istället nedanstående kommando. Detta startar servern med __nodemon__ som automatiskt startar om servern när filer ändras.
```
npm run dev
```
