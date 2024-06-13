import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./UpdateById";
import * as count from "./Count"
import * as deleteById from "./DeleteById"

export const CidadesProvider = {
    ...create,
    ...deleteById,
    ...getAll,
    ...getById,
    ...updateById,
    ...count
};
