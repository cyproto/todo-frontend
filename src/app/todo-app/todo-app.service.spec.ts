import { TestBed } from '@angular/core/testing';

import { TodoAppService } from './todo-app.service';

describe('TodoAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoAppService = TestBed.get(TodoAppService);
    expect(service).toBeTruthy();
  });
});
