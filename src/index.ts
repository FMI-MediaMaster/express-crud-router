import { Router, Request, Response } from 'express';
import { requireAuth } from '@media-master/express-middleware';

export class BaseController {
    readAll?(req: Request, res: Response): void;
    readByName?(req: Request, res: Response): void;
    readById?(req: Request, res: Response): void;
    create?(req: Request, res: Response): void;
    update?(req: Request, res: Response): void;
    delete?(req: Request, res: Response): void;
}

type ControllerClass<T extends BaseController> = new () => T;

export function createRouter<T extends BaseController>(
    Controller: ControllerClass<T>,
    router: Router = Router()
): Router {
    const controller = new Controller();

    if (controller.readAll) router.get('/', controller.readAll);
    if (controller.readByName) router.get('/name', controller.readByName);
    if (controller.readById) router.get('/:id', controller.readById);
    if (controller.create) router.post('/', requireAuth, controller.create);
    if (controller.update) router.put('/:id', requireAuth, controller.update);
    if (controller.delete) router.delete('/:id', requireAuth, controller.delete);

    return router;
}
