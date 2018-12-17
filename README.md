# angular-ngrx-scaffold

Scaffold di un'applicazione con Angular e NgRx.

Ho cercato di usare le best practices che ho assimilato studiando Redux (NgRx).

Questo progetto è pensato solamente per NgRx/Redux in Angular; NON ho usato best practices per quanto riguarda UX, UI, Angular, HTML o CSS.

## Esempio

Per far partire l'applicazione Angular di esempio _(con dati json di test)_ basta digitare in sequenza:

- `npm install`
- `npm run start`

**Requisito**: Angular CLI (`npm install -g @angular/cli`)

## Struttura del progetto

- src/app
  - components
    - entity
      - create
      - edit
      - select-list
    - entity2
      - ...
  - facades
    - entity.facade.ts
    - entity2.facade.ts
  - services
    - entity.service.ts
    - entity2.service.ts
  - store
    - entity
      - entity.actions.ts
      - entity.adapter.ts
      - entity.effects.ts
      - entity.reducers.ts
      - entity.selectors.ts
      - entity.state.ts
    - entity 2
      - ...
    - effects.ts
    - reducers.ts
    - state.ts

## Snippets

Per creare alcuni file, soprattutto per quanto riguarda NgRx, ho usato degli snippets che si possono trovare mio progetto GitHub [ngrx-crud-snippets](https://github.com/danielzotti/ngrx-crud-snippets).

I file sono questi:

- store (NgRx)
  - actions [`entity.actions.ts`](/src/app/store/entity/entity.actions.ts)
  - adapter [`entity.adapter.ts`](/src/app/store/entity/entity.adapter.ts)
  - effects [`entity.effects.ts`](/src/app/store/entity/entity.effects.ts)
  - reducer [`entity.reducer.ts`](/src/app/store/entity/entity.reducer.ts)
  - selector [`entity.selectors.ts`](/src/app/store/entity/entity.selectors.ts)
  - state [`entity.state.ts`](/src/app/store/entity/entity.state.ts)
- altri
  - service [`entity.service.ts`](/src/app/services/entity.service.ts)
  - facade [`entity.facade.ts`](/src/app/facades/entity.facade.ts)

## Model dell'entità dello store

```ts
{
    ids: string[] | number[];
    entities: Dictionary<IEntityStoreEntity>;
    isFetching: boolean;
    editModel: any;
    createModel: any;
}
```

## To do

- migliorare la documentazione
- link a articoli e video da cui ho studiato e a cui mi sono ispirato

## Feedback

Lavoro "realmente" con Redux da Agosto 2018 quindi i feedback sono apprezzatissimi!
