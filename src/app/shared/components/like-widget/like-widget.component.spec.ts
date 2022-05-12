import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';
import { LikeWidgetComponent } from './like-widget.component';

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent>;
  let component: LikeWidgetComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikeWidgetComponent],
      providers: [UniqueIdService],
      imports: [FontAwesomeModule],
      // imports: [LikeWidgetModule] // -> posso fazer isso ao invés de importar tudo
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const id = 'someId';
    component.id = id;
    fixture.detectChanges();
    expect(component.id).toBe(id);
  });

  it(`#${LikeWidgetComponent.prototype.like.name} 
    should trigger (@Output liked) when called`, () => {
    spyOn(component.liked, 'emit');
    fixture.detectChanges();

    // uma forma menos elegante:
    // component.liked.subscribe(() => {
    //   expect(true).toBeTrue();
    //   done(); // chama no arrow (sem spy)
    // });

    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
    // toHaveBeenCalled -> espera um spy
  });

});
