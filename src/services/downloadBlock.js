import {CsvService} from '@indec/react-commons/services';
import {concat, flatten, map} from 'lodash';

export default class DownloadBlock {
    static download(block, sides, fileName) {
        const data = concat([[
            'Manz', 'Lado', 'Nro. Viv. Listado', 'Cod', 'Calle', 'N° Catastral', 'Manz Interna o Sector',
            'Edif Monob Tira', 'Entrada o Escalera', 'Piso', 'Depto - Hab', 'Casa o Lote', 'Tipo Viv.', 'Descripción',
            'Fecha Alta', 'Cod. Variación', 'Des', 'Fecha Baja', 'Fecha Mod.', 'Fecha de cierre'
        ]], flatten(
            map(
                sides, side => map(
                    side.dwellings, dwelling => [
                        block.number,
                        side.number,
                        dwelling.listNumber,
                        side.street.code,
                        side.street.name,
                        dwelling.streetNumber || 'S/N',
                        dwelling.sector,
                        dwelling.building,
                        dwelling.entrance,
                        dwelling.floor,
                        dwelling.department,
                        dwelling.lote,
                        dwelling.dwellingSubtype || dwelling.dwellingTypeCode,
                        dwelling.description,
                        dwelling.createdAt,
                        dwelling.deleteCode,
                        dwelling.deleteDescription,
                        dwelling.deleteDate,
                        dwelling.editedAt,
                        dwelling.closeDate
                    ]
                )
            )
        ));
        return CsvService.download(data, fileName);
    }
}
