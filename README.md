# Bajentombola

Detta verktyg används för att lotta ut matchbiljetter till Hammarby Fotbolls säsongskortsinnehavare under coronasäsongen 2020.


## Lottningsmekanik

Matchbiljetter lottas fram ur den befintliga säsongskortsdatabasen. Ett säsongskort är en lott i matchlotteriet. Vissa marknadsbiljetter kommer inte att ingå i lotteriet så det rör sig om en bit under 16000 biljetter/lotter som vi drar ifrån.

För att kunna göra en kort livesänd utlottning så behöver vi ett smidigare sätt än att manuellt dra X antal hundra lotter inför varje match. Därför drar vi manuellt en slumpmässig kod, exempelvis genom tärningskast eller bollar i en skål med bokstäver. Koden används därefter för att beräkna vilka som tilldelas matchbiljett.

Lottningsproceduren måste vara transparent och möjlig att kontrollera. Det ska gå att återskapa ett identiskt resultat med samma ingångsvärden, alltså om samma kod och antal biljetter anges så kommer samma biljetter att dras. Detta är viktigt för att det ska gå att kontrollera dragningen i efterhand.


### Fördelning av biljetter

För att konvertera en slumpmässig kod till X antal utvalda biljetter, så använder vi [pseudoslump](https://sv.wikipedia.org/wiki/Pseudoslumptalsgenerator) för att ge varje säsongsbiljett/lott en genererad kod. Därefter sorterar vi säsongsbiljetterna/lotterna efter sina pseudoslumpgenererade koder, och de X första efter sortering blir tilldelade en matchbiljett.

Pseudoslump används istället för "riktig" slump för att resultatet ska vara återupprepningsbart och vara möjligt att kontrollera i efterhand.


### Val av algoritm

Som algoritm för pseudoslump använder vi PBKDF2, som är gjort för att generera starka kryptografiska nycklar utifrån lösenord. (Så kallad [Key Derivation Function](https://en.wikipedia.org/wiki/Key_derivation_function).) Algoritmen PBKDF2 har tre fördelar:

* Det finns en standardimplementation av PBKDF2 i Web Crypto API, så vi behöver inte själva implementera den, utan den finns redan som standard i moderna webbläsare.
* Den slumpade koden som vi kommer att utgå ifrån har en entropi som motsvarar ett normalt lösenord, så det är en algoritm som är gjord för den typen av indata. Se denna jämförelse av algoritmer som stöds i Web Crypto API: [Supported algorithms](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Supported_algorithms).
* Eftersom att PBKDF2 är gjort för att generera starka kryptografiska nycklar, så är det en mycket hög distribution i värdena som vi får ut, och ger därför extremt låg förutsägbarhet och en rättvis chans för alla säsongskort att bli utvalda.


## Några kodprinciper

* Vi vill köra exakt den kod som är skriven. Vi vill alltså inte ha någon oläslig kompilerad eller transpilerad kod. Detta för maximal transparens, så att det inte är några tveksamheter kring exakt vilken kodbas som körs.
* Inga dolda delar i något backend som körs. Allt är helt frontend för att koden enkelt ska kunna granskas och testas i vilken webbläsare som helst.
* Vi publicerar koden öppet på typ GitHub.
* Vi bemödar oss inte med browserkompatibilitetsgrejer. Tombolan rullar i senaste Chrome, Firefox och Safari.

## Utvecklingsmiljö

Observera att Web Crypto API är inte tillgängligt i alla webbläsare om inte sidan laddat via antingen HTTPS eller från 127.0.0.1, och i sådana fall så klagar den på att `window.crypto.subtle is undefined` när tombolan ska starta.

## Tester

Det finns några tester i `tests.html` och `tests.js`. Dessa är tänkta att köras direkt i webbläsaren, eftersom att vår implementation är så beroende av webbläsarnas Web Crypto API. Öppna webbläsarens inspektor för att se om det är några fel.

## Bygg och deploy

Något bygge behövs inte. Filerna kan hostas direkt som statiska filer på standardiserad webbserver.

## Tack

Tack för er tid, kodgranskning och värdefull feedback till [Alfred Godoy](https://twitter.com/kodfred), [Daniel Termin](https://twitter.com/botteu), [Jimmie Jonasson](https://github.com/jimmiejonasson), Jonas Nilsson, [Lisandro Mindel](https://www.linkedin.com/in/lisandromindel/), [Martin Moe](https://www.linkedin.com/in/martin-moe-44b02913a/) och [Stefan Parker](https://twitter.com/morkum).

