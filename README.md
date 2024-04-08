# Nakupovalni listek

Navodila, po katerih je bila narejena aplikacija:

```
Naslov: Kot član družine imam nakupovalni listek, ki ga polnijo vsi člani družine in s katerim lahko grem v trgovino.

Opis:
- Potrebujem aplikacijo "nakupovalni listek", kjer lahko različni uporabniki dodajajo, urejajo in brišejo predmete, ki jih bo moral nekdo kasneje iskati v trgovino.
- Tisti, ki gre v trgovino, mora imeti možnost odkljukati predmete (check/uncheck), ki jih je nabavil, kot bi prečrtal na nakupovalnem listku.
- Prva verzija ima samo "en spisek” (one list for all users), ki ga vsi urejajo. Ne omogoča več nakupovalnih listkov.
- Naj bo uporabniška izkušnja navdušila uporabnika.
- Uporabnik lahko zbriše vse elemente.
- Uporabnik lahko izvozi podatke v JSON datoteko in jo tudi uvozi. Prenesejo se vsa stanja (checked/unchecked, …). Pazi na konflikte pri uvažanju čez obstoječe podatke.
- Uvoz/izvoz dela tudi preko CLI komande.

Kazalniki/QA:
* Dva različna uporabnika lahko vpišeta predmet na isti listek.
* Vsak uporabnik vidi vse vpisano in stanje vpisanega.
* En uporabnik pobriše predmet drugega uporabnika. Posledica se vidi pri drugem uporabniku.
* En uporabnik odkljuka predmet kot "kupljen". Posledica se vidi pri drugem uporabniku.
* En uporabnik izvozi podatke.
* En uporabnik uvozi podatke. Isti podatki se osvežijo, se ne duplicirajo.

Arhitektura, design, programski jezik, framework, ki ga boš uporabil, je tvoja izbira.
Ker smo agilni, je pomembno, da izbereš takšna orodja, kjer boš dosegel cilj najhitreje in seveda najbolj kvalitetno.  Izdelek mora delovati v vseh scenarijih dnevne uporabe. Mora biti pregleden na ekranu telefona in na računalniku.
```

Zagon aplikacije z uporabo npm (frontend na portu 3000, backend na portu 3001):

```
npm i

# frontend
npm run dev

# backend
npm run serve

# frontend in backend
npm run all
```

Docker image:

```
docker-compose up
```

Primeri za CLI komande so v datoteki [CLI Commands](cli-commands.txt)
