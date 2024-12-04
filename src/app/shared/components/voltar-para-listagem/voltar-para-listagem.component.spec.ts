import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoltarParaListagemComponent } from './voltar-para-listagem.component';

describe('VoltarParaListagemComponent', () => {
  let component: VoltarParaListagemComponent;
  let fixture: ComponentFixture<VoltarParaListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoltarParaListagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoltarParaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
