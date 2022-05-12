import { UniqueIdService } from './unique-id.service';

describe(UniqueIdService.name, () => {
  let service: UniqueIdService = null;
  beforeEach(() => {
    service = new UniqueIdService();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} 
  should generate id when called with prefix`, () => {
    const id = service.generateUniqueIdWithPrefix('app');
    expect(id.startsWith('app-')).toBeTrue();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
   should not generated duplicate IDs when called multiple times`, () => {
    // const firstId = service.generateUniqueIdWithPrefix('app');
    // const secondId = service.generateUniqueIdWithPrefix('app2');
    // expect(firstId).not.toBe(secondId);

    const ids = new Set(); // gerar multiplos ids:
    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }
    expect(ids.size).toBe(50); // se for menor que 50 -> erro;
  });

  it(`#${UniqueIdService.prototype.getNumberGeneratedUniqueIds.name} 
  should return number of generatedIds when called`, () => {
    service.generateUniqueIdWithPrefix('app');
    service.generateUniqueIdWithPrefix('app');
    expect(service.getNumberGeneratedUniqueIds()).toBe(2);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} 
  should throw when called with empty value`, () => {
    const emptyValues = [null, undefined, '', '0', '1'];

    emptyValues.forEach((emptyValue) => {
      expect(() => service.generateUniqueIdWithPrefix(emptyValue))
      .withContext(`Empty value: ${emptyValue}`)
      .toThrow();
    });
    // para testar throws -> tem que colocar o método dentro de uma function
    // se não teste da erro.

    // withContext() -> coloco um contexto pra quando o teste falhar, eu saber
    // qual item falhou -> bom para muitos items de teste
  });
});

// blabla should blabla when blabla

// toBeTrue() e toBe()-> tipo literal e não instância 
// toBeTruthy() -> mais genérico