import { Router, Request, Response } from 'express';

export abstract class BaseController {
  abstract readAll(req: Request, res: Response): Promise<void> | void;
  abstract read(req: Request, res: Response): Promise<void> | void;
  abstract create(req: Request, res: Response): Promise<void> | void;
  abstract update(req: Request, res: Response): Promise<void> | void;
  abstract delete(req: Request, res: Response): Promise<void> | void;
}

type ControllerClass<T extends BaseController> = new () => T;

export function createRouter<T extends BaseController>(Controller: ControllerClass<T>): Router {
    const controller = new Controller();
    const router = Router();

    router.get('/', controller.readAll);
    router.get('/:id', controller.read);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
}

