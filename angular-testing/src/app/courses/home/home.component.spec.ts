import { TestBed, async, ComponentFixture } from "@angular/core/testing"
import { CoursesModule } from "../courses.module"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import { HomeComponent } from "./home.component"
import { DebugElement } from "@angular/core"
import { CoursesService } from "../services/courses.service"
import { Observable, of } from "rxjs"
import { COURSES } from "../../../../server/db-data"
import { Course } from "../model/course"
import { By } from "@angular/platform-browser"


// Note: 
// 1. Home component is known as the smart/comtainer component, which it gets data and doesnt have presentation responsibility. It is usually top level 
fdescribe('HomeComponent', () => {
    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let el: DebugElement;
    let coursesService: any;

    // Place for reuse mock data
    const beginnerCourses = Object.values(COURSES).sort(sortCoursesBySeqNo).filter((course: Course) => course.category == 'BEGINNER') as Course[]; //we will get error and to fix it we need to add type "any" to the coursesService varaible because this is what angular return when we do [coursesService = TestBed.get(CoursesService)]
    const advanceCourses = Object.values(COURSES).sort(sortCoursesBySeqNo).filter((course: Course) => course.category == 'BEGINNER') as Course[];
    const allCourses = Object.values(COURSES).sort(sortCoursesBySeqNo) as Course[];

    beforeEach(async(() => {
        const courseService = jasmine.createSpyObj('CoursesService', ['findAllCourses']) //[] is the methods we want to mock
        TestBed.configureTestingModule({
            imports: [CoursesModule, NoopAnimationsModule], // NoopAnimationModule will ignore the animation
            providers: [
                { provide: CoursesService, useValue: courseService } //useValue is the mock value
            ]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HomeComponent);
                component = fixture.componentInstance;
                el = fixture.debugElement;
                coursesService = TestBed.get(CoursesService);
            });
    }));

    it("should create the component", () => {
        expect(component).toBeTruthy();
    })

    // mocking observable based services with "of"
    it("should only display beginer course", () => {
        coursesService.findAllCourses.and.returnValue(of(beginnerCourses)); // of will take the value and create an observable and it is synchoronous

        fixture.detectChanges(); // to apply data to the DOM

        const tabs = el.queryAll(By.css(".mat-tab-label"));

        expect(tabs.length).toBe(1);

    })

    // mocking observable based services with "of"
    it("should display only advance courses", () => {
        coursesService.findAllCourses.and.returnValue(of(advanceCourses)); // of will take the value and create an observable and it is synchoronous

        fixture.detectChanges(); // to apply data to the DOM

        const tabs = el.queryAll(By.css(".mat-tab-label"));

        expect(tabs.length).toBe(1);

    })

    it("should display both tabs", () => {
        coursesService.findAllCourses.and.returnValue(of(allCourses)); // of will take the value and create an observable and it is synchoronous

        fixture.detectChanges(); // to apply data to the DOM

        const tabs = el.queryAll(By.css(".mat-tab-label"));

        expect(tabs.length).toBe(2);
    })

    // simulate user DOM interaction (sync component)
    it("should display advanced courses when tab clicked", () => {
        coursesService.findAllCourses.and.returnValue(of(allCourses)); // of will take the value and create an observable and it is synchoronous

        fixture.detectChanges(); // to apply data to the DOM

        const tabs = el.queryAll(By.css(".mat-tab-label"));

        // Simulating user click
        click(tabs[1]);

        fixture.detectChanges(); // to apply data to the DOM

        const cardTitle = el.queryAll(By.css('.mat-card-title'));

        expect(cardTitle.length).toBeGreaterThan(0);

        expect(cardTitle[0].nativeElement.textContent).toContain("Angular Security Course");


    })


})

function sortCoursesBySeqNo(c1: Course, c2: Course) {
    return c1.seqNo - c2.seqNo;

}

const ButtonClickEvents = {
    left: { button: 0 },
    right: { button: 2 }
};

function click(el: DebugElement | HTMLElement,
    eventObj: any = ButtonClickEvents.left): void {

    if (el instanceof HTMLElement) {
        el.click();
    } else {
        el.triggerEventHandler('click', eventObj);
    }
}