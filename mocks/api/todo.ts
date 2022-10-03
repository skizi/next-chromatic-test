import { Todo, TodoCreateDto, TodoUpdateDto } from 'models';
import { DefaultRequestBody, PathParams, rest } from 'msw';

const mockData: Todo[] = [];

class MockTodoRepository {
  constructor(private data: Todo[]) {}

  fetchAll(): Todo[] {
    return this.data;
  }

  create(todo: TodoCreateDto): Todo {
    const id =
      (this.data.length > 0 ? Math.max(...this.data.map((v) => v.id)) : 0) + 1;
    const createdTodo = { ...todo, id, completed: false };
    this.data = [...this.data, createdTodo];
    return createdTodo;
  }

  update(id: number, todo: TodoUpdateDto): TodoUpdateDto {
    this.data = this.data.map((v) => (v.id !== id ? v : { ...v, ...todo }));
    return todo;
  }

  remove(id: number): number {
    this.data = this.data.filter((v) => v.id !== id);
    return id;
  }
}

const mockTodoRepository = new MockTodoRepository(mockData);

/**
 * 第1型引数: リクエストボディの型を指定
 * 第2型引数: デフォルト型の PathParams を指定
 * 第3型引数: レスポンスボディの型を指定
 */
export const todoHandlers = [
  rest.get<DefaultRequestBody, PathParams, Todo[]>(
    `${process.env.REACT_MSW_DOMAIN}/todos`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockTodoRepository.fetchAll()));
    }
  ),
  rest.post<TodoCreateDto, PathParams, Todo>(
    `${process.env.REACT_MSW_DOMAIN}/todos`,
    (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json(mockTodoRepository.create(req.body))
      );
    }
  ),
  rest.put<TodoUpdateDto, PathParams, TodoUpdateDto>(
    `${process.env.REACT_MSW_DOMAIN}/todos/:id`,
    (req, res, ctx) => {
      const { id } = req.params;
      return res(
        ctx.status(200),
        ctx.json(mockTodoRepository.update(+id, req.body))
      );
    }
  ),
  rest.delete<DefaultRequestBody, PathParams, number>(
    `${process.env.REACT_MSW_DOMAIN}/todos/:id`,
    (req, res, ctx) => {
      const { id } = req.params;
      return res(ctx.status(200), ctx.json(mockTodoRepository.remove(+id)));
    }
  ),
];
